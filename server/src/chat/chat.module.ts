import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { RoomService } from './rooms/room.service';
import { JwtService } from '@nestjs/jwt';
import { WebSocketService } from './chat.gateway.service';
import { BlockService } from 'src/users/services/blocked.service'
import { UsersService } from 'src/users/services/users.service';
import { friendsService } from 'src/users/services/friends.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, RoomService, JwtService, WebSocketService,BlockService, UsersService, friendsService],
  exports: [RoomService, WebSocketService],
})
export class ChatModule {}
