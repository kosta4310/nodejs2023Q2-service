import { Global, Module } from '@nestjs/common';
import { DbUserService } from './dbUser.service';

@Global()
@Module({
  providers: [DbUserService],
  exports: [DbUserService],
})
export class DbModule {}
