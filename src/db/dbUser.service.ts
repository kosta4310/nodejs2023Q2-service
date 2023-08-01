import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/entities/user/interface';

@Injectable()
export class DbUserService {
  private db: Array<User> = [];

  async findMany() {
    return this.db;
  }

  async findUnique({ id }: { id: string }) {
    return this.db.find((item) => item.id === id);
  }

  async create({ data }: { data: CreateUserDto }) {
    const id = randomUUID({ disableEntropyCache: true });
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const user = Object.assign(data, { id, version, createdAt, updatedAt });
    this.db.push(user);
    return user;
  }

  async update({
    data,
    id,
  }: {
    data: Pick<UpdatePasswordDto, 'newPassword'>;
    id: string;
  }) {
    const user = this.db.find((item) => item.id === id);
    if (user) {
      user.version += 1;
      user.updatedAt = Date.now();
      user.password = data.newPassword;
    }
    return user;
  }

  async delete({ id }: { id: string }) {
    const user = this.db.find((item) => item.id === id);
    if (user) {
      this.db = this.db.filter((item) => item.id !== id);
    }
    return user;
  }
}
