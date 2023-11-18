import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  createUser(@Body() createUserDto: CreateUserDto) {
    return (this.usersService.createUser(createUserDto));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '/home/sel-ouaf/ft_transcendence/server/uploads',

      filename: (req, file, callback) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

        const nameWithoutExtension = file.originalname.split('.')[0];

        const ext = extname(file.originalname);

        const filename = `${nameWithoutExtension}-${uniqueName}${ext}`;

        callback(null, filename);
      },
    })
  }))

  handleUpload(@UploadedFile() file: Express.Multer.File) {

    console.log('file', file);

    return ('This endpoint will handle file upload...');
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneUser(id);
    if (!user)
      throw new NotFoundException(`user with the  id ${id} does not exist`);
    return (user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse()
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return (this.usersService.updateUser(Number(id), updateUserDto));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  removeUser(@Param('id') id: string) {
    return (this.usersService.removeUser(Number(id)));
  }
}
