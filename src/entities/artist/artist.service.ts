import { HttpException, Injectable } from '@nestjs/common';
import { DbArtistService } from 'src/db/dbArtist.service';
import { CreateArtistDto } from './interface';
import { DbAlbumService } from 'src/db/dbAlbum.service';
import { DbTrackService } from 'src/db/dbTrack.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById({ id }) {
    const user = await this.prisma.artist.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createArtist(dto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: dto });
  }

  async updateArtist(dto: CreateArtistDto, id: string) {
    try {
      return await this.prisma.artist.update({ data: dto, where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
  }
}
