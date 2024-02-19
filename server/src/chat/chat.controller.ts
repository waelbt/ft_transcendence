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
}
