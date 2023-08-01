import { HttpException, Injectable } from '@nestjs/common';
import { DbUserService } from 'src/db/dbUser.service';
import { CreateUserDto, UpdatePasswordDto } from './interface';
import { getHashedPassword } from './utils/getHash';

@Injectable()
export class UserService {
  constructor(private dbUser: DbUserService) {}

  async getAllUsers() {
    return await this.dbUser.findMany();
  }

  async getUserById({ id }) {
    const user = await this.dbUser.findUnique({ id });

    if (user) {
      return user;
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = getHashedPassword(dto.password);
    dto.password = hashedPassword;
    return await this.dbUser.create({ data: dto });
  }

  async updatePassword(dto: UpdatePasswordDto, id: string) {
    const user = await this.dbUser.findUnique({ id });

    const oldHashedPassword = getHashedPassword(dto.oldPassword);

    if (user) {
      if (user.password === oldHashedPassword) {
        const newHashedPassword = getHashedPassword(dto.newPassword);
        dto.newPassword = newHashedPassword;

        return await this.dbUser.update({ data: dto, id });
      }
      throw new HttpException(`OldPassword is wrong`, 403);
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteUser(id: string) {
    const user = await this.dbUser.delete({ id });
    if (user) {
      return user;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }
}
