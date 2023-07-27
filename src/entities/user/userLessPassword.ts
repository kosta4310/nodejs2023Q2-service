import { Exclude } from 'class-transformer';

export class UserLessPassword {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp o

  @Exclude()
  password: string;

  constructor(partial: Partial<UserLessPassword>) {
    Object.assign(this, partial);
  }
}
