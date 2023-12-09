import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseInterceptors, UploadedFile, Req, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { InvalidFileException } from '../multer/file.exception';
import { P_N_Dto } from '../dto/completeProfile.dto';
import { BlockService } from '../services/blocked.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly blockService: BlockService,) {}

  @Get(':id/me')
  async myInfos(@Req() req, @Param('id') userId: string){
    console.log('Welcom To our Website again');
    if (userId != req.user.sub){
      console.log('user1: ', userId, 'sub: ', req.user.sub);
      throw new UnauthorizedException('You are not allowed to remove this user from friends');
    }
    return (await this.usersService.myInfos(req, userId));
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
    @Req() req,
    @Param('userId') userId: string,
    @Param('blockedUserId') blockedUserId: string){
      if (userId != req.user.sub){
        console.log('user1: ', userId, 'sub: ', req.user.sub);
        throw new UnauthorizedException('You are not allowed to reject this friend request');
    }
      this.blockService.blockUser(userId, blockedUserId);
  }

  @Post(':userId/unblockUser/:unblockedUserId')
  async unblockUser(
    @Req() req,
    @Param('userId') userId: string,
    @Param('unblockedUserId') unblockedUserId: string){
      if (userId != req.user.sub){
        console.log('user1: ', userId, 'sub: ', req.user.sub);
        throw new UnauthorizedException('You are not allowed to reject this friend request');
    }
      this.blockService.unblockUser(userId, unblockedUserId);
    }

  @Get(':userId/canInteractWith/:otherUserId')
  async canInteractWith(
    @Req() req,
    @Param('userId') userId: string,
    @Param('otherUserId') otherUserId: string): Promise<Boolean>{
      if (userId != req.user.sub){
        console.log('user1: ', userId, 'sub: ', req.user.sub);
        throw new UnauthorizedException('You are not allowed to reject this friend request');
    }
      const isItBlocked = await this.blockService.isUserBlocked(userId, otherUserId);;
      return isItBlocked ? false : true;
  }

  @Get(':userId/blockedUsers')
  async listOfBlockedUsers(@Req() req, @Param('userId') userId: string){
    if (userId != req.user.sub){
      console.log('user1: ', userId, 'sub: ', req.user.sub);
      throw new UnauthorizedException('You are not allowed to reject this friend request');
    }
    return await this.blockService.listOfBlockedUsers(userId);
  }
// Close Prisma client when done
// prisma.$disconnect();
}
