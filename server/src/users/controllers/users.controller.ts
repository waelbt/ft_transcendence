import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseInterceptors, UploadedFile, Req, UnauthorizedException, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { InvalidFileException } from '../multer/file.exception';
import { BlockService } from '../services/blocked.service';
import { userInfos } from '../dto/userInfo.dto';
import { dto } from '../dto/completeProfile.dto';
import { join } from 'path';
import { existsSync } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { jwtGuard } from 'src/auth/authGuard';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly blockService: BlockService,) {}

  @Get(':id')
  // @ApiResponse({ status: 404, description: 'Not Found' })
  async userInfos(@Req() req, @Param('id') userId: string){
    return (await this.usersService.userInfos(req, userId));
  }

  @Get('me')
  async myInfos(@Req() req){
    console.log('Welcom To our Website again');
    // if (userId != req.user.sub){
    //   console.log('user1: ', userId, 'sub: ', req.user.sub);
    //   throw new UnauthorizedException('You are not allowed to remove this user from friends');
    // }
    return (await this.usersService.myInfos(req));
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
      // console.log(file);
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
  
  @Post('/info')
  @ApiBody({type: dto})

  async UserInfo(
    @Req() req, @Body() dto: dto,
  ){
    console.log('ana hnaya');
    console.log('avatar: ', dto.avatar);
    console.log('nickName: ', dto.nickName);
    return await this.usersService.userInfo(req, dto.avatar, dto.nickName);    
  }

  @Get('all')
  @ApiOkResponse()
  async findAllUser() {
    return await this.usersService.findAllUser();
  }

  @Get('rank')
  async allUsersRank(){
    console.log('hana');
    return await this.usersService.getAllUsersRank();
  }

  @Get('historyMatches')
  async match_history(@Req() req){
    return await this.usersService.matchHistory(req.user.sub);
  }

  @Get(':image')
  getImage(@Param('image') image: string, @Res() res){

    const imagePath = join(process.cwd(), 'upload', image);

    if (existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      throw new NotFoundException('Image not found');
    }
  }

  @Get(':id')
  @ApiOkResponse()
  async findOneUser(@Param('id') id: string) {
    console.log('hi im here');
    const findUser = await this.usersService.getOneUser(id);
    if (!findUser)
      throw new NotFoundException(`User with the  id ${id} does not exist`);
    return (findUser);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  updateUser(@Param('id') id: string, @Body() user: User) {
    return (this.usersService.updateUser(String(id), user));
  }

  @Delete(':id')
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
