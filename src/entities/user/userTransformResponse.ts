import { Exclude, Transform } from 'class-transformer';

export class UserTransformResponse {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number | Date; // timestamp of creation

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number | Date; // timestamp of update

  @Exclude()
  password: string;

  constructor(partial: Partial<UserTransformResponse>) {
    Object.assign(this, partial);
  }
}
