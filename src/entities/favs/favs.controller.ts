import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getAllFavorites() {
    return await this.favsService.getAllFavs();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.create({ key: 'tracks', value: id });
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteEntity({ key: 'tracks', value: id });
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.create({ key: 'artists', value: id });
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteEntity({ key: 'artists', value: id });
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.create({ key: 'albums', value: id });
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteEntity({ key: 'albums', value: id });
  }
}
