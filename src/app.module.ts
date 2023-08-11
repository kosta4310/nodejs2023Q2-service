import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { TrackModule } from './entities/track/track.module';
import { FavsModule } from './entities/favs/favs.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, FavsModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
