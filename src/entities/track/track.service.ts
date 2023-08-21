import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById({ id }) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (track) {
      return track;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createTrack(dto: CreateTrackDto) {
    return await this.prisma.track.create({ data: dto });
  }

  async updateTrack(dto: CreateTrackDto, id: string) {
    try {
      return await this.prisma.track.update({ data: dto, where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }
}
