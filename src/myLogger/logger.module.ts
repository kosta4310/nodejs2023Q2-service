import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { MyLogger } from './logger.service';
import { Writer } from './utils/writer';

@Module({
  providers: [MyLogger, LoggerMiddleware, Writer],
  exports: [LoggerMiddleware, MyLogger],
})
export class LoggerModule {}
