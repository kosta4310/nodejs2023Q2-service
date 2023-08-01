import { HttpException, Injectable } from '@nestjs/common';
import { DbTrackService } from 'src/db/dbTrack.service';
import { CreateTrackDto } from './interface';
import { DbFavsService } from 'src/db/dbFavs.service';

@Injectable()
export class TrackService {
  constructor(private dbTrack: DbTrackService, private dbFavs: DbFavsService) {}

  async getAllTracks() {
    return await this.dbTrack.findMany({});
  }

  async getTrackById({ id }) {
    const track = await this.dbTrack.findUnique({ id });

    if (track) {
      return track;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createTrack(dto: CreateTrackDto) {
    return await this.dbTrack.create({ data: dto });
  }

  async updateTrack(dto: CreateTrackDto, id: string) {
    const track = await this.dbTrack.findUnique({ id });

    if (track) {
      return await this.dbTrack.update({ data: dto, id });
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteTrack(id: string) {
    const track = await this.dbTrack.delete({ id });
    if (track) {
      this.dbFavs.delete({ key: 'tracks', value: id });

      return track;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }
}
