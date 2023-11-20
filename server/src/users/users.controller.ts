import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'
import { User } from '@prisma/client';
import { AuthGuard } from "@nestjs/passport";
import { jwtGuard } from 'src/auth/authGuard';
import { fileURLToPath } from 'url';
import { ParamsTokenFactory } from '@nestjs/core/pipes';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  sayHi(){
    console.log('Welcom To our Website again');
  }

  @Post()
  @ApiCreatedResponse()
  createUser(@Body() user: User) {
    return (this.usersService.createUser(user));
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './server/uploads',

  //     filename: (req, file, callback) => {
  //       const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

  //       const nameWithoutExtension = file.originalname.split('.')[0];

  //       const ext = extname(file.originalname);

  //       const filename = `${nameWithoutExtension}-${uniqueName}${ext}`;

  //       callback(null, filename);
  //     },
  //   })
  // }))

  // handleUpload(@UploadedFile() file: Express.Multer.File) {

  //   console.log('file', file);

  //   return ('This endpoint will handle file upload...');
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param() params,
  ){
    return this.usersService.uploadAvatar(file, params);
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
  async findOneUser(@Param('id', ParseIntPipe) user: User) {
    const findUser = await this.usersService.findOneUser(user);
    if (!findUser)
      throw new NotFoundException(`User with the  id ${user.id} does not exist`);
    return (findUser);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse()
  updateUser(@Param('id') id: string, @Body() user: User) {
    return (this.usersService.updateUser(String(id), user));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  removeUser(@Param('id') id: string) {
    return (this.usersService.removeUser(String(id)));
  }
}
