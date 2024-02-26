import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer,
    MessageBody,
    WsException
} from '@nestjs/websockets';
import {
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    Req,
    UseGuards,
    forwardRef
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './DTOS/join-room.dto';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { RoomService } from './rooms/room.service';
import { WebSocketService } from './chat.gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { CreateMessageDto } from './DTOS/create-message-dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto';
import {
    MuteUserDto,
    UnmuteUserDetails,
    UnmuteUserDto
} from './DTOS/mute-user-dto';
import { CreateDmDto } from './DTOS/create-dm.dto';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { SendMessageDto } from './DTOS/send-message-dto';
import { send } from 'process';
import { BlockService } from 'src/users/services/blocked.service';
import { EmitMessageDto } from './DTOS/emit-message-dto';
import { KickMemberDto } from './DTOS/kick-member.dto';
import { SetAdminDto, UnSetAdminDto } from './DTOS/set-admin-room.dto';
import { BanMemberDto } from './DTOS/ban-member-dto';
import { error } from 'console';
import { GetRoomsDto } from './DTOS/get-rooms.dto';
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: '/chat'
})
@Injectable()
export class ChatGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(
        private readonly prisma: PrismaOrmService,
        private readonly wsService: WebSocketService,
        @Inject(forwardRef(() => RoomService))
        private readonly roomService: RoomService
    ) {}

    private usersSockets: Map<string, string> = new Map<string, string>();

    @WebSocketServer() server: Server;

    private readonly logger = new Logger('ChatGateway');

    afterInit() {
        this.logger.log('Initialized');
    }

    async handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.server.sockets;
        console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
        // console.log(this.usersSockets);
        // this.logger.log(`This client ${client.id} connected`);
        // const sockets = this.server.sockets;
        // console.log('-----------',this.server.sockets.sockets);
        // const userCheck = await this.wsService.getUserFromAccessToken(
        //     client.handshake.auth.token
        // console.log(client.handshake);
<<<<<<< HEAD

=======
>>>>>>> 7c615b5ddd22e9c2211967bcef0d3a4f7d445937
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) this.handleDisconnect(client);
        else {
            console.log(
                `This user ${userCheck.userData.email} is now connected (CHAT)`
            );
            this.usersSockets.set(userCheck.userData.email, client.id);
            console.log('CHAT', this.usersSockets);
            this.wsService.joinUserSocketToItsRooms(
                client.id,
                userCheck.userData.sub,
                this.server
            );
        }
    }

    @SubscribeMessage('message')
    async handleMessage(client: any, payload: SendMessageDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        try {
            const { room, newMessage } = await this.wsService.createMessage(
                payload,
                userCheck.userData.sub
            );
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userCheck.userData.sub
                }
            });

            const message: EmitMessageDto = {
                id: room.messages[room.messages.length - 1].roomId,
                avatar: user.avatar,
                nickName: user.nickName,
                message: room.messages[room.messages.length - 1].message,
                createdAt: room.messages[room.messages.length - 1].createdAt,
                senderId: room.messages[room.messages.length - 1].senderId
            };
            const socketssss = await this.server
                .in(room.roomTitle)
                .fetchSockets();
            socketssss.forEach(async (oneSocket) => {
                if (oneSocket.id != client.id) {
                    const userOneData =
                        await this.wsService.getUserFromAccessToken(
                            oneSocket.handshake.auth.token
                        );

                    const userTwoData =
                        await this.wsService.getUserFromAccessToken(
                            client.handshake.auth.token
                        );
                    if (
                        !(await this.wsService.isUserBlocked(
                            userOneData.userData.sub,
                            userTwoData.userData.sub
                        ))
                    ) {
                        this.server.in(oneSocket.id).emit('message', message);
                    }
                }
            });
            this.server.in(client.id).emit('message', message);
        } catch (err) {
            return err;
        }
        return { payload };
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        else {
            this.server.in(client.id).socketsJoin(joinRoomDto.roomTitle);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userCheck.userData.sub
                }
            });
            this.server.to(joinRoomDto.roomTitle).emit('joinRoom', user);
        }
    }

    async joinPrvRoom({ roomId, roomTitle, userId }) {
        this.server.emit('prvRoom', { roomId, roomTitle, userId });
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, leaveRoomDto: LeaveRoomDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        await this.roomService.leaveRoom(leaveRoomDto, userCheck.userData.sub);
        const userSocket = this.usersSockets.get(userCheck.userData.email);
        await this.server.in(userSocket).socketsLeave(leaveRoomDto.roomTitle);

        const user = await this.prisma.user.findUnique({
            where: {
                id: userCheck.userData.sub
            },
            select: {
                id: true,
                nickName: true
            }
        });

        const message = {
            id: user.id,
            nickname: user.nickName,
            roomId: leaveRoomDto.id
        };

        this.server.to(leaveRoomDto.roomTitle).emit('leaveRoom', message);
    }

    @SubscribeMessage('Mute')
    async muteUser(client: Socket, muteUserDto: MuteUserDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        console.log('mute function');
        await this.wsService.muteUser(muteUserDto, userCheck.userData.sub);
        const userMuted = await this.prisma.user.findUnique({
            where: {
                id: muteUserDto.userId
            },
            select: {
                nickName: true,
                id: true
            }
        });
        const message = {
            nickname: userMuted.nickName,
            id: userMuted.id,
            roomId: muteUserDto.roomId,
        };
        this.server.to(muteUserDto.roomTitle).emit('muteUser', message);
    }

    @SubscribeMessage('Unmute')
    async unmuteUser(unmuteUserDto: UnmuteUserDetails) {
        // const userCheck = await this.wsService.getUserFromAccessToken(
        //     client.handshake.auth.token
        // );
        // if (userCheck.state === false) throw new WsException(userCheck.message);
        // await this.wsService.unmuteUser(unmuteUserDto, userCheck.userData.sub);
        const room = await this.prisma.room.findUnique({
            where: {
                id: unmuteUserDto.roomID
            },
            select: {
                roomTitle: true
            }
        });

        const userunMuted = await this.prisma.user.findUnique({
            where: {
                id: unmuteUserDto.userID
            },
            select: {
                nickName: true,
                id: true
            }
        });
        const message = {
            nickname: userunMuted.id,
            id: userunMuted.id,
            roomId: unmuteUserDto.roomID,
        };
        this.server.to(room.roomTitle).emit('unmuteUser', message);
    }

    @SubscribeMessage('dm')
    async sendDM(client: any, sendMessage: SendMessageDto) {
        console.log('heeeeeeloooooooooooooooooooooooooooooooooo');
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            const dmroom = await this.wsService.sendDM(
                userCheck.userData.sub,
                sendMessage.id,
                sendMessage.message
            );
            if (
                await this.wsService.isUserBlocked(
                    userCheck.userData.sub,
                    dmroom.users[0].id
                )
            )
                return;
            else {
                const message: EmitMessageDto = {
                    id: dmroom.messages[dmroom.messages.length - 1].dmId,
                    message:
                        dmroom.messages[dmroom.messages.length - 1].message,
                    createdAt:
                        dmroom.messages[dmroom.messages.length - 1].createdAt,
                    senderId:
                        dmroom.messages[dmroom.messages.length - 1].senderId
                };
                const users = dmroom.users;

                // this.server.in(client.id).socketsJoin(dmroom.roomTitle);
                this.server.to(dmroom.roomTitle).emit('dm', message);
            }
        }
    }

    @SubscribeMessage('joinDm')
    async joinDm(userId: string, roomTitle: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                email: true
            }
        });

        const userSocket = this.usersSockets.get(user.email);
        if (userSocket) this.server.in(userSocket).socketsJoin(roomTitle);
    }

    @SubscribeMessage('checkDm')
    async checkDM(client: any, createDmDto: CreateDmDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) {
            await this.handleDisconnect(client);
        } else {
            const dm = await this.wsService.CheckForExistingDmRoom(
                userCheck.userData.sub,
                createDmDto.friendId
            );

            const user = await this.prisma.user.findUnique({
                where: {
                    id: createDmDto.friendId
                },
                select: {
                    email: true,
                    nickName: true
                }
            });

            // if (userSocket)
            //     this.server.in(userSocket).socketsJoin(dm.roomTitle);
            dm.users = dm.users.filter(
                (user) => user.id != createDmDto.friendId
            );

            let lastMessage = '';
            let createdAt = new Date();
            const singleRoom: GetRoomsDto = {
                id: dm.id,
                avatar: dm.users[0].avatar,
                roomTitle: dm.users[0].nickName,
                lastMessage: lastMessage,
                nickName: dm.users[0].nickName,
                lastMessageTime: createdAt,
                isRoom: false
            };
            // this.server.in(client.id).socketsJoin(dm.roomTitle);
            const userSocket = this.usersSockets.get(user.email);
            if (userSocket)
                this.server.in(userSocket).emit('checkDm', singleRoom);
            // this.server.emit('checkDm', singleRoom);
        }
    }

    @SubscribeMessage('Kick')
    async kickUser(client: any, kickmemberDto: KickMemberDto) {

        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            await this.roomService.kickMember(
                kickmemberDto,
                userCheck.userData.sub
            );
            const userToKick = await this.prisma.user.findUnique({
                where: {
                    id: kickmemberDto.userId
                },
                select: {
                    email: true,
                    nickName: true,
                    id: true
                }
            });


            const message = {
                nickname: userToKick.nickName,
                id: userToKick.id,
                roomId: kickmemberDto.roomId,
            };
            this.server.to(kickmemberDto.roomTitle).emit('kickMember', message);
            const userSocket = await this.usersSockets.get(userToKick.email);
            if (userSocket)
                await this.server
                    .in(userSocket)
                    .socketsLeave(kickmemberDto.roomTitle);
        }
    }

    @SubscribeMessage('Set As Admin')
    async setAdmin(client: any, setAdminDto: SetAdminDto) {
        console.log(setAdminDto);
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            this.roomService.setUserToAdminRoom(
                setAdminDto,
                userCheck.userData.sub
            );
            const newAdmin = await this.prisma.user.findUnique({
                where: {
                    id: setAdminDto.userId
                },
                select: {
                    id: true,
                    nickName: true
                }
            });
            const message = {
                id: newAdmin.id,
                nickname: newAdmin.nickName,
                roomId: setAdminDto.roomId,
            };
            console.log(message);
            this.server.to(setAdminDto.roomTitle).emit('setAdmin', message);
        }
    }

    @SubscribeMessage('Ban')
    async banMember(client: any, banMemberDto: BanMemberDto) {
        // console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            const memberBanned = await this.prisma.user.findUnique({
                where: {
                    id: banMemberDto.userId
                },
                select: {
                    nickName: true,
                    id: true,
                    email: true
                }
            });

            await this.roomService.banMember(
                banMemberDto,
                userCheck.userData.sub
            );
            const userSocket = await this.usersSockets.get(memberBanned.email);
            const message = {
                id: memberBanned.id,
                nickname: memberBanned.nickName,
                roomId: banMemberDto.roomId,
            };
            this.server.to(banMemberDto.roomTitle).emit('banMember', message);
            if (userSocket)
                await this.server
                    .in(userSocket)
                    .socketsLeave(banMemberDto.roomTitle);
        }
    }

    @SubscribeMessage('Unset Admin')
    async unsetAdmin(client: any, unsetAdminDto: UnSetAdminDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            const admineRemoved = await this.prisma.user.findUnique({
                where: {
                    id: unsetAdminDto.userId
                },
                select: {
                    nickName: true,
                    id: true
                }
            });
            const message = {
                id: admineRemoved.id,
                nickname: admineRemoved.nickName,
                roomId: unsetAdminDto.roomId,
            };

            this.roomService.removeFromAdmins(
                unsetAdminDto,
                userCheck.userData.sub
            );
            this.server.to(unsetAdminDto.roomTitle).emit('unsetAdmin', message);
        }
    }

    @SubscribeMessage('notification')
    async notificationEvent(receiver, sender, senderId, action, type) {
        const userSocket = this.usersSockets.get(receiver.email);
        if (userSocket) {
            const notification = await this.prisma.notification.create({
                data: {
                    userId: senderId,
                    senderNickName: sender.nickname,
                    senderAvatar: sender.avatar,
                    recieverNickName: receiver.nickname,
                    recieverAvatar: receiver.avatar,
                    action,
                    type
                }
            });
            const notificationPayload = {
                id: notification.id,
                userId: senderId,
                nickName: sender.nickname,
                avatar: sender.avatar,
                action: action,
                type
            };
            console.log('lokii:       ', notificationPayload);
            this.server
                .to(userSocket)
                .emit('notification', notificationPayload);
        } else {
            const notification = await this.prisma.notification.create({
                data: {
                    userId: senderId,
                    senderNickName: sender.nickname,
                    senderAvatar: sender.avatar,
                    recieverNickName: receiver.nickname,
                    recieverAvatar: receiver.avatar,
                    action,
                    type
                }
            });
        }
    }

    async handleDisconnect(client: any) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );

        try {
            var user = await this.prisma.user.findFirst({
                where: {
                    id: userCheck.userData.sub
                }
            });
        } catch (errrr) {
            return;
        }

        if (!user) return;

        await this.prisma.user.update({
            where: { id: userCheck.userData.sub },
            data: { status: false }
        });
        client.disconnect(true);
        // this.logger.log(`This client ${client.id} disconnected`);
    }
}
