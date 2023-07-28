import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './entities/artist/artist.module';
import { DbArtistService } from './db/dbArtist.service';
import { AlbumModule } from './entities/album/album.module';
import { DbAlbumService } from './db/dbAlbum.service';

@Module({
  imports: [UserModule, DbModule, ArtistModule, AlbumModule],
  providers: [AppService, DbArtistService, DbAlbumService],
  controllers: [AppController],
})
export class AppModule {}
