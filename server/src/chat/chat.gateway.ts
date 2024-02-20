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
import { Logger, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './DTOS/join-room.dto';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { RoomService } from './rooms/room.service';
import { WebSocketService } from './chat.gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { CreateMessageDto } from './DTOS/create-message-dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto';
import { MuteUserDto, UnmuteUserDto } from './DTOS/mute-user-dto';
import { CreateDmDto } from './DTOS/create-dm.dto';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { SendMessageDto } from './DTOS/send-message-dto';
import { send } from 'process';
import { BlockService } from 'src/users/services/blocked.service';
import { EmitMessageDto } from './DTOS/emit-message-dto';
import { KickMemberDto } from './DTOS/kick-member.dto';
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: '/chat'
})
export class ChatGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(
        private readonly prisma: PrismaOrmService,
        private readonly roomService: RoomService,
        private readonly wsService: WebSocketService,
        private readonly blockService: BlockService
    ) {}

    private usersSockets: Map<string, string> = new Map<string, string>();

    @WebSocketServer() server: Server;

    private readonly logger = new Logger('ChatGateway');

    afterInit() {
        this.logger.log('Initialized');
    }

    async handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.server.sockets;

        this.logger.log(`This client ${client.id} connected`);
        // const userCheck = await this.wsService.getUserFromAccessToken(
        //     client.handshake.auth.token
        // console.log(client.handshake);
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) this.handleDisconnect(client);
        else {
            // await this.prisma.user.update({
            //     where: { id: userCheck.userData.sub },
            //     data: { status: true }
            // });
            console.log(
                `This user ${userCheck.userData.email} is now connected`
            );
            this.usersSockets.set(userCheck.userData.email, client.id);
            console.log(this.usersSockets);
            this.wsService.joinUserSocketToItsRooms(
                client.id,
                userCheck.userData.sub,
                this.server
            );
            // this.logger.debug(`Number of clients connected: ${sockets.size}`);
        }
    }

    @SubscribeMessage('message')
    async handleMessage(client: any, payload: SendMessageDto) {
        // this.logger.log(`Message received from client with id: ${client.id}`);
        // this.logger.debug(`Payload: ${payload}`);
        // this.server.emit('onMessage', payload);
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        // console.log(
        //     `this user ${userCheck.userData.email} is sending a message to this room ${payload.roomTitle}`
        // );
        // console.log(`the message is : ${payload.message}`);
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
            this.server.to(room.roomTitle).emit('message', message);
        } catch (err) {
            return err;
        }
        return { payload };
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
        // console.log('here');
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        else {
            const userSocket = await this.usersSockets.get(
                userCheck.userData.email
            );
            await this.server.in(userSocket).socketsJoin(joinRoomDto.roomTitle);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userCheck.userData.sub
                }
            });
            console.log(user, 'joinded');
            await this.server.to(joinRoomDto.roomTitle).emit('joinRoom', user);
            // return userRoom.joinedRoom;
        }
        // this.logger.log(
        //     `the user  ${userCheck.userData.email} is trying to join the room "${joinRoomDto.roomId}"`
        // );
        // const userRoom = await this.roomService.joinRoom(
        //     joinRoomDto,
        //     userCheck.userData.sub
        // );
        // if (userRoom.state === false) {
        //     console.log(userRoom.message);
        //     throw new WsException(userRoom.message);
    }

    // @SubscribeMessage('globalChat')
    // async globalChat(client: Socket, payload: CreateMessageDto) {
    //     const userCheck = await this.wsService.getUserFromAccessToken(
    //         client.handshake.auth.token
    //     );
    //     if (userCheck.state == true) {
    //         await this.wsService.createGlobalRoom();
    //         console.log(payload);
    //         await this.wsService.createMessage(payload, userCheck.userData.sub);
    //         this.server
    //             .to(payload.roomTitle)
    //             .emit('globalMessage', payload.message);
    //     }
    // }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, leaveRoomDto: LeaveRoomDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        // console.log(
        //     `The user ${userCheck.userData.email} is leaving the room ${leaveRoomDto.roomTitle}`
        // );
        await this.roomService.leaveRoom(leaveRoomDto, userCheck.userData.sub);
        const userSocket = await this.usersSockets.get(
            userCheck.userData.email
        );
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
            nickname: user.nickName
        };

        await this.server.to(leaveRoomDto.roomTitle).emit('leaveRoom', message);
    }

    @SubscribeMessage('muteUser')
    async muteUser(client: Socket, muteUserDto: MuteUserDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        console.log('mute function');
        await this.wsService.muteUser(muteUserDto, userCheck.userData.sub);
    }

    @SubscribeMessage('unmuteUser')
    async unmuteUser(client: Socket, unmuteUserDto: UnmuteUserDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        await this.wsService.unmuteUser(unmuteUserDto, userCheck.userData.sub);
    }

    @SubscribeMessage('dm')
    async sendDM(client: any, sendMessage: SendMessageDto) {
        console.log(
            'messages b888888888888888888888888888888888 == ',
            sendMessage
        );

        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            console.log('messages');
            // function to check if they have already talked
            const dmroom = await this.wsService.sendDM(
                userCheck.userData.sub,
                sendMessage.id,
                sendMessage.message
            );

            if (
                await this.blockService.isUserBlocked(
                    userCheck.userData.sub,
                    dmroom.users[0].id
                )
            )
                this.server.to(client.id).emit('forbidden');
            else {
                console.log('event dmMessage');
                const message: EmitMessageDto = {
                    id: dmroom.messages[dmroom.messages.length - 1].dmId,
                    message:
                        dmroom.messages[dmroom.messages.length - 1].message,
                    createdAt:
                        dmroom.messages[dmroom.messages.length - 1].createdAt,
                    senderId:
                        dmroom.messages[dmroom.messages.length - 1].senderId
                };
                console.log(dmroom.roomTitle);
                await this.server.in(client.id).socketsJoin(dmroom.roomTitle);
                this.server.to(dmroom.roomTitle).emit('dm', message);
            }
        }
    }

    // @SubscribeMessage('dm')
    // async sendDM(client: any, sendMessage: SendMessageDto) {
    //     console.log(
    //         'messages b888888888888888888888888888888888 == ',
    //         sendMessage
    //     );

    //     const userCheck = await this.wsService.getUserFromAccessToken(
    //         client.handshake.auth.token
    //     );
    //     if (userCheck.state === false) await this.handleDisconnect(client);
    //     else {
    //         console.log('messages');
    //         // function to check if they have already talked
    //         const dmroom = await this.wsService.sendDM(
    //             userCheck.userData.sub,
    //             sendMessage.receiverId,
    //             sendMessage.message
    //         );
    //         this.server.to(dmroom.roomTitle).emit('dmMessage', dmroom.messages);
    //         // console.log("messages backend77777777777777777 == ", dmroom.messages);
    //     }
    // }

    @SubscribeMessage('checkDm')
    async checkDM(client: any, createDmDto: CreateDmDto) {
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            const dm = await this.wsService.CheckForExistingDmRoom(
                userCheck.userData.sub,
                createDmDto.friendId
            );
            // console.log('room that should be sent', dm);
            this.server.emit('checkDM', dm);
        }
    }

    @SubscribeMessage('kickMember')
    async kickUser(client: any, kickmemberDto: KickMemberDto) {
        console.log(
            'kickMembber-------------------------------------',
            kickmemberDto
        );
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
                id: userToKick.id
            };
            this.server.to(kickmemberDto.roomTitle).emit('kickMember', message);
            const userSocket = await this.usersSockets.get(userToKick.email);
            if (userSocket)
                await this.server
                    .in(userSocket)
                    .socketsLeave(kickmemberDto.roomTitle);
        }
    }

    async handleDisconnect(client: any) {
        console.log('kn disconnect');
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        console.log('user: ', userCheck);
        const user = await this.prisma.user.findFirst({
            where: {
                id: userCheck.userData.sub
            }
        });

        if (!user) return;

        //update stat in database from true to false
        await this.prisma.user.update({
            where: { id: userCheck.userData.sub },
            data: { status: false }
        });
        client.disconnect(true);
        // this.logger.log(`This client ${client.id} disconnected`);
    }
}
