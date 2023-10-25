import { 
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer() server: Server;

  private readonly logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`This client ${client.id} connected`)
    this.logger.debug(`Number of clients connected: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`This client ${client.id} disconnected`)
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.logger.log(`Message received from client with id: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);
    this.server.emit('onMessage', payload);
    return {payload};
  }

}
