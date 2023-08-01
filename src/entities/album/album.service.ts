import { HttpException, Injectable } from '@nestjs/common';
import { DbAlbumService } from 'src/db/dbAlbum.service';
import { CreateAlbumDto } from './interface';
import { DbTrackService } from 'src/db/dbTrack.service';
import { DbFavsService } from 'src/db/dbFavs.service';

@Injectable()
export class AlbumService {
  constructor(
    private dbAlbum: DbAlbumService,
    private dbTrack: DbTrackService,
    private dbFavs: DbFavsService,
  ) {}

  async getAllAlbums() {
    return await this.dbAlbum.findMany({});
  }

  async getAlbumById({ id }) {
    const album = await this.dbAlbum.findUnique({ id });

    if (album) {
      return album;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createAlbum(dto: CreateAlbumDto) {
    return await this.dbAlbum.create({ data: dto });
  }

  async updateAlbum(dto: CreateAlbumDto, id: string) {
    const album = await this.dbAlbum.findUnique({ id });

    if (album) {
      return await this.dbAlbum.update({ data: dto, id });
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteAlbum(id: string) {
    const album = await this.dbAlbum.delete({ id });
    if (album) {
      const arrayOfTracks = await this.dbTrack.findMany({
        key: 'albumId',
        value: id,
      });

      arrayOfTracks.forEach((item) => {
        item.albumId = null;
      });

      this.dbFavs.delete({ key: 'albums', value: id });

      return album;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }
}
