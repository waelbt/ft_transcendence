import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Room, User, RoomPrivacy } from '@prisma/client'
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { CreateRoomDto } from '../DTOS/create-room.dto';
import { JoinRoomDto } from '../DTOS/join-room.dto';
import { LeaveRoomDto } from '../DTOS/leave-room.dto';
import { SetAdminDto } from '../DTOS/set-admin-room.dto';
import { KickMemberDto } from '../DTOS/kick-member.dto';

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
                    },
                    owner: [userId],
                    admins: [userId],
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
            throw new NotFoundException('No Exsiting Room With This Id');
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
        });

        return (room);
    }

    async leaveRoom(leaveRoomDto: LeaveRoomDto, userId: string) {

        let room = await this.findRoomByTitle(leaveRoomDto.roomTitle);

        room = await this.prisma.room.update({
            where: {
                roomTitle: leaveRoomDto.roomTitle,
            },
            data : {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        // here i should check if the room has no more users
        // if yes
        // i should delete all the messages that belongs to it
        // and delete the room it self
        return (room);

    }

    async getRooms() {
        const rooms = await this.prisma.room.findMany({
            where: {
                isConversation: false,
                privacy: {
                    not: RoomPrivacy.PRIVATE,
                },
            },
            include: {
                users: true,
                messages: true,
            },
        });

        return (rooms);
    }


    async getOneRoom(roomId: number, userId: string) {


        const tmproom = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            }
        });

        if (!tmproom)
            throw new NotFoundException('No Exsiting Room With This Id');

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                rooms: {
                    where: {
                        id: roomId,
                    }
                }
            }
        });

        // console.log(user.rooms);

        if (user.rooms.length === 0)
            throw new BadRequestException(`You are not a member of this room`);

        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return (room);
    }

    async setUserToAdminRoom(setAdminDto: SetAdminDto, userId: string) {


        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: setAdminDto.roomId,
            },
            select: {
                admins: true,
            }
        });

        let updatedRoom;
        if (roomWithAdmins.admins.includes(userId))
        {
            updatedRoom = await this.prisma.room.updateMany({
                where: {
                    id: setAdminDto.roomId,
                },
                data :{
                    admins: {
                        set: [...roomWithAdmins.admins, setAdminDto.userId],
                    },
                },
            });
        }

        return (updatedRoom);

    }

    async kickMember(kickMemberDto: KickMemberDto, userId: string) {

        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: kickMemberDto.roomId,
            },
            select: {
                admins: true,
            }
        });

        if (roomWithAdmins.admins.includes(userId))
        {
            const room = await this.prisma.room.findUnique({
                where: {
                    id: kickMemberDto.roomId,
                },
                select: {
                    users: {
                        where: {
                            id: kickMemberDto.userId,
                        },
                    },
                }
            });

            if (room.users.length === 0)
                throw new BadRequestException('User Is Not A Member In This Chat');

            await this.unsetUserFromAdmins(kickMemberDto.roomId, kickMemberDto.userId);

            const tmpRoom = await this.prisma.room.update({
                where : {
                    id: kickMemberDto.roomId,
                },
                data : {
                    users: {
                        disconnect: {
                            id: kickMemberDto.userId,
                        },
                    },
                },
                include: {
                    users: true,
                },
            });

            return (tmpRoom);
        }

        throw new BadRequestException('Only Admins Can Kick Other Users');

    }


    async unsetUserFromAdmins(roomId: number, userId: string) {

        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: roomId,
            },
            select: {
                admins: true,
            },
        });

        if (roomWithAdmins.admins.includes(userId))
        {
            const room = await this.prisma.room.updateMany({
                where: {
                    id: roomId,
                },
                data: {
                    admins: {
                        set: roomWithAdmins.admins.filter((admin) => admin !== userId),
                    },
                },
            });
        }

    }
}