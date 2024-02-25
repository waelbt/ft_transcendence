import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { RoomService } from './rooms/room.service';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MuteUserDto, UnmuteUserDto } from './DTOS/mute-user-dto';
import { SendMessageDto } from './DTOS/send-message-dto';

@Injectable()
export class WebSocketService {
    constructor(
        private readonly prisma: PrismaOrmService,
        private readonly roomService: RoomService,
        private readonly jwt: JwtService
    ) {}

    // async joinUserSocketToItsRooms(
    //     userSocket: string,
    //     userId: string,
    //     server: Server
    // ) {
    async joinUserSocketToItsRooms(
        userSocket: string,
        userId: string,
        server: Server
    ) {
        let joinedRooms;
        try {
            joinedRooms = await this.roomService.getMyRooms(userId);
            const dms = await this.getAllDms(userId);
            for (let j = 0; j < dms.length; j++) {
                server.in(userSocket).socketsJoin(dms[j].roomTitle);
                // console.log(`${userId} joined this dm ${dms[j].roomTitle}`);
            }
            if (!joinedRooms) {
                // console.log('No rooms found for user:', userId);
                return;
            }
            for (let i = 0; i < joinedRooms.length; i++) {
                server.in(userSocket).socketsJoin(joinedRooms[i].roomTitle);
                console
                    .log
                    // `${userId} joined this room ${joinedRooms[i].roomTitle}`
                    ();
            }
        } catch (err) {
            // console.log(err);
        }
        // console.log(joinedRooms);
    }

    async getUserFromAccessToken(token: string) {
        // const accessToken =  await this.retrieveAccessToken(cookie);
        try {
            var jwtCheck = await this.jwt.verify(token, {
                secret: process.env.JWT_secret
            });
        } catch (err) {
            return { message: 'Not Authorized', state: false };
        }
        return { userData: jwtCheck, state: true };
    }

    async retrieveAccessToken(cookie: string): Promise<string> {
        const index = cookie.indexOf(';');
        const accessToken = cookie.slice(12, index);
        return accessToken;
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
        } catch (err) {}
    }

    async createMessage(payload: SendMessageDto, userId: string) {
        try {
            const { room, newMessage } = await this.roomService.createMessage(
                payload,
                userId
            );
            return { room, newMessage };
        } catch (err) {
            const message = err;
            throw Error(message);
        }
    }

    // async createGlobalRoom() {
    //     const title = 'GlobalChat';
    //     const room = await this.prisma.room.findUnique({
    //         where: {
    //             roomTitle: title
    //         }
    //     });

    //     if (room) return room;

    //     const globalRoom = await this.prisma.room.create({
    //         data: {
    //             roomTitle: title,
    //             isConversation: false,
    //             privacy: RoomPrivacy.PUBLIC
    //         },
    //         include: {
    //             users: true,
    //             messages: true
    //         }
    //     });

    //     return globalRoom;
    // }
    // async joinUserToGlobalChat(userId: string) {
    //     const title = 'GlobalChat';
    //     const room = await this.prisma.room.update({
    //         where: {
    //             roomTitle: title
    //         },
    //         data: {
    //             users: {
    //                 connect: {
    //                     id: userId
    //                 }
    //             }
    //         },
    //         include: {
    //             users: true,
    //             messages: {
    //                 include: {
    //                     sender: true
    //                 }
    //             }
    //         }
    //     });
    // }

    async joinUserSocketToGlobalChat(userSocket: string, server: Server) {
        const title = 'GlobalChat';
        server.in(userSocket).socketsJoin(title);
    }

    async createDm(user1id: string, user2id: string) {
        const title: string = user1id + user2id;
        const newDm = await this.prisma.dMRooms.create({
            data: {
                roomTitle: title,
                friendId: user2id,
                users: {
                    connect: [{ id: user1id }, { id: user2id }]
                }
            },
            include: {
                users: true,
                messages: true
            }
        });
        return newDm;
    }

    async CheckForExistingDmRoom(user1id: string, user2id: string) {
        const dm = await this.prisma.dMRooms.findFirst({
            where: {
                AND: [
                    { users: { some: { id: user1id } } },
                    { users: { some: { id: user2id } } }
                ]
            },
            include: {
                users: true,
                messages: true
            }
        });

        if (!dm) {
            const newDm = await this.createDm(user1id, user2id);
            return newDm;
        }
        return dm;
    }

    async sendDM(user1id: string, roomId: string, message: string) {
        // const dm = await this.prisma.dMRooms.findFirst({
        //     where: {
        //         AND: [
        //             { users: { some: { id: user1id } } },
        //             { users: { some: { id: user2id } } }
        //         ]
        //     },
        //     include: {
        //         users: true,
        //         messages: true
        //     }
        // });
        // console.log('test for id', dm);
        // dm.users = dm.users.filter((user) => userId != user.id);
        try {
            let dm = await this.prisma.dMRooms.findFirst({
                where: {
                    id: +roomId
                },
                include: {
                    users: true,
                    messages: true
                }
            });
            dm.users = dm.users.filter((user) => user1id != user.id);

            if (await this.isUserBlocked(user1id, dm.users[0].id)) return dm;

            const newMessage = await this.prisma.dmMessage.create({
                data: {
                    message: message,
                    sender: {
                        connect: {
                            id: user1id
                        }
                    },
                    dmroom: {
                        connect: {
                            id: +roomId
                        }
                    }
                },
                include: {
                    sender: true,
                    dmroom: true
                }
            });
            dm = await this.prisma.dMRooms.findFirst({
                where: {
                    id: +roomId
                },
                include: {
                    users: true,
                    messages: true
                }
            });

            // console.log(
            //     'check message creation',
            //     newMessage,
            //     'id of the room',
            //     newMessage.dmId
            // );
            return dm;
        } catch (errr) {
            return;
        }
    }

    async getAllDms(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                dm: true
            }
        });
        if (!user) throw new NotFoundException('this user does not exist');

        // console.log('dms are', user.dm);
        return user.dm;
    }

    async isUserBlocked(
        userId: string,
        blockedUserId: string
    ): Promise<boolean> {
        try {
            const block = await this.prisma.block.findFirst({
                where: {
                    OR: [
                        { userId: userId, blockedUserId: blockedUserId },
                        { userId: blockedUserId, blockedUserId: userId }
                    ]
                }
            });
            // console.log('block: ', !!block);
            return !!block;
        } catch (errrrr) {
            return;
        }
    }

    async createNotification(userId: string, senderNickName: string, senderAvatar: string, recieverNickName: string, recieverAvatar: string, action: string, type) {
		const notification = await this.prisma.notification.create({
		  data: {
            userId,
			senderNickName,
			senderAvatar,
			recieverNickName,
			recieverAvatar,
			action,
            type,
		  }
		});

		// console.log('-------: ', notification);
		return notification;
	}

}
