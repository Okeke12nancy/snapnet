import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import UserService from './user.service';
import { CreateUserDTO } from 'src/auth/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }
}
