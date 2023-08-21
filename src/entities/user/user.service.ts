import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './interface';
import { getHashedPassword } from './utils/getHash';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById({ id }) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      return user;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = getHashedPassword(dto.password);
    dto.password = hashedPassword;
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(`User with this login already exist`, 409);
      }
    }
  }

  async updatePassword(dto: UpdatePasswordDto, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const oldHashedPassword = getHashedPassword(dto.oldPassword);

    if (user) {
      if (user.password === oldHashedPassword) {
        const newHashedPassword = getHashedPassword(dto.newPassword);
        dto.newPassword = newHashedPassword;

        return await this.prisma.user.update({
          data: { password: dto.newPassword, version: { increment: 1 } },
          where: { id },
        });
      }
      throw new HttpException(`OldPassword is wrong`, 403);
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }

  async checkPassword({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user) {
      throw new ForbiddenException(`Not allowed access`);
    }

    const hashedPassword = getHashedPassword(password);

    if (hashedPassword !== user.password) {
      throw new ForbiddenException(`Not allowed access`);
    }

    return user;
  }
}
