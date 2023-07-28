import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/entities/favs/intrerface';
import { DbArtistService } from './dbArtist.service';
import { DbAlbumService } from './dbAlbum.service';
import { DbTrackService } from './dbTrack.service';

export type InputFavs = {
  key: keyof Favorites;
  value: string;
};
@Injectable()
export class DbFavsService {
  constructor(
    private dbArtist: DbArtistService,
    private dbAlbum: DbAlbumService,
    private dbTrack: DbTrackService,
  ) {}
  private db: Favorites = { artists: [], albums: [], tracks: [] };
  private accordingDb = {
    artists: this.dbArtist,
    albums: this.dbAlbum,
    tracks: this.dbTrack,
  };

  async findMany() {
    const arrAlbums = this.dbAlbum.findMany({
      key: 'id',
      value: this.db.albums,
    });
    const arrArtists = this.dbArtist.findMany({
      key: 'id',
      value: this.db.artists,
    });
    const arrTracks = this.dbTrack.findMany({
      key: 'id',
      value: this.db.tracks,
    });

    const [albums, artists, tracks] = await Promise.all([
      arrAlbums,
      arrArtists,
      arrTracks,
    ]);
    return { artists, albums, tracks };
  }

  async create({ key, value }: InputFavs) {
    const entity = await this.accordingDb[key].findUnique({ id: value });
    if (entity) {
      const isAddedInFavs = this.db[key].find((id) => id === value);
      if (!isAddedInFavs) {
        this.db[key].push(value);
      }
      return 'The id added in favorites';
    }
    return entity;
  }

  async delete({ key, value }: InputFavs) {
    const entity = this.db[key].find((id) => id === value);

    if (entity) {
      this.db[key] = this.db[key].filter((id) => id !== value);
    }
    return entity;
  }
}
