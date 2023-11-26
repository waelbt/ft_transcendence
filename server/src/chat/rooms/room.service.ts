import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Room, User, RoomPrivacy } from '@prisma/client'
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { CreateRoomDto } from '../DTOS/create-room.dto';
import { JoinRoomDto } from '../DTOS/join-room.dto';


@Injectable()
export class RoomService {

constructor(private readonly prisma: PrismaOrmService){}

    async createRoom(createRoomDto: CreateRoomDto, userId: string) {

        // const newRoom = await this.findRoomByTitle(createRoomDto.roomTitle);
        // if (!newRoom)
        // {
            console.log(` the user id is ${userId}`);
            const newRoom = await this.prisma.room.create({
                data: {
                    roomTitle: createRoomDto.roomTitle,
                    isConversation: createRoomDto.isConversation,
                    privacy: createRoomDto.privacy,
                    users: {
                        connect: {
                            id : userId
                        },
                    }
                },
                include : {
                    users: true,
                    messages: true,
                }
            });
        // }
        return (newRoom);
    }

    async findRoomByTitle(roomTitle: string) {
        
        const existingRoom = await this.prisma.room.findUnique({
            where: {
                roomTitle: roomTitle,
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        })

        return (existingRoom);

    }

    async joinRoom(joinRoomDto: JoinRoomDto, userId: string) {

        // check if the room existed and if the user is already joined
        console.log(joinRoomDto.roomTitle, userId);
        let room = await this.prisma.room.findUnique({
            where: {
                roomTitle: joinRoomDto.roomTitle,
            },
            select: {
                privacy: true,
            }
        })

        if (!room)
            throw new BadRequestException("Already Joined");
        else if (room.privacy == 'PRIVATE')
            throw new BadRequestException("This Room Is Private");
        // else if (room.privacy == 'PROTECTED')
            // should check if the password match 

        console.log(`this is the user id ${userId}`);
        room = await this.prisma.room.update({
            where: {
                roomTitle: joinRoomDto.roomTitle,
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
                        user: true,
                    },
                },
            },
        })

        return (room);
    }
}
