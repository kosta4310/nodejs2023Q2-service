import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from '../utilities/validationPipe';
import { AlbumService } from './album.service';
import { CreateAlbumDto, createAlbumSchema } from './interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.getAlbumById({ id });
  }

  @UsePipes(new JoiValidationPipe(createAlbumSchema))
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Body(new JoiValidationPipe(createAlbumSchema))
    updateAlbumDto: CreateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
