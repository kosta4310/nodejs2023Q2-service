import { Global, Module } from '@nestjs/common';
import { DbUserService } from './dbUser.service';
import { DbArtistService } from './dbArtist.service';
import { DbAlbumService } from './dbAlbum.service';
import { DbTrackService } from './dbTrack.service';

@Global()
@Module({
  providers: [DbUserService, DbArtistService, DbAlbumService, DbTrackService],
  exports: [DbUserService, DbArtistService, DbAlbumService, DbTrackService],
})
export class DbModule {}
