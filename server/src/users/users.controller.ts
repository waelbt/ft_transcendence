import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return (this.usersService.createUser(createUserDto));
  }

  @Get()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneUser(id);
    if (!user)
      throw new NotFoundException(`user with the  id ${id} does not exist`);
    return (user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return (this.usersService.updateUser(Number(id), updateUserDto));
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return (this.usersService.removeUser(Number(id)));
  }
}
