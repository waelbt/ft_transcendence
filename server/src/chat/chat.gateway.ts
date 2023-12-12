import { 
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
  WsException,
} from '@nestjs/websockets';
import { Logger, NotFoundException, Req, UseGuards } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { JoinRoomDto } from './DTOS/join-room.dto';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { RoomService } from './rooms/room.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(private readonly prisma: PrismaOrmService,
    private readonly roomService:  RoomService,
    private readonly jwt: JwtService ){}

  @WebSocketServer() server: Server;

  private readonly logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`This client ${client.id} connected`)
    this.logger.debug(`Number of clients connected: ${sockets.size}`);
  }

  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.logger.log(`Message received from client with id: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);
    this.server.emit('onMessage', payload);
    return {payload};
  }
  
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
    
    console.log('zemla d sockets')
    const userCheck = await this.getUserFromAccessToken(client.handshake.headers.cookie);
    if (userCheck.state === false)
      throw new WsException(userCheck.message);
      console.log('zemla d sockets 2')
    // console.log('in join room');
    // console.log(user);
    
    this.logger.log(`the user  ${userCheck.userData.email} is trying to join the room "${joinRoomDto.roomId}"`);
    const userRoom = await this.roomService.joinRoom(joinRoomDto, userCheck.userData.sub);
    console.log()
    if (userRoom.state === false)
    {
      console.log(userRoom.message);
      throw new WsException(userRoom.message);
    }
    else
      return (userRoom.joinedRoom);
  }

  async getUserFromAccessToken(cookie: string) {

    const accessToken =  await this.retrieveAccessToken(cookie);
    try {

      var jwtCheck = await this.jwt.verify(accessToken, {secret: process.env.JWT_secret});
    }catch(err)
    {
        return ({message: 'Not Authorized', state: false});
    }
    return ({userData: jwtCheck, state: true});
  }

  async retrieveAccessToken(cookie: string) : Promise<string> {

    const index = cookie.indexOf(';');
    const accessToken = cookie.slice(12, index);
    return (accessToken);
  }

  async handleDisconnect(client: any) {
    this.logger.log(`This client ${client.id} disconnected`);
  }

}
