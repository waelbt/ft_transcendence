import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { Server, Socket } from 'socket.io';
import { notificationService } from '../services/notification.service';



@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: '/notification'
})
export class notificationGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(
        private readonly prisma: PrismaOrmService,
        private readonly notificationService: notificationService
    ) {}

    private usersSockets: Map<string, string> = new Map<string, string>();

    @WebSocketServer() server: Server;

    afterInit(client: Socket) {
        // console.log('in init');
        // client.use(SocketIOMIDDELWARE() as any);
    }

    async handleConnection(client: any, ...args: any[]) {

        const userCheck = await this.notificationService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        if (userCheck.state === false) await this.handleDisconnect(client);
        else {
            //update stat in database from false to true
            if (userCheck.userData.sub) {
                var isUser = await this.prisma.user.findFirst({
                    where: {
                        id: userCheck.userData.sub
                    }
                });
                if (!isUser) {
                    console.log('hello')
                    await this.handleDisconnect(client);
                } 
            }
else {
                this.usersSockets.set(userCheck.userData.email, client.id);
                // console.log('---- ok socket: ', this.usersSockets);
                await this.prisma.user.update({
                    where: { id: userCheck.userData.sub },
                    data: { status: true }
                });
                // console.log('socket: ', this.usersSockets);
                this.broadcastUserStatus(userCheck.userData.sub, 'online');
            }
        }
        //store this socket in map of sockets
        // this.notificationService.addSocket(client.data.playload.sub, client);
    }

    @SubscribeMessage('notification')
    async notificationEvent(receiver, sender, senderId, action, type) {
        const userSocket = await this.usersSockets.get(receiver.email);
        if (userSocket) {
            // console.log('notification: ', notificationPayload);
            // console.log('sender: ', sender);
            // console.log('reciever: ', receiver);
            // console.log('action: ', action);
            //hna ghtstory dkchi f database
            const notification = await this.notificationService.createNotification(
                senderId,
                sender.nickName,
                sender.avatar,
                receiver.nickName,
                receiver.avatar,
                action,
                type,
            );
            const notificationPayload = {
                id: notification.id,
                userId: senderId,
                nickName: sender.nickName,
                avatar: sender.avatar,
                action: action,
                type
            };
            await this.server
                .to(userSocket)
                .emit('notification', notificationPayload);
        } else {
            // console.log('sender: ', sender);
            // console.log('reciever: ', receiver);
            // console.log('action: ', action);
            //hna ghtstory dkchi f database
            await this.notificationService.createNotification(
                senderId,
                sender.nickName,
                sender.avatar,
                receiver.nickName,
                receiver.avatar,
                action,
                type
            );
        }
    }

    private broadcastUserStatus(userId: string, status: 'online' | 'offline') {
        const message = {
            userId,
            status
        };
        this.server.emit('userStatusChange', message);
    }

    async handleDisconnect(client: any) {
        console.log('in handle disconnection (NOTIFICATION)');

        const userCheck = await this.notificationService.getUserFromAccessToken(
            client.handshake.headers.token
        );
        if (userCheck.state === false) {
            client.disconnect(true);
            return;
        }
        //update stat in database from true to false
        const user = await this.prisma.user.findFirst({
            where: {
                id: userCheck.userData.sub
            }
        });

        if (!user) {
            client.disconnect(true);
            return;
        }

        //update stat in database from true to false
        await this.prisma.user.update({
            where: { id: userCheck.userData.sub },
            data: {
                status: false,
                inGame: false
            }
        });
        this.broadcastUserStatus(userCheck.userData.sub, 'offline');
        //remove this socket in map of sockets
        // this.notificationService.removeSocket(client.data.playload.sub, client);
    }

    // @SubscribeMessage('notification')
    // handleNotification(clientId, data)
    // {
    // 	this.notificationService.emitToClient(clientId, 'notification', data);
    // }

    //add
}
