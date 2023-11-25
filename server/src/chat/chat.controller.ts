import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateRoomDto } from './DTOS/create-room.dto';
import { RoomService } from './rooms/room.service';
import { JoinRoomDto } from './DTOS/join-room.dto';

@Controller('chat')
export class ChatController {

    constructor ( private readonly roomService : RoomService) {}

    @Post('createRoom')
    createRoom(@Req() req, @Body() createRoomDto: CreateRoomDto){

        console.log(req.user);
        return (this.roomService.createRoom(createRoomDto, req.user.sub));
    }

    @Post('joinRoom')
    joinRoom(@Req() req, @Body() joinRoomDto: JoinRoomDto){

        return (this.roomService.joinRoom(joinRoomDto, req.user.id));
    }

}
