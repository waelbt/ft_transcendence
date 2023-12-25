import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { RoomService } from "./rooms/room.service";
import { Server } from "socket.io";
import { JwtService } from '@nestjs/jwt';
import { MuteUserDto, UnmuteUserDto } from "./DTOS/mute-user-dto";
import { CreateMessageDto } from "./DTOS/create-message-dto";


@Injectable()
export class WebSocketService {
    constructor(private readonly prisma: PrismaOrmService,
                private readonly roomService: RoomService,
                private readonly jwt: JwtService
        ) {}

    async joinUserSocketToItsRooms(userSocket: string, userId: string, server: Server) {
        
        let joinedRooms;
        try {
            
            joinedRooms = await this.roomService.getMyRooms(userId);
        } catch(err)
        {
            console.log(err);
        }
        console.log(joinedRooms);

        for (let i = 0; i < joinedRooms.length; i++)
        {
            server.in(userSocket).socketsJoin(joinedRooms[i].roomTitle);
            console.log(`${userId} joined this room ${joinedRooms[i].roomTitle}`);
        }
    }

    async getUserFromAccessToken(cookie: string) {

        const accessToken =  await this.retrieveAccessToken(cookie);
        try {
    
          var jwtCheck = await this.jwt.verify(accessToken, {secret: process.env.JWT_secret});
        } catch(err) {

            return ({message: 'Not Authorized', state: false});
        }
        return ({userData: jwtCheck, state: true});
      }
    
      async retrieveAccessToken(cookie: string) : Promise<string> {
    
        const index = cookie.indexOf(';');
        const accessToken = cookie.slice(12, index);
        return (accessToken);
      }

      async muteUser(muteUserDto: MuteUserDto, userId: string) {

        try {

            await this.roomService.muteUser(muteUserDto, userId);
            // console.log('helloIN');
        } catch (err) {
            // console.log('hello');
            // console.log(err);
        }
      }

      async unmuteUser(unmuteUserDto: UnmuteUserDto, userId: string) {

        try {

            await this.roomService.unmuteUser(unmuteUserDto, userId);
        } catch (err) {

        }
      }

      async createMessage(payload: CreateMessageDto, userId: string) {

        try {
    
            await this.roomService.createMessage(payload, userId);
        } catch (err) {
            const message = err;
            throw Error(message);
        }
      }
}