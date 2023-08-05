import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './interface';
import { getHashedPassword } from './utils/getHash';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    }));
  }

  async getUserById({ id }) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      return {
        ...user,
        createdAt: new Date(user.createdAt).valueOf(),
        updatedAt: new Date(user.updatedAt).valueOf(),
      };
    }

    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = getHashedPassword(dto.password);
    dto.password = hashedPassword;
    const user = await this.prisma.user.create({ data: dto });

    return {
      ...user,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  async updatePassword(dto: UpdatePasswordDto, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const oldHashedPassword = getHashedPassword(dto.oldPassword);

    if (user) {
      if (user.password === oldHashedPassword) {
        const newHashedPassword = getHashedPassword(dto.newPassword);
        dto.newPassword = newHashedPassword;

        const user = await this.prisma.user.update({
          data: { password: dto.newPassword, version: { increment: 1 } },
          where: { id },
        });

        return {
          ...user,
          createdAt: new Date(user.createdAt).valueOf(),
          updatedAt: new Date(user.updatedAt).valueOf(),
        };
      }
      throw new HttpException(`OldPassword is wrong`, 403);
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      }
      throw error;
    }
  }
}
