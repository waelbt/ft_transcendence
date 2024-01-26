import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UseInterceptors,
    UploadedFile,
    Req,
    UnauthorizedException,
    HttpException,
    HttpStatus,
    UseGuards,
    Res
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiBody,
    ApiOperation
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { InvalidFileException } from '../multer/file.exception';
import { BlockService } from '../services/blocked.service';
import { userInfos } from '../dto/userInfo.dto';
import { dto } from '../dto/completeProfile.dto';
import { avatarDTO } from '../dto/avatar.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly blockService: BlockService
    ) {}

    @Get(':id/profile')
    // @ApiResponse({ status: 404, description: 'Not Found' })
    async userInfos(@Req() req, @Param('id') userId: string) {
        const user = await this.usersService.findOneUser(userId);
        if (!user) {
            throw new NotFoundException('this user does not exist');
        }
        return await this.usersService.userInfos(req, userId);
    }

    @Get('me')
    async myInfos(@Req() req) {
        console.log('Welcom To our Website again');
        // if (userId != req.user.sub){
        //   console.log('user1: ', userId, 'sub: ', req.user.sub);
        //   throw new UnauthorizedException('You are not allowed to remove this user from friends');
        // }
        return await this.usersService.myInfos(req);
    }

    // @Post()
    // @ApiCreatedResponse()
    // createUser(@Body() user: User) {
    //   console.log('userId /////', user)
    //   return (this.usersService.createUser(user, user.id));
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(
        @UploadedFile()
        file: Express.Multer.File,
        @Req() req
    ) {
        try {
            if (!file) {
                throw new InvalidFileException('No file provided.');
            }
            console.log(file);
            return await this.usersService.uploadAvatar(file, req);
        } catch (error) {
            if (error instanceof InvalidFileException) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: error.message
                    },
                    HttpStatus.BAD_REQUEST
                );
            }

            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error'
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete('/delete/:image')
    async deleteImage(@Param('image') path: string) {
        return await this.usersService.deleteImage(path);
    }

    @Post('/info')
    @ApiBody({ type: dto })
    async UserInfo(@Req() req, @Body() dto: dto) {
        console.log('ana hnaya');
        console.log('avatar: ', dto.avatar);
        console.log('nickName: ', dto.nickName);
        return await this.usersService.userInfo(req, dto.avatar, dto.nickName);
    }

    @Get('/previo/:id')
    async userData(@Param('id') id: string) {
        return await this.usersService.userData(id);
    }

    @Get('all')
    @ApiBearerAuth()
    @ApiOkResponse()
    findAllUser() {
        return this.usersService.findAllUser();
    }

    @Get('historyMatchs')
    async match_history(@Req() req) {
        return await this.usersService.matchHistory(req.user.sub);
    }

    @Get(':id/user')
    @ApiBearerAuth()
    @ApiOkResponse()
    async findOneUser(@Param('id') id: string) {
        console.log('hi im here');
        const findUser = await this.usersService.getOneUser(id);
        if (!findUser)
            throw new NotFoundException(
                `User with the  id ${id} does not exist`
            );
        return findUser;
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiCreatedResponse()
    updateUser(@Param('id') id: string, @Body() user: User) {
        return this.usersService.updateUser(String(id), user);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOkResponse()
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(String(id));
    }

    @Post('UpdateAvatar/')
    async updateAvatar(@Req() req, @Res() res, @Body() dto: avatarDTO) {
        await this.usersService.deleteImage(dto.oldAvatar);
        await this.usersService.updateAvatar(req.user.sub, dto.newAvatar);
        res.send('seccess');
    }

    @Post('UpdateNickName/')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nickName: {
                    type: 'string'
                }
            }
        }
    })
    async updateNickname(@Req() req, @Res() res, @Body('nickName') name) {
        await this.usersService.updateNickName(req.user.sub, name);
        res.send('seccess');
    }

    @Post('/blockUser/:blockedUserId')
    async blockUser(@Req() req, @Param('blockedUserId') blockedUserId: string) {
        //   if (userId != req.user.sub){
        //     console.log('user1: ', userId, 'sub: ', req.user.sub);
        //     throw new UnauthorizedException('You are not allowed to reject this friend request');
        // }
        this.blockService.blockUser(req.user.sub, blockedUserId);
    }

    @Post('/unblockUser/:unblockedUserId')
    async unblockUser(
        @Req() req,
        @Param('unblockedUserId') unblockedUserId: string
    ) {
        //   if (userId != req.user.sub){
        //     console.log('user1: ', userId, 'sub: ', req.user.sub);
        //     throw new UnauthorizedException('You are not allowed to reject this friend request');
        // }
        this.blockService.unblockUser(req.user.sub, unblockedUserId);
    }

    @Get('/canInteractWith/:otherUserId')
    async canInteractWith(
        @Req() req,
        @Param('otherUserId') otherUserId: string
    ): Promise<Boolean> {
        // if (userId != req.user.sub){
        //   console.log('user1: ', userId, 'sub: ', req.user.sub);
        //   throw new UnauthorizedException('You are not allowed to reject this friend request');
        // }
        const isItBlocked = await this.blockService.isUserBlocked(
            req.user.sub,
            otherUserId
        );
        return isItBlocked ? false : true;
    }

    @Get('/blockedUsers')
    async listOfBlockedUsers(@Req() req) {
        console.log('hello');
        // if (userId != req.user.sub){
        //   console.log('user1: ', userId, 'sub: ', req.user.sub);
        //   throw new UnauthorizedException('You are not allowed to reject this friend request');
        // }
        return await this.blockService.listOfBlockedUsers(req.user.sub);
    }
    // Close Prisma client when done
    // prisma.$disconnect();
}
