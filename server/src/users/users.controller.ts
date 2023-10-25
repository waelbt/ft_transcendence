import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  createUser(@Body() createUserDto: CreateUserDto) {
    return (this.usersService.createUser(createUserDto));
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneUser(id);
    if (!user)
      throw new NotFoundException(`user with the  id ${id} does not exist`);
    return (user);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return (this.usersService.updateUser(Number(id), updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  removeUser(@Param('id') id: string) {
    return (this.usersService.removeUser(Number(id)));
  }
}
