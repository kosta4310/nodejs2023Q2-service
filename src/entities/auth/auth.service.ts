import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { CreateUserDto, User } from '../user/interface';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(userDto: CreateUserDto) {
    const { id, login } = await this.userService.checkPassword(userDto);
    const tokens = await this.getTokens(id, login);
    return tokens;
  }

  async signup(userDto: CreateUserDto) {
    let user: User;
    try {
      user = await this.userService.createUser(userDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Conflict. Login already exists');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
    return user;
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    try {
      const { sub, login } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const tokens = await this.getTokens(sub, login);
      return tokens;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(`Not allowed access`);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  private async getTokens(userId: string, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
