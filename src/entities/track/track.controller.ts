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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from '../utilities/validationPipe';
import { TrackService } from './track.service';
import { CreateTrackDto, createTrackSchema } from './interface';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.getTrackById({ id });
  }

  @UsePipes(new JoiValidationPipe(createTrackSchema))
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Body(new JoiValidationPipe(createTrackSchema))
    updateTrackDto: CreateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.trackService.updateTrack(updateTrackDto, id);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
