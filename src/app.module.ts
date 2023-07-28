import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, DbModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
