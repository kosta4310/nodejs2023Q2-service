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
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  createUserSchema,
  updateUserSchema,
} from './interface';
import { JoiValidationPipe } from '../utilities/validationPipe';
import { UserTransformResponse } from './userTransformResponse';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length) {
      return users.map((item) => new UserTransformResponse(item));
    }
    return users;
  }

  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById({ id });
    return new UserTransformResponse(user);
  }

  @UsePipes(new JoiValidationPipe(createUserSchema))
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return new UserTransformResponse(user);
  }

  @Put(':id')
  async updatePasswordUser(
    @Body(new JoiValidationPipe(updateUserSchema))
    updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const user = await this.userService.updatePassword(updatePasswordDto, id);
    return new UserTransformResponse(user);
  }

  @HttpCode(204)
  @Delete(':id')
  async deletUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
