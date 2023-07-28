import * as Joi from 'joi';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export const createArtistSchema = Joi.object({
  name: Joi.string().required(),
  grammy: Joi.boolean().required(),
});
