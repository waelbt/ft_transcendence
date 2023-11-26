import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateRoomDto } from './DTOS/create-room.dto';
import { RoomService } from './rooms/room.service';
import { JoinRoomDto } from './DTOS/join-room.dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto'

@Controller('chat')
export class ChatController {

    constructor ( private readonly roomService : RoomService) {}

    @Post('createRoom')
    async createRoom(@Req() req, @Body() createRoomDto: CreateRoomDto){

        return await (this.roomService.createRoom(createRoomDto, req.user.sub));
    }

    @Post('joinRoom')
    async joinRoom(@Req() req, @Body() joinRoomDto: JoinRoomDto){

        console.log(`controller: userid is ${req.user.sub}`)
        return await (this.roomService.joinRoom(joinRoomDto, req.user.sub));
    }

    @Post('leaveRoom')
    async leaveRoom(@Req() req, @Body() leaveRoomDto: LeaveRoomDto ){
    
        return await (this.roomService.leaveRoom(leaveRoomDto, req.user.sub));
    }

    @Get('getRooms')
    async getRooms(@Req() req) {
        
    }

}
