import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Ball {
    pos: { x: number; y: number };
    speed: number;
    angle: number;
}

@WebSocketGateway({ cors: true, namespace: 'game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private waitingFriend: Socket | null = null;

    private waitingRooms: Record<string, Socket | null> = {
        classic: null,
        crazy: null,
        IA: null
    };

    private rooms: Record<
        string,
        {
            ballPos: { x: number; y: number };
            moveAngle: number;
            ballSpeed: number;
            intervalId: NodeJS.Timer | null;
            players: { id: string; pos: number }[];
            gameMode?: any;
        }
    > = {};

    handleConnection(client: Socket, ...args: any[]) {
        console.log('A client just connected: ' + client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('A client disconnected: ' + client.id);
        for (const gameMode in this.waitingRooms) {
            if (this.waitingRooms[gameMode]?.id === client.id) {
                this.waitingRooms[gameMode] = null;
            }
        }
        if (this.waitingFriend?.id === client.id) {
            this.waitingFriend = null;
        }
        for (const room in this.rooms) {
            if (
                this.rooms[room].players[0].id === client.id ||
                this.rooms[room].players[1].id === client.id
            ) {
                client.broadcast.to(room).emit('PlayerDisconnected', {}); // khasaktsifat data mli ki ydecconecti chi had
                clearInterval(Number(this.rooms[room].intervalId));
                delete this.rooms[room];
            }
        }
    }

    @SubscribeMessage('friends')
    handleFriendsMode(client: Socket): void {
        if (this.waitingFriend) {
            const room = `${this.waitingFriend.id}-${client.id}`;
            client.join(room);
            this.waitingFriend.join(room);

            const initialBall: Ball = {
                pos: { x: 0, y: 0 },
                speed: 6 / 16,
                angle: Math.PI / 4
            };

            this.rooms[room] = {
                ballPos: initialBall.pos,
                moveAngle: initialBall.angle,
                ballSpeed: initialBall.speed,
                intervalId: setInterval(
                    () => this.updateBallPosition(room, initialBall, 'classic'),
                    1000 / 60
                ),
                players: [
                    { id: this.waitingFriend.id, pos: 0 },
                    { id: client.id, pos: 0 }
                ]
            };

            this.server.to(this.waitingFriend.id).emit('startgame', {
                room: room,
                SecondPlayer: 0,
                chosen: 'classic'
            });
            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 1,
                chosen: 'classic'
            });

            this.waitingFriend = null;
        } else {
            this.waitingFriend = client;
        }
    }

    @SubscribeMessage('gameMode')
    handleGameMode(client: Socket, gameMode: 'classic' | 'crazy' | 'IA'): void {
        console.log(`Client ${client.id} chose ${gameMode} mode`);

        if (gameMode === 'IA') {
            const room = `${client.id}`;
            console.log(`Game started in ${gameMode} mode and ${client.id}`);
            client.join(room);
            const initialBall: Ball = {
                pos: { x: 0, y: 0 },
                speed: 6 / 16,
                angle: Math.PI / 4
            };

            this.rooms[room] = {
                ballPos: initialBall.pos,
                moveAngle: initialBall.angle,
                gameMode: gameMode,
                ballSpeed: initialBall.speed,
                intervalId: setInterval(
                    () => this.updateBallPosition(room, initialBall, gameMode),
                    1000 / 60
                ),
                players: [
                    { id: client.id, pos: 0 },
                    { id: null, pos: 0 }
                ]
            };

            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 0,
                chosen: gameMode
            });

            this.waitingRooms[gameMode] = null;
        } else if (this.waitingRooms[gameMode]) {
            const room = `${this.waitingRooms[gameMode].id}-${client.id}`;
            client.join(room);
            this.waitingRooms[gameMode].join(room);

            const initialBall: Ball = {
                pos: { x: 0, y: 0 },
                speed: 6 / 16,
                angle: Math.PI / 4
            };

            this.rooms[room] = {
                ballPos: initialBall.pos,
                moveAngle: initialBall.angle,
                ballSpeed: initialBall.speed,
                intervalId: setInterval(
                    () => this.updateBallPosition(room, initialBall, gameMode),
                    1000 / 60
                ),
                players: [
                    { id: this.waitingRooms[gameMode].id, pos: 0 },
                    { id: client.id, pos: 0 }
                ]
            };

            this.server.to(this.waitingRooms[gameMode].id).emit('startgame', {
                room: room,
                SecondPlayer: 0,
                chosen: gameMode
            });
            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 1,
                chosen: gameMode
            });

            console.log(
                `Game started in ${gameMode} mode between ${this.waitingRooms[gameMode].id} and ${client.id}`
            );

            this.waitingRooms[gameMode] = null;
        } else {
            this.waitingRooms[gameMode] = client;
        }
    }

    updateBallPosition(room: string, ball: Ball, mode: string): void {
        let newX = ball.pos.x - ball.speed * Math.cos(ball.angle);
        let newY = ball.pos.y + ball.speed * Math.sin(ball.angle);

        const paddleHeight = 6.625;

        if (
            newX > 540 / 16 &&
            newY <= this.rooms[room].players[1].pos + paddleHeight / 2 &&
            newY >= this.rooms[room].players[1].pos - paddleHeight / 2
        ) {
            newX = 540 / 16;
            ball.angle = Math.PI - ball.angle;
        }

        if (
            newX < -535 / 16 &&
            newY <= this.rooms[room].players[0].pos + paddleHeight / 2 &&
            newY >= this.rooms[room].players[0].pos - paddleHeight / 2
        ) {
            newX = -535 / 16;
            ball.angle = Math.PI - ball.angle;
        }

        if (newX < -575 / 16 || newX > 580 / 16) {
            // if ((mode === 'crazy' && newY > 10) || (mode === 'crazy' && newY < -10)) {
            //   // if (newX < -575 / 16) {
            //   //   newX = -574 / 16;
            //   //   ball.angle = Math.PI - ball.angle;
            //   // }
            //   // else if (newX > 580 / 16) {
            //   //   newX = 579 / 16;
            //   //   ball.angle = Math.PI - ball.angle;
            //   // }
            // }

            if (newX < -575 / 16) {
                this.server
                    .to(this.rooms[room].players[0].id)
                    .emit('rightscored');
                this.server
                    .to(this.rooms[room].players[1].id)
                    .emit('leftscored');
                newX = 0;
                newY = 0;
                ball.speed = 6 / 16;
            } else if (newX > 580 / 16) {
                this.server
                    .to(this.rooms[room].players[0].id)
                    .emit('leftscored');
                this.server
                    .to(this.rooms[room].players[1].id)
                    .emit('rightscored');
                newX = 0;
                newY = 0;
                ball.speed = 6 / 16;
            }
        }

        if (newY < -320 / 16 || newY > 325 / 16) {
            newY = newY < -320 / 16 ? -320 / 16 : 325 / 16;
            ball.angle *= -1;
            ball.speed += 0.03;
            // if (mode == "crazy") {
            //   ball.angle += Math.random() * (Math.PI / 4) - (Math.PI / 8);
            //   ball.speed += Math.random() * 0.2 - 0.05;
            // }
        }

        ball.pos = { x: newX, y: newY };
        this.server
            .to(this.rooms[room].players[0].id)
            .emit('ballmove', ball.pos);
        this.server
            .to(this.rooms[room].players[1].id)
            .emit('ballmove', ball.pos);
        if (this.rooms[room]?.gameMode === 'IA') {
            const maxPos = 17.5;
            const minPos = -17.187;
            // if (chosenMode === "crazy") {
            //   maxPos = 10;
            //   minPos = -10;
            // }

            const paddlepos1 = Math.min(Math.max(ball.pos.y, minPos), maxPos);
            this.server
                .to(this.rooms[room].players[0].id)
                .emit('paddlemove', paddlepos1);
            this.rooms[room].players[1].pos = paddlepos1;
        }
    }

    @SubscribeMessage('paddlemove')
    handlepaddlemove(
        client: Socket,
        payload: { room: string; pos: number; SecondPlayer: boolean; ball: Ball }
    ): void {
        // console.log(`Payload:`, payload.pos);
        // client.broadcast.to(payload.room).emit('paddlemove',payload.ball.pos.y + (payload.ball.speed * Math.sin(payload.ball.angle)) );
        client.broadcast.to(payload.room).emit('paddlemove', payload.pos);
        // this.rooms[payload.room].players[0].pos = payload.ball.pos.y + (payload.ball.speed * Math.sin(payload.ball.angle));
        if (this.rooms[payload.room] && !payload.SecondPlayer) {
            this.rooms[payload.room].players[0].pos = payload.pos;
        } else if (this.rooms[payload.room] && payload.SecondPlayer) {
            this.rooms[payload.room].players[1].pos = payload.pos;
        }
    }

    // @SubscribeMessage('gameended')
    // handleEndgame(client: Socket, payload: { room: string }): void {}
}
