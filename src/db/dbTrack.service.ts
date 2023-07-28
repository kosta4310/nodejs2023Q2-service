import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto, Track } from 'src/entities/track/interface';

type DataFindMany = { key?: keyof Track; value?: any };

@Injectable()
export class DbTrackService {
  private db: Array<Track> = [];

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

  async create({ data }: { data: CreateTrackDto }) {
    const id = randomUUID({ disableEntropyCache: true });

    const track = { ...data, id };
    this.db.push(track);
    return track;
  }

  async update({ data, id }: { data: CreateTrackDto; id: string }) {
    const track = this.db.find((item) => item.id === id);
    if (track) {
      for (const key in data) {
        const value = data[key];
        track[key] = value;
      }
    }
    return track;
  }

  async delete({ id }: { id: string }) {
    const track = this.db.find((item) => item.id === id);
    if (track) {
      this.db = this.db.filter((item) => item.id !== id);
    }
    return track;
  }
}
