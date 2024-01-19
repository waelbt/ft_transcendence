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
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { CreateMessageDto } from './DTOS/create-message-dto';
import { LeaveRoomDto } from './DTOS/leave-room.dto';
import { MuteUserDto, UnmuteUserDto } from './DTOS/mute-user-dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat'
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(private readonly prisma: PrismaOrmService,
    private readonly roomService:  RoomService,
    private readonly wsService: WebSocketService,
    ){}
    
    private usersSockets: Map<string,string> = new Map<string,string>;

  @WebSocketServer() server: Server;

  private readonly logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    // const { sockets } = this.server.sockets;

    this.logger.log(`This client ${client.id} connected`)
    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // if (userCheck.state === false)
    //   this.handleDisconnect(client);
    // else {
      // console.log(`This user ${userCheck.userData.email} is now connected`);
      // this.usersSockets.set(userCheck.userData.email, client.id);
      // console.log(this.usersSockets);
      // this.wsService.joinUserSocketToItsRooms(client.id, userCheck.userData.sub, this.server);
      // this.logger.debug(`Number of clients connected: ${sockets.size}`);
    // }
    const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.authorization);
    if (userCheck.state === true)
    {
      await this.wsService.joinUserToGlobalChat(userCheck.userData.sub);
      await this.wsService.joinUserSocketToGlobalChat(client.id, this.server);
    }
  }

  
  @SubscribeMessage('message')
  async handleMessage(client: any, payload: CreateMessageDto) {
    // this.logger.log(`Message received from client with id: ${client.id}`);
    // this.logger.debug(`Payload: ${payload}`);
    // this.server.emit('onMessage', payload);
    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // console.log(`this user ${payload.id} is sending a message to this room ${payload.roomTitle}`);
    console.log(`the message is : ${payload.message}`);
    try {
      
      // await this.wsService.createMessage(payload, payload.id);
      this.server.to(payload.roomTitle).emit('message', payload.message);
    } catch (err) {
      return (err);
    }
    return {payload};
  }
  
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
    
    // console.log("here");
    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // if (userCheck.state === false)
    //   throw new WsException(userCheck.message);
    this.logger.log(`the user  ${joinRoomDto.id} is trying to join the room "${joinRoomDto.roomId}"`);
    const userRoom = await this.roomService.joinRoom(joinRoomDto, joinRoomDto.id);
    if (userRoom.state === false)
    {
      console.log(userRoom.message);
      throw new WsException(userRoom.message);
    }
    else
    {
      const userEmail = await this.getUserEmail(joinRoomDto.id);
      const userSocket = await this.usersSockets.get(userEmail);
      await this.server.in(userSocket).socketsJoin(joinRoomDto.roomTitle);
      return (userRoom.joinedRoom);
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, leaveRoomDto: LeaveRoomDto) {

    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // if (userCheck.state === false)
    //   throw new WsException(userCheck.message);
    console.log(`The user ${leaveRoomDto.id} is leaving the room ${leaveRoomDto.roomTitle}`);
    await this.roomService.leaveRoom(leaveRoomDto, leaveRoomDto.id);
    const userSocket = await this.usersSockets.get(leaveRoomDto.id);
    await this.server.in(userSocket).socketsLeave(leaveRoomDto.roomTitle);
  }

  @SubscribeMessage('muteUser')
  async muteUser(client: Socket, muteUserDto: MuteUserDto) {

    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // if (userCheck.state === false)
    //   throw new WsException(userCheck.message);
    console.log('mute function');
    await this.wsService.muteUser(muteUserDto, muteUserDto.id);
  }

  @SubscribeMessage('unmuteUser')
  async unmuteUser(client: Socket, unmuteUserDto: UnmuteUserDto) {
    // const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.headers.cookie);
    // if (userCheck.state === false)
    //   throw new WsException(userCheck.message);
    await this.wsService.unmuteUser(unmuteUserDto, unmuteUserDto.id);
  }

  @SubscribeMessage('globalChat')
  async globalChat(client: Socket, payload: CreateMessageDto) {
    console.log("wael   ",client.handshake.auth.accessToken);
    const userCheck = await this.wsService.getUserFromAccessToken(client.handshake.auth.accessToken);
    if (userCheck.state == true)
    {
      await this.wsService.createGlobalRoom();
      console.log(payload)
      await this.wsService.createMessage(payload, userCheck.userData.sub);
      this.server.to(payload.roomTitle).emit('globalMessage', payload.message);
    }
  }

  async handleDisconnect(client: any) {
    client.disconnect(true);
    // this.logger.log(`This client ${client.id} disconnected`);
  }

  async getUserEmail(id: string) : Promise<string> {

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select : {
        email: true,
      },
    });

    return ((await user).email)
  }

}
