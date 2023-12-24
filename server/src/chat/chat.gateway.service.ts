import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { RoomService } from "./rooms/room.service";


@Injectable()
export class WebSocketService {
    constructor(private readonly prisma: PrismaOrmService,
                private readonly roomService: RoomService,
        ) {}

    async joinUserSocketToItsRooms() {
        
    }
}