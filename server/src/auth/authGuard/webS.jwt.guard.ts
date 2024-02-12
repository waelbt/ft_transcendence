import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client : Socket = context.switchToWs().getClient();
    console.log('client is canActivate : ', client);
    console.log('salit---------------------------------------------------');
    const token = client.handshake.auth.token;
    console.log('token is : ', token);
    console.log('salit---------------------------------------------------');
    WebSocketAuthGuard.validate(client);
    return true;
  }

  static validate(client : Socket)
  {
      const { authorization } = client.handshake.headers;
      console.log('auth header : ', authorization);
      const token : string = authorization.split(' ')[1];
      console.log('token of auth : ', token);
      client.data.playload = verify(token, process.env.JWT_secret);
      console.log('client.data : ', client.data);
      console.log('client.data.payload : ', client.data.playload);
      return client;
  }
}
