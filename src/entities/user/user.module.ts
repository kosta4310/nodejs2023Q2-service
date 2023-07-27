import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbUserService } from 'src/db/dbUser.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
