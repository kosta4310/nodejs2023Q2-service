import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Artist, CreateArtistDto } from 'src/entities/artist/interface';

@Injectable()
export class DbArtistService {
  private db: Array<Artist> = [];

  async findMany() {
    return this.db;
  }

  async findUnique({ id }: { id: string }) {
    return this.db.find((item) => item.id === id);
  }

  async create({ data }: { data: CreateArtistDto }) {
    const id = randomUUID({ disableEntropyCache: true });
    const artist = { ...data, id };
    this.db.push(artist);
    return artist;
  }

  async update({ data, id }: { data: CreateArtistDto; id: string }) {
    const artist = this.db.find((item) => item.id === id);
    if (artist) {
      artist.name = data.name;
      artist.grammy = data.grammy;
    }
    return artist;
  }

  async delete({ id }: { id: string }) {
    const artist = this.db.find((item) => item.id === id);
    if (artist) {
      this.db = this.db.filter((item) => item.id !== id);
    }
    return artist;
  }
}
