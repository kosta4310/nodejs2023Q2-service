import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  Album,
  CreateAlbumDto,
  UpdateAlbumDto,
} from 'src/entities/album/interface';

type DataFindMany = { key?: keyof Album; value?: any };

@Injectable()
export class DbAlbumService {
  private db: Array<Album> = [];

  async findMany({ key, value }: DataFindMany) {
    if (key && value) {
      if (!Array.isArray(value)) {
        return this.db.filter((item) => item[key] === value);
      }
      return this.db.filter((item) => value.includes(item[key]));
    }
    return this.db;
  }

  async findUnique({ id }: { id: string }) {
    return this.db.find((item) => item.id === id);
  }

  async create({ data }: { data: CreateAlbumDto }) {
    const id = randomUUID({ disableEntropyCache: true });
    let album;
    if (!data.artistId) {
      album = { ...data, id, artistId: null };
    }
    album = { ...data, id };
    this.db.push(album);
    return album;
  }

  async update({ data, id }: { data: UpdateAlbumDto; id: string }) {
    const album = this.db.find((item) => item.id === id);
    if (album) {
      for (const key in data) {
        const value = data[key];
        album[key] = value;
      }
    }
    return album;
  }

  async delete({ id }: { id: string }) {
    const album = this.db.find((item) => item.id === id);
    if (album) {
      this.db = this.db.filter((item) => item.id !== id);
    }
    return album;
  }
}
