import { HttpException, Injectable } from '@nestjs/common';
import { DbArtistService } from 'src/db/dbArtist.service';
import { CreateArtistDto } from './interface';
import { DbAlbumService } from 'src/db/dbAlbum.service';

@Injectable()
export class ArtistService {
  constructor(
    private dbArtist: DbArtistService,
    private dbAlbum: DbAlbumService,
  ) {}

  async getAllArtists() {
    return await this.dbArtist.findMany({});
  }

  async getArtistById({ id }) {
    const artist = await this.dbArtist.findUnique({ id });

    if (artist) {
      return artist;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createArtist(dto: CreateArtistDto) {
    return await this.dbArtist.create({ data: dto });
  }

  async updateArtist(dto: CreateArtistDto, id: string) {
    const artist = await this.dbArtist.findUnique({ id });

    if (artist) {
      return await this.dbArtist.update({ data: dto, id });
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteArtist(id: string) {
    const artist = await this.dbArtist.delete({ id });

    if (artist) {
      const arrayOfAlbums = await this.dbAlbum.findMany({
        key: 'artistId',
        value: id,
      });

      arrayOfAlbums.forEach((item) => {
        item.artistId = null;
      });
      return artist;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }
}
