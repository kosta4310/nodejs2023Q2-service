import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../utilities/validationPipe';
import { CreateUserDto, createUserSchema } from '../user/interface';
import { Tokens } from './types';
import { Public } from './publicDecorator';
import { UserTransformResponse } from '../user/userTransformResponse';
import { RefreshGuard } from './guard/refresh-auth.guard';
import { ValidationRefreshPipe } from './pipes/validationRefreshPipe';

@UseGuards(RefreshGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(
    @Body(new JoiValidationPipe(createUserSchema)) userDTO: CreateUserDto,
  ): Promise<Tokens> {
    const tokens = this.authService.login(userDTO);
    return tokens;
  }

  @Public()
  @Post('signup')
  async signup(
    @Body(new JoiValidationPipe(createUserSchema)) userDTO: CreateUserDto,
  ) {
    const user = await this.authService.signup(userDTO);
    return new UserTransformResponse(user);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Body('refreshToken', new ValidationRefreshPipe())
    refreshToken: string,
  ): Promise<Tokens> {
    const tokens = this.authService.refresh(refreshToken);
    return tokens;
  }
}
