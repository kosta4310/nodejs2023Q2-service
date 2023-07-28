import { Global, Module } from '@nestjs/common';
import { DbUserService } from './dbUser.service';
import { DbArtistService } from './dbArtist.service';
import { DbAlbumService } from './dbAlbum.service';
import { DbTrackService } from './dbTrack.service';
import { DbFavsService } from './dbFavs.service';

@Global()
@Module({
  providers: [
    DbUserService,
    DbArtistService,
    DbAlbumService,
    DbTrackService,
    DbFavsService,
  ],
  exports: [
    DbUserService,
    DbArtistService,
    DbAlbumService,
    DbTrackService,
    DbFavsService,
  ],
})
export class DbModule {}
