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
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { InvalidFileException } from '../multer/file.exception';
import { BlockService } from '../services/blocked.service';
import { userInfos } from '../dto/userInfo.dto';
import { dto } from '../dto/completeProfile.dto';
import { avatarDTO } from '../dto/avatar.dto';
import { match_history } from '../dto/matchHistory.dto';
import { mydata } from '../dto/mydata.dto';
import { user, userData } from '../dto/userData.dto';
import { smallData } from '../dto/smallData.dto';
import { rank } from '../dto/rank.dto';
import { achievement } from '../dto/achievements.dto';
import { notificationService } from '../services/notification.service';
import { notification } from '../dto/notification.dto';
import { deleteNotById } from '../dto/deleteNotif.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly blockService: BlockService,
        private readonly notificationService: notificationService
    ) {}

    @Get(':id/profile')
    @ApiOperation({ summary: 'Get data of another user' })
    @ApiResponse({
        status: 200,
        description: 'Returns data of another user',
        type: userData
    })
    // @ApiResponse({ status: 404, description: 'Not Found' })
    async userInfos(@Req() req, @Param('id') userId: string) {
        const isItBlocked = await this.blockService.isUserBlocked(
            req.user.sub,
            userId
        );
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        const user = await this.usersService.findOneUser(userId);
        if (!user) {
            throw new NotFoundException('this user does not exist');
        }

        return await this.usersService.userInfos(req, userId);
    }

    @Get('me')
    @ApiOperation({ summary: 'Get my data' })
    @ApiResponse({ status: 200, description: 'Returns my data', type: mydata })
    async myInfos(@Req() req): Promise<mydata> {
        return await this.usersService.myInfos(req);
    }

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

    @Get('notification')
    @ApiOperation({ summary: 'get your notification notification ' })
    @ApiResponse({
        status: 200,
        description: 'Returns my notification',
        type: notification
    })
    async getNotifications(@Req() req) {
        const user = await this.usersService.getOneUser(req.user.sub);
        if (!user) throw new NotFoundException('this user does not exist');
        return await this.notificationService.getFilterNotificationsForUser(
            user.nickName
        );
    }

    @Delete('notification/:id')
    async deleteNotification(@Param('id') id: number) {
        await this.notificationService.deleteNotificationById(
            id
        );
    }

    // ! don't accept the one in backend
    @Delete('/delete/')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                path: {
                    type: 'string'
                }
            }
        }
    })
    async deleteImage(@Body('path') path) {
        return await this.usersService.deleteImage(path);
    }

    @Post('/info')
    @ApiBody({ type: dto })
    @ApiOperation({ summary: 'update user nickName and avatar' })
    @ApiResponse({ status: 200, description: 'Returns my data', type: user })
    async UserInfo(@Req() req, @Body() dto: dto): Promise<User> {
        // console.log('hi');
        // console.log('avatar: ', dto.avatar, 'nick: ', dto.nickName);
        return await this.usersService.userInfo(req, dto.avatar, dto.nickName);
    }

    @Get('/previo/:id')
    @ApiOperation({ summary: 'get small data for a user' })
    @ApiResponse({
        status: 200,
        description: 'Returns small data of a user',
        type: smallData
    })
    async userData(@Req() req, @Param('id') id: string): Promise<smallData> {
        // const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, id);
        // if (isItBlocked){
        // 	throw new NotFoundException('this user does not exist');
        // }

        return await this.usersService.userData(id);
    }

    @Get('all')
    @ApiBearerAuth()
    @ApiOkResponse()
    findAllUser() {
        return this.usersService.findAllUser();
    }

    @Get('achievements/:id')
    @ApiOperation({ summary: 'Get achievements of a user' })
    @ApiResponse({
        status: 200,
        description: 'Returns achivements of a user',
        type: achievement
    })
    async userAchievements(
        @Req() req,
        @Param('id') id: string
    ): Promise<achievement> {
        return await this.usersService.userAchievements(id);
    }
    @Get('onlineUsers')
    async onlineUsers(@Req() req) {
        return await this.usersService.onlineUsers(req.user.sub);
    }

    @Get('historyMatchs/:id')
    @ApiOperation({ summary: 'Get match history' })
    @ApiResponse({
        status: 200,
        description: 'Returns the match history of the user',
        type: match_history
    })
    async match_history(
        @Req() req,
        @Param('id') id: string
    ): Promise<match_history[]> {
        return await this.usersService.matchHistory(id);
    }

    @Get(':id/user')
    @ApiBearerAuth()
    @ApiOkResponse()
    async findOneUser(@Param('id') id: string) {
        // console.log('hi im here');
        const findUser = await this.usersService.getOneUser(id);
        if (!findUser)
            throw new NotFoundException(
                `User with the  id ${id} does not exist`
            );
        return findUser;
    }

    @Get('search/:keyword')
    @ApiOperation({ summary: 'get small data for a user' })
    @ApiResponse({
        status: 200,
        description: 'Returns small data of search bar',
        type: smallData
    })
    async searchBar(@Param('keyword') keyword: string): Promise<smallData[]> {
        return this.usersService.searchBar(keyword);
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
    async removeUser(@Param('id') id: string) {
        // console.log('id is : ', id);
        await this.usersService.removeUser(id);
        return 'true';
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

    @Get('rank')
    @ApiOperation({ summary: 'get rank of all users' })
    @ApiResponse({
        status: 200,
        description: 'Returns rank of all users',
        type: rank
    })
    async allUsersRank(@Req() req): Promise<rank[]> {
        return await this.usersService.getAllUsersRank(req.user.sub);
    }

    @Post('/blockUser/:blockedUserId')
    async blockUser(@Req() req, @Param('blockedUserId') blockedUserId: string) {
        const isBlocked = await this.blockService.isUserBlocked(
            req.user.sub,
            blockedUserId
        );
        if (isBlocked) throw new NotFoundException('this user does not exist');

        this.blockService.blockUser(req.user.sub, blockedUserId);
    }

    @Post('/unblockUser/:unblockedUserId')
    async unblockUser(
        @Req() req,
        @Param('unblockedUserId') unblockedUserId: string
    ) {
        this.blockService.unblockUser(req.user.sub, unblockedUserId);
    }

    @Get('/canInteractWith/:otherUserId')
    async canInteractWith(
        @Req() req,
        @Param('otherUserId') otherUserId: string
    ): Promise<Boolean> {
        const isItBlocked = await this.blockService.isUserBlocked(
            req.user.sub,
            otherUserId
        );
        return isItBlocked ? false : true;
    }

    @Get('/blockedUsers')
    @ApiOperation({ summary: 'get small data for a user' })
    @ApiResponse({
        status: 200,
        description: 'Returns small data of blocked Users',
        type: smallData
    })
    async listOfBlockedUsers(@Req() req): Promise<smallData[]> {
        return await this.blockService.listOfBlockedUsers(req.user.sub);
    }
    // Close Prisma client when done
    // prisma.$disconnect();
}
