import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { TrackModule } from './entities/track/track.module';
import { FavsModule } from './entities/favs/favs.module';
import { AllExceptionsFilter } from './exeptionFilter/exeption.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './myLogger/logger.module';
import { LoggerMiddleware } from './myLogger/logger.middleware';
import { MyLogger } from './myLogger/logger.service';
import { AuthModule } from './entities/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    LoggerModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private myLogger: MyLogger) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    process.on('uncaughtException', (err) => {
      this.myLogger.error(
        `Uncaught Exception ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.error(`Uncaught Exception ... ${err.stack}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      this.myLogger.error(
        `Unhandled Rejection ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.error(`Unhandled Rejection ... ${err.stack}`);
    });
  }
}
