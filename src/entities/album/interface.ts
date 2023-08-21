import * as Joi from 'joi';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const createAlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
  artistId: Joi.string().allow(null).required(),
});
