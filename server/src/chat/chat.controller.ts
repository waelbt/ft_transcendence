import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Param,
    ParseIntPipe,
    NotFoundException,
    UseGuards
} from '@nestjs/common';
import { CreateRoomDto } from './DTOS/create-room.dto';
import { RoomService } from './rooms/room.service';
import { JoinRoomDto } from './DTOS/join-room.dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto';
import { SetAdminDto } from './DTOS/set-admin-room.dto';
import { KickMemberDto } from './DTOS/kick-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { BanMemberDto } from './DTOS/ban-member-dto';
import { RemoveBanDto } from './DTOS/remove-ban-dto';
import { changeRoomPasswordDto } from './DTOS/change-room-password';
import { MuteUserDto, UnmuteUserDto } from './DTOS/mute-user-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './DTOS/create-message-dto';
import { WebSocketService } from './chat.gateway.service';
import { CreateDmDto } from './DTOS/create-dm.dto';
import { ChangeRoomPrivacy } from './DTOS/change-roomPrivacy-dto';
import { ChangeRoomTitle } from './DTOS/change-roomTitle-dto';
import { ChangeRoomAvatar } from './DTOS/change-roomAvatar-dto';

@ApiBearerAuth()
@ApiTags('Chat')
@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
    constructor(
        private readonly roomService: RoomService,
        private readonly wsService: WebSocketService
    ) {}

    @Post('createRoom')
    async createRoom(@Req() req, @Body() createRoomDto: CreateRoomDto) {
        console.log('room ', createRoomDto);
        return await this.roomService.createRoom(createRoomDto, req.user.sub);
    }

    @Post('joinRoom')
    async joinRoom(@Req() req, @Body() joinRoomDto: JoinRoomDto) {
        // console.log(`controller: userid is ${req.user.sub}`)
        return await this.roomService.joinRoom(joinRoomDto, req.user.sub);
    }

    @Post('leaveRoom')
    async leaveRoom(@Req() req, @Body() leaveRoomDto: LeaveRoomDto) {
        return await this.roomService.leaveRoom(leaveRoomDto, req.user.sub);
    }

    @Post('changeRoomPrivacy')
    async changeRoomPrivacy(@Req() req, @Body() changeRoomPrivacy: ChangeRoomPrivacy) {
    
        return await (this.roomService.changeRoomPrivacy(changeRoomPrivacy, req.user.sub));
    }

    @Post('changeRoomTitle')
    async changeRoomTitle(@Req() req, @Body() changeRoomTitle: ChangeRoomTitle) {

        console.log('wa zabi', req.user.sub );
        return await (this.roomService.changeRoomTitle(changeRoomTitle, req.user.sub));
    }

    @Post('changeRoomAvatar')
    async changeRoomAvatar(@Req() req, @Body() changeRoomAvatar: ChangeRoomAvatar) {

        return await (this.roomService.changeRoomAvatar(changeRoomAvatar, req.user.sub));
    }

    @Get('AllRooms')
    async getAllRooms(@Req() req) {
        return await this.roomService.getAllRooms(req.user.sub);
    }

    @Get('mydms')
    async getMyDms(@Req() req) {
        console.log('helooooooooooooo', req.user.sub);
        return this.roomService.getAllMyDms(req.user.sub);
    }

    @Get('myRooms')
    async getMyRooms(@Req() req, res: Response) {
        console.log('hellooooooooooo', req.user.sub);

        return await this.roomService.getMyRooms(req.user.sub);
    }

    @Get('allChannels')
    async getAllChannels(@Req() req) {
        return await this.roomService.getAllChannels(req.user.sub);
    }

    @Get('/room/:id')
    async getRoomUsers(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return await this.roomService.getOneRoom(id, req.user.sub);
    }

    @Get('/dm/:id')
    async getDmRoom(@Req() req, @Param('id', ParseIntPipe) id: number) {
        console.log('wwww ', id);
        return await this.roomService.getDmRoom(id, req.user.sub);
    }

    @Post('setAdmin')
    async setUserToAdminRoom(@Req() req, @Body() setAdminDto: SetAdminDto) {
        return this.roomService.setUserToAdminRoom(setAdminDto, req.user.sub);
    }

    @Post('createDm')
    async createDm(@Req() req, @Body() createDmDto: CreateDmDto) {
        return this.wsService.CheckForExistingDmRoom(
            req.user.sub,
            createDmDto.friendId
        );
    }

    @Post('kickMember')
    async kickMember(@Req() req, @Body() kickMemberDto: KickMemberDto) {
        return this.roomService.kickMember(kickMemberDto, req.user.sub);
    }

    @Post('banMember')
    async banMember(@Req() req, @Body() banMemberDto: BanMemberDto) {
        return this.roomService.banMember(banMemberDto, req.user.sub);
    }

    @Post('removeBan')
    async removeBan(@Req() req, @Body() removeBan: RemoveBanDto) {
        return this.roomService.removeBan(removeBan, req.user.sub);
    }

    @Post('changeRoomPassword')
    async changeRoomPassword(
        @Req() req,
        @Body() changeRoomPasswordDto: changeRoomPasswordDto
    ) {
        return this.roomService.changeRoomPassword(
            changeRoomPasswordDto,
            req.user.sub
        );
    }

    @Post('muteUser')
    async muteUser(@Req() req, @Body() muteUserDto: MuteUserDto) {
        return this.roomService.muteUser(muteUserDto, req.user.sub);
    }

    @Post('unmuteUser')
    async unmuteUser(@Req() req, @Body() unmuteUserDto: UnmuteUserDto) {
        return this.roomService.unmuteUser(unmuteUserDto, req.user.sub);
    }

    @Post('changeRoomInfo')
    async changeRoomInfo(@Req() req, @Body() ChangeRoomInfoDto) {

    }
}
