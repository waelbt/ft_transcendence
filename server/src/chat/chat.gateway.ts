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
import { WebSocketService } from './chat.gateway.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { CreateMessageDto } from './DTOS/create-message-dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(private readonly prisma: PrismaOrmService,
    private readonly roomService:  RoomService,
    private readonly jwt: JwtService,
    private readonly wsService: WebSocketService,
    ){}
    
    private usersSockets: Map<string,string> = new Map<string,string>;

  @WebSocketServer() server: Server;

  private readonly logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`This client ${client.id} connected`)
    const userCheck = await this.getUserFromAccessToken(client.handshake.headers.cookie);
    if (userCheck.state === false)
      this.handleDisconnect(client);
    else {
      console.log(`This user ${userCheck.userData.email} is now connected`);
      this.usersSockets.set(userCheck.userData.email, client.id);
      console.log(this.usersSockets);
      this.wsService.joinUserSocketToItsRooms(client.id, userCheck.userData.sub, this.server);
      this.logger.debug(`Number of clients connected: ${sockets.size}`);
    }
  }

  
  @SubscribeMessage('message')
  async handleMessage(client: any, payload: CreateMessageDto) {
    // this.logger.log(`Message received from client with id: ${client.id}`);
    // this.logger.debug(`Payload: ${payload}`);
    // this.server.emit('onMessage', payload);
    const userCheck = await this.getUserFromAccessToken(client.handshake.headers.cookie);
    console.log(`this user ${userCheck.userData.email} is sending a message to this room ${payload.roomTitle}`);
    console.log(`the message is : ${payload.message}`);
    this.server.to(payload.roomTitle).emit('message', payload.message);
    this.roomService.createMessage(payload, userCheck.userData.sub);
    return {payload};
  }
  
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
    
    console.log("here");
    const userCheck = await this.getUserFromAccessToken(client.handshake.headers.cookie);
    if (userCheck.state === false)
      throw new WsException(userCheck.message);
    this.logger.log(`the user  ${userCheck.userData.email} is trying to join the room "${joinRoomDto.roomId}"`);
    const userRoom = await this.roomService.joinRoom(joinRoomDto, userCheck.userData.sub);
    if (userRoom.state === false)
    {
      console.log(userRoom.message);
      throw new WsException(userRoom.message);
    }
    else
    {
      const userSocket = await this.usersSockets.get(userCheck.userData.email);
      await this.server.in(userSocket).socketsJoin(joinRoomDto.roomTitle);
      return (userRoom.joinedRoom);
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, leaveRoomDto: LeaveRoomDto) {

    const userCheck = await this.getUserFromAccessToken(client.handshake.headers.cookie);
    if (userCheck.state === false)
      throw new WsException(userCheck.message);
    console.log(`The user ${userCheck.userData.email} is leaving the room ${leaveRoomDto.roomTitle}`);
    await this.roomService.leaveRoom(leaveRoomDto, userCheck.userData.sub);
    const userSocket = await this.usersSockets.get(userCheck.userData.email);
    await this.server.in(userSocket).socketsLeave(leaveRoomDto.roomTitle);
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
    client.disconnect(true);
    // this.logger.log(`This client ${client.id} disconnected`);
  }

}
