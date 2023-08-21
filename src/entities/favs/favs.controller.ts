import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAccessAuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getAllFavorites() {
    return await this.favsService.getAllFavs();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.createFavsTrack({ trackId: id });
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteFavsTrack({ trackId: id });
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.createFavsArtist({ artistId: id });
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteFavsArtist({ artistId: id });
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.createFavsAlbum({ albumId: id });
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteFavsAlbum({ albumId: id });
  }
}
