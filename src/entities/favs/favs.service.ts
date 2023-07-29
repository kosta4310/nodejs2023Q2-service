import { HttpException, Injectable } from '@nestjs/common';
import { InputFavs, DbFavsService } from 'src/db/dbFavs.service';

@Injectable()
export class FavsService {
  constructor(
    // private dbArtist: ArtistService,
    // private dbAlbum: AlbumService,
    // private dbTrack: TrackService,
    private dbFavs: DbFavsService,
  ) {}

  async getAllFavs() {
    return await this.dbFavs.findMany();
  }

  async create(data: InputFavs) {
    const res = await this.dbFavs.create(data);
    if (res) {
      return { message: res };
    }
    throw new HttpException(
      `Record with id === ${data.value} doesn't exist`,
      422,
    );
  }

  async deleteEntity(data: InputFavs) {
    const res = await this.dbFavs.delete(data);
    if (res) {
      return res;
    }
    throw new HttpException(
      `Record with id === ${data.value} doesn't exist in favorites`,
      404,
    );
  }
}
