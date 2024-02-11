import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { Server, Socket } from 'socket.io';
import { notificationService } from "../services/notification.service";
import { SocketIOMIDDELWARE } from "src/auth/middlware/ws.middlware";


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
        private readonly notificationService: notificationService,
    ) {}

    @WebSocketServer() server: Server;

    afterInit(client : Socket) {
        client.use(SocketIOMIDDELWARE() as any);
    }

    async handleConnection(client: any, ...args: any[]) {
        //update stat in database from false to true
        await this.prisma.user.update({
            where : { id : client.data.payload.id },
            data : { status : true},
        })
        //store this socket in map of sockets
        this.notificationService.addSocket(client.data.payload.id, client);
    }

    async handleDisconnect(client: any) {
        
        const user = await this.prisma.user.findFirst({
			where : {
				id : client.data.playload.id,
			}
		})

		if (!user)
			return ;

        //update stat in database from true to false
        await this.prisma.user.update({
            where : { id : client.data.playload.id },
            data : { status : false},
        })
        //remove this socket in map of sockets
        this.notificationService.removeSocket(client.data.playload.userId, client);
    }

    @SubscribeMessage('notification')
	handleNotification(clientId, data)
	{
		this.notificationService.emitToClient(clientId, 'notification', data);
	}

}