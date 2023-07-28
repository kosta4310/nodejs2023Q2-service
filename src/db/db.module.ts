import { Global, Module } from '@nestjs/common';
import { DbUserService } from './dbUser.service';
import { DbArtistService } from './dbArtist.service';
import { DbAlbumService } from './dbAlbum.service';

@Global()
@Module({
  providers: [DbUserService, DbArtistService, DbAlbumService],
  exports: [DbUserService, DbArtistService, DbAlbumService],
})
export class DbModule {}
