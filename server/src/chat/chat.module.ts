import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { RoomService } from './rooms/room.service';
import { JwtService } from '@nestjs/jwt';
import { WebSocketService } from './chat.gateway.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, RoomService, JwtService, WebSocketService],
  exports: [RoomService],
})
export class ChatModule {}
