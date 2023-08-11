import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './interface';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById({ id }) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (album) {
      return album;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createAlbum(dto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: dto });
  }

  async updateAlbum(dto: CreateAlbumDto, id: string) {
    try {
      return await this.prisma.album.update({ data: dto, where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }
}
