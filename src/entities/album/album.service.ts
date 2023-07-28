import { HttpException, Injectable } from '@nestjs/common';
import { DbAlbumService } from 'src/db/dbAlbum.service';
import { CreateAlbumDto } from './interface';

@Injectable()
export class AlbumService {
  constructor(private dbAlbum: DbAlbumService) {}

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
      return album;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }
}
