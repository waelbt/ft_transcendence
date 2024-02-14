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
        private readonly wsService: WebSocketService
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
    async handleMessage(client: any, payload: CreateMessageDto) {
        // this.logger.log(`Message received from client with id: ${client.id}`);
        // this.logger.debug(`Payload: ${payload}`);
        // this.server.emit('onMessage', payload);
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        console.log(
            `this user ${userCheck.userData.email} is sending a message to this room ${payload.roomTitle}`
        );
        console.log(`the message is : ${payload.message}`);
        try {
            await this.wsService.createMessage(payload, userCheck.userData.sub);
            this.server.to(payload.roomTitle).emit('message', payload.message);
        } catch (err) {
            return err;
        }
        return { payload };
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
        console.log('here');
        const userCheck = await this.wsService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) throw new WsException(userCheck.message);
        this.logger.log(
            `the user  ${userCheck.userData.email} is trying to join the room "${joinRoomDto.roomId}"`
        );
        const userRoom = await this.roomService.joinRoom(
            joinRoomDto,
            userCheck.userData.sub
        );
        if (userRoom.state === false) {
            console.log(userRoom.message);
            throw new WsException(userRoom.message);
        } else {
            const userSocket = await this.usersSockets.get(
                userCheck.userData.email
            );
            await this.server.in(userSocket).socketsJoin(joinRoomDto.roomTitle);
            return userRoom.joinedRoom;
        }
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
        console.log(
            `The user ${userCheck.userData.email} is leaving the room ${leaveRoomDto.roomTitle}`
        );
        await this.roomService.leaveRoom(leaveRoomDto, userCheck.userData.sub);
        const userSocket = await this.usersSockets.get(
            userCheck.userData.email
        );
        await this.server.in(userSocket).socketsLeave(leaveRoomDto.roomTitle);
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
                sendMessage.receiverId,
                sendMessage.message
            );
            this.server.to(dmroom.roomTitle).emit('dmMessage', dmroom.messages);
            // console.log("messages backend77777777777777777 == ", dmroom.messages);
        }
    }

    @SubscribeMessage('checkDm')
    async checkDM(client: any, createDmDto: CreateDmDto) {
        console.log('hello world');
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

    async handleDisconnect(client: any) {
        client.disconnect(true);
        // this.logger.log(`This client ${client.id} disconnected`);
    }
}
