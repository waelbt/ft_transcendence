import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { RoomService } from "./rooms/room.service";
import { Server } from "socket.io";


@Injectable()
export class WebSocketService {
    constructor(private readonly prisma: PrismaOrmService,
                private readonly roomService: RoomService,
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
}