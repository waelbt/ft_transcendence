import { Body, Controller, Get, Post, Req, Param, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './DTOS/create-room.dto';
import { RoomService } from './rooms/room.service';
import { JoinRoomDto } from './DTOS/join-room.dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto'
import { SetAdminDto } from './DTOS/set-admin-room.dto';
import { KickMemberDto } from './DTOS/kick-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from "express"
import { BanMemberDto } from './DTOS/ban-member-dto';
import { RemoveBanDto } from './DTOS/remove-ban-dto';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {

    constructor ( private readonly roomService : RoomService) {}

    @Post('createRoom')
    async createRoom(@Req() req, @Body() createRoomDto: CreateRoomDto){

        return await (this.roomService.createRoom(createRoomDto, req.user.sub));
    }

    @Post('joinRoom')
    async joinRoom(@Req() req, @Body() joinRoomDto: JoinRoomDto){

        // console.log(`controller: userid is ${req.user.sub}`)
        return await (this.roomService.joinRoom(joinRoomDto, req.user.sub));
    }

    @Post('leaveRoom')
    async leaveRoom(@Req() req, @Body() leaveRoomDto: LeaveRoomDto ){
    
        return await (this.roomService.leaveRoom(leaveRoomDto, req.user.sub));
    }

    @Get('AllRooms')
    async getAllRooms() {
     
        return  await (this.roomService.getAllRooms());

    }

    @Get('myRooms')
    async getMyRooms(@Req() req, res: Response) {

        return await (this.roomService.getMyRooms(req.user.sub));
    }

    @Get(':id')
    async getRoomUsers(@Req() req,  @Param('id', ParseIntPipe) id: number) {

        return await (this.roomService.getOneRoom(id, req.user.sub));
    }

    @Post('setAdmin')
    async setUserToAdminRoom(@Req() req, @Body() setAdminDto : SetAdminDto) {

        return (this.roomService.setUserToAdminRoom(setAdminDto, req.user.sub));
    }
    

    @Post('kickMember')
    async kickMember(@Req() req, @Body() kickMemberDto: KickMemberDto){

        return (this.roomService.kickMember(kickMemberDto, req.user.sub))

    }

    @Post('banMember')
    async banMember(@Req() req, @Body() banMemberDto: BanMemberDto) {

        return (this.roomService.banMember(banMemberDto, req.user.sub));

    }


    @Post('removeBan')
    async removeBan(@Req() req, @Body() removeBan: RemoveBanDto) {
     
        return (this.roomService.removeBan(removeBan, req.user.sub));
    }
}
