import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [PassportModule, UserModule, JwtModule.register({})],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    PrismaService,
    RefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
