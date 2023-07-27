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
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  createUserSchema,
  updateUserSchema,
} from './interface';
import { UserLessPassword } from './userLessPassword';
import { JoiValidationPipe } from './validationSchema';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length) {
      return users.map((item) => new UserLessPassword(item));
    }
    return users;
  }

  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById({ id });
    return new UserLessPassword(user);
  }

  @UsePipes(new JoiValidationPipe(createUserSchema))
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return new UserLessPassword(user);
  }

  // @UsePipes(new JoiValidationPipe(updateUserSchema))
  @Put(':id')
  async updatePasswordUser(
    @Body(new JoiValidationPipe(updateUserSchema))
    updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const user = await this.userService.updatePassword(updatePasswordDto, id);
    return new UserLessPassword(user);
  }

  @HttpCode(204)
  @Delete(':id')
  async deletUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
