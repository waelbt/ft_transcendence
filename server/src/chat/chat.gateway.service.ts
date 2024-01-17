import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { RoomService } from "./rooms/room.service";
import { Server } from "socket.io";
import { JwtService } from '@nestjs/jwt';
import { MuteUserDto, UnmuteUserDto } from "./DTOS/mute-user-dto";
import { CreateMessageDto } from "./DTOS/create-message-dto";
import { RoomPrivacy } from '@prisma/client';
import { JoinRoomDto } from "./DTOS/join-room.dto";


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

    async getUserFromAccessToken(token: string) {

        // const accessToken =  await this.retrieveAccessToken(cookie);
        try {
    
          var jwtCheck = await this.jwt.verify(token, {secret: process.env.JWT_secret});
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

      async createGlobalRoom() {
        const title = "GlobalChat";
        const room = await this.prisma.room.findUnique({
            where: {
                roomTitle: title
            }
        });

        if (room)
            return (room);

        const globalRoom = await this.prisma.room.create({
            data: {
                roomTitle: title,
                isConversation: false,
                privacy: RoomPrivacy.PUBLIC,
            },
            include: {
                users: true,
                messages: true,
            }
        });

        return (globalRoom);
      }
      async joinUserToGlobalChat(userId: string) {

        const title = "GlobalChat";
        const room = await this.prisma.room.update({
            where: {
                roomTitle: title,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include : {
                        sender: true,
                    },
                },
            },
        });
      }

      async joinUserSocketToGlobalChat(userSocket: string, server: Server) {
        const title = "GlobalChat";
        server.in(userSocket).socketsJoin(title);
      }
}