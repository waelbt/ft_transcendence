import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Req, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from '@prisma/client';
import { AuthGuard } from "@nestjs/passport";
import { jwtGuard } from 'src/auth/authGuard';
import { fileURLToPath } from 'url';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { extname } from 'path';
import { InvalidFileException } from '../multer/file.exception';
import { P_N_Dto } from '../dto/completeProfile.dto';
import { BlockService } from '../services/blocked.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly blockService: BlockService,
    private jwt:JwtService,
    private config: ConfigService) {}

  @Get('me')
  sayHi(@Req() req){
    console.log('Welcom To our Website again');
    return req.user;
  }

  @Post()
  @ApiCreatedResponse()
  createUser(@Body() user: User) {
    console.log('userId /////', user)
    return (this.usersService.createUser(user, user.id));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req,
  ){
    try {
      if (!file) {
        throw new InvalidFileException('No file provided.');
      }
      console.log(file);
      return await this.usersService.uploadAvatar(file, req);
    }catch (error) {
      if (error instanceof InvalidFileException) {
        throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: error.message }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/image')
  async deleteImage(path: string){
    return await this.usersService.deleteImage(path);
  }
  
  @Get('/info')
  async UserInfo(@Req() req, dto: P_N_Dto){
    return await this.usersService.userInfo(req, dto);    
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
  async findOneUser(@Param('id') id: string) {
    console.log('hi im here');
    const findUser = await this.usersService.getOneUser(id);
    if (!findUser)
      throw new NotFoundException(`User with the  id ${id} does not exist`);
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

  @Post(':userId/blockUser/:blockedUserId')
  async blockUser(
    @Param('userId') userId: string,
    @Param('blockedUserId') blockedUserId: string){
      this.blockService.blockUser(userId, blockedUserId);
  }

  @Post(':userId/unblockUser/:unblockedUserId')
  async unblockUser(
    @Param('userId') userId: string,
    @Param('unblockedUserId') unblockedUserId: string){
      this.blockService.unblockUser(userId, unblockedUserId);
    }

  @Get(':userId/canInteractWith/:otherUserId')
  async canInteractWith(
    @Param('userId') userId: string,
    @Param('otherUserId') otherUserId: string): Promise<Boolean>{
      const isItBlocked = await this.blockService.isUserBlocked(userId, otherUserId);;
      return isItBlocked ? false : true;
  }
  @Get(':userId/blockedUsers')
  async listOfBlockedUsers(@Param('userId') userId: string){
    return await this.blockService.listOfBlockedUsers(userId);
  }
// Close Prisma client when done
// prisma.$disconnect();
}