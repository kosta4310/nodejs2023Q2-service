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
import { ArtistService } from './artist.service';
import { CreateArtistDto, createArtistSchema } from './interface';
import { JoiValidationPipe } from '../utilities/validationPipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.getArtistById({ id });
  }

  @UsePipes(new JoiValidationPipe(createArtistSchema))
  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Body(new JoiValidationPipe(createArtistSchema))
    createArtistDto: CreateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.artistService.updateArtist(createArtistDto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
