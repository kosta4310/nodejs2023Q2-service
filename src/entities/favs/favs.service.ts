import { HttpException, Injectable } from '@nestjs/common';
import { InputFavs } from 'src/db/dbFavs.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  private accordingDb = {
    artists: this.prisma.favArtist,
    albums: this.prisma.favAlbum,
    tracks: this.prisma.favTrack,
  };

  async getAllFavs() {
    const favTracks = this.prisma.favTrack.findMany({
      select: { Track: true },
    });
    const favArtists = this.prisma.favArtist.findMany({
      select: { Artist: true },
    });
    const favAlbums = this.prisma.favAlbum.findMany({
      select: { Album: true },
    });

    const [artists, albums, tracks] = await Promise.all([
      favArtists,
      favAlbums,
      favTracks,
    ]);

    const mappedArtists = artists.map((artist) => artist.Artist);
    const mappedAlbums = albums.map((album) => album.Album);
    const mappedTracks = tracks.map((track) => track.Track);

    return {
      artists: mappedArtists,
      albums: mappedAlbums,
      tracks: mappedTracks,
    };
  }

  async createFavsTrack(data: { trackId: string }) {
    try {
      const res = await this.prisma.favTrack.create({ data });
      return { message: res };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          `Record with id === ${data.trackId} doesn't exist`,
          422,
        );
      } else if (error.code === 'P2002') {
        return { message: 'The record already exist in favorites' };
      } else throw error;
    }
  }

  async deleteFavsTrack({ trackId }: { trackId: string }) {
    try {
      const res = await this.prisma.favTrack.delete({
        where: { trackId },
      });
      return res;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          `Record with id === ${trackId} doesn't exist in favorites`,
          404,
        );
      }
      throw error;
    }
  }

  async createFavsAlbum(data: { albumId: string }) {
    try {
      const res = await this.prisma.favAlbum.create({ data });
      return { message: res };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          `Record with id === ${data.albumId} doesn't exist`,
          422,
        );
      } else if (error.code === 'P2002') {
        return { message: 'The record already exist in favorites' };
      } else throw error;
    }
  }

  async deleteFavsAlbum({ albumId }: { albumId: string }) {
    try {
      const res = await this.prisma.favAlbum.delete({
        where: { albumId },
      });
      return res;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          `Record with id === ${albumId} doesn't exist in favorites`,
          404,
        );
      }
      throw error;
    }
  }

  async createFavsArtist(data: { artistId: string }) {
    try {
      const res = await this.prisma.favArtist.create({ data });
      return { message: res };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          `Record with id === ${data.artistId} doesn't exist`,
          422,
        );
      } else if (error.code === 'P2002') {
        return { message: 'The record already exist in favorites' };
      } else throw error;
    }
  }

  async deleteFavsArtist({ artistId }: { artistId: string }) {
    try {
      const res = await this.prisma.favArtist.delete({
        where: { artistId },
      });
      return res;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          `Record with id === ${artistId} doesn't exist in favorites`,
          404,
        );
      }
      throw error;
    }
  }
}
