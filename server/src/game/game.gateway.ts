import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { PrismaClient } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { gameService } from './game.service';

interface Ball {
    pos: { x: number; y: number };
    speed: number;
    angle: number;
}

@WebSocketGateway({ cors: true, namespace: 'game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly gameService: gameService) { }

    @WebSocketServer()
    server: Server;

    prisma = new PrismaClient();

    private waitingFriend: Socket | null = null;

    private waitibgids: Record<string, string | null> = {
        classic: null,
        crazy: null,
        IA: null,
        frd: null
    };

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
            plysIds?: string[];
        }
    > = {};

    private connectedUsers: Record<
        string,
        {
            message?: string;
            state: boolean;
            userData?: any;
        }
    > = {};

    async handleConnection(client: any, ...args: any[]) {
        
        const userCheck = await this.gameService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        // console.log('ha ana : ', client)
        // console.log('howa : ', client.handshake.auth.token)
        // console.log('user: ', userCheck);
        if (userCheck.state === false) {
            console.log('from h');
            await this.handleDisconnect(client);
        } else {
            if (userCheck.userData.sub) {
                const isUser = await this.prisma.user.findUnique({
                    where: {
                        id: userCheck.userData.sub
                    }
                });
                if (!isUser) await this.handleDisconnect(client);
            }
        }

        this.connectedUsers[client.id] = userCheck;
    }

    async handleDisconnect(client: any) {
        console.log('A client disconnected: ' + client.id);

        delete this.connectedUsers[client.id];
        // console.log('client : ', client);
        const userCheck = await this.gameService.getUserFromAccessToken(
            client.handshake.auth.token
        );
        // console.log('howa : ', client.handshake.auth.token)
        // console.log('user: ', userCheck);
        if (userCheck.userData)
            var user = await this.prisma.user.findUnique({
                where: {
                    id: userCheck.userData.sub
                }
            });
        if (!user) {
            client.disconnect(true);
        console.log('A client disconnected: (GAME) ' + client.id);
            // for (const room in this.rooms) {
            //     if (
            //         this.rooms[room].players[0].id === client.id ||
            //         this.rooms[room].players[1].id === client.id
            //     ) {
            //         client.broadcast
            //             .to(room)
            //             .emit('PlayerDisconnected', this.rooms[room].plysIds); // khasaktsifat data mli ki ydecconecti chi had
            //         clearInterval(Number(this.rooms[room].intervalId));
            //         delete this.rooms[room];
            //     }
            // }
            return;
        }

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
                client.broadcast
                    .to(room)
                    .emit('PlayerDisconnected', this.rooms[room].plysIds); // khasaktsifat data mli ki ydecconecti chi had
                clearInterval(Number(this.rooms[room].intervalId));
                delete this.rooms[room];
            }
        }
    }

    private broadcastUserStatus(userId: string, status: 'inGame' | 'online') {
        const message = {
            userId,
            status
        };
        console.log('message in game: ', message);
        this.server.emit('userStatusChange', message);
    }

    @SubscribeMessage('friends')
    handleFriendsMode(
        client: Socket,
        ids: { userid: string; myid: string }
    ): void {
        console.log('friends mode', ids);
        if (this.checkIfPlyrIsInGame(client, ids.userid) || this.checkIfPlyrIsInGame(client, ids.myid)) {
            this.server.to(client.id).emit('gameCanceled', 'You are already in a game.');
            return;
        }
        if (this.waitingFriend && this.waitingFriend !== client 
            && this.waitibgids['frd'] !== ids.myid) {
            console.log('game started in friends mode');
            const room = `${this.waitingFriend.id}${client.id}`;
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
                ],
                plysIds: [this.waitibgids['frd'], ids.myid]
            };
            console.log('waitroom', this.waitingFriend.id);
            this.server.to(this.waitingFriend.id).emit('startgame', {
                room: room,
                SecondPlayer: 1,
                chosen: 'classic',
                opponentId: ids.myid
            });
            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 2,
                chosen: 'classic',
                opponentId: this.waitibgids['frd']
            });

            this.waitingFriend = null;
            this.waitibgids['frd'] = null;
        } else if (ids.myid !== ids.userid) {
            console.log(this.connectedUsers);

            for (const user in this.connectedUsers) {
                console.log(this.connectedUsers[user]?.userData?.sub, ids);
                if (this.connectedUsers[user]?.userData?.sub === ids.userid) {
                    console.log('challenge');
                    this.server.to(user).emit('challenge', user);
                }
            }
            this.waitingFriend = client;
            this.waitibgids['frd'] = ids.myid;
        }
    }

    @SubscribeMessage('leaveGameMode')
    handleLeaveGameMode(
        client: Socket,
        payload: { gameMode: 'classic' | 'crazy' | 'training'; userId: string }
    ): void {
        console.log(`Client ${client.id} left ${payload.gameMode} mode`);
        // for (const room in this.rooms) {
        //     if (this.rooms[room].players[0].id === client.id) {
        //         clearInterval(Number(this.rooms[room].intervalId));
        //         delete this.rooms[room];
        //     }
        // }
        if (this.waitingRooms[payload.gameMode] === client) {
            this.waitingRooms[payload.gameMode] = null;
        }
    }

    checkIfPlyrIsInGame(client: Socket, userId: string) {
        for (const room in this.rooms) {
            if (
                this.rooms[room].players[0].id === client.id ||
                this.rooms[room].players[1].id === client.id ||
                this.rooms[room].plysIds.includes(userId)
            ) {
                return true;
            }
        }
        return false;
    }

    @SubscribeMessage('gameMode')
    async handleGameMode(
        client: Socket,
        payload: { gameMode: 'classic' | 'crazy' | 'training'; userId: string }
    ): Promise<void> {
        console.log(`Client ${client.id} chose ${payload.gameMode} mode`);



        if (this.checkIfPlyrIsInGame(client, payload.userId)) {
            this.server.to(client.id).emit('gameCanceled', 'You are already in a game.');
            return;
        }


        if ((this.waitingRooms['classic'] &&
            this.waitingRooms['classic'] !== client &&
            this.waitibgids['classic'] === payload.userId)) {
            this.server
                .to(this.waitingRooms['classic'].id)
                .emit('gameCanceled', 'The game has been canceled');
            this.waitingRooms[payload.gameMode] = client;
            this.waitibgids[payload.gameMode] = payload.userId;
        }
        else if ((this.waitingRooms['crazy'] &&
            this.waitingRooms['crazy'] !== client &&
            this.waitibgids['crazy'] === payload.userId)) {
            this.server
                .to(this.waitingRooms['crazy'].id)
                .emit('gameCanceled', 'The game has been canceled');
            this.waitingRooms[payload.gameMode] = client;
            this.waitibgids[payload.gameMode] = payload.userId;
        }
        else if (payload.gameMode === 'training') {
            const room = `${client.id}`;
            console.log(
                `Game started in ${payload.gameMode} mode and ${client.id}`
            );
            client.join(room);
            const initialBall: Ball = {
                pos: { x: 0, y: 0 },
                speed: 6 / 16,
                angle: Math.PI / 4
            };

            this.rooms[room] = {
                ballPos: initialBall.pos,
                moveAngle: initialBall.angle,
                gameMode: payload.gameMode,
                ballSpeed: initialBall.speed,
                intervalId: setInterval(
                    () =>
                        this.updateBallPosition(
                            room,
                            initialBall,
                            payload.gameMode
                        ),
                    1000 / 60
                ),
                players: [
                    { id: client.id, pos: 0 },
                    { id: null, pos: 0 }
                ],
                plysIds: [this.waitibgids[payload.gameMode], payload.userId]
            };

            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 1,
                chosen: payload.gameMode
            });

            this.waitingRooms[payload.gameMode] = null;
        } else if (
            this.waitingRooms[payload.gameMode] &&
            this.waitingRooms[payload.gameMode] !== client &&
            this.waitibgids[payload.gameMode] !== payload.userId
        ) {
            const room = `${this.waitibgids[payload.gameMode]}${payload.userId
                }`;
            client.join(room);
            this.waitingRooms[payload.gameMode].join(room);

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
                    () =>
                        this.updateBallPosition(
                            room,
                            initialBall,
                            payload.gameMode
                        ),
                    1000 / 60
                ),
                players: [
                    { id: this.waitingRooms[payload.gameMode].id, pos: 0 },
                    { id: client.id, pos: 0 }
                ],
                plysIds: [this.waitibgids[payload.gameMode], payload.userId]
            };
            this.server
                .to(this.waitingRooms[payload.gameMode].id)
                .emit('startgame', {
                    room: room,
                    SecondPlayer: 1,
                    opponentId: payload.userId,
                    chosen: payload.gameMode
                });
            this.server.to(client.id).emit('startgame', {
                room: room,
                SecondPlayer: 2,
                opponentId: this.waitibgids[payload.gameMode],
                chosen: payload.gameMode
            });

            await this.prisma.user.update({
                where: { id: payload.userId },
                data: { status: "inGame" }
            });
            this.broadcastUserStatus(payload.userId, 'inGame');

            await this.prisma.user.update({
                where: { id: this.waitibgids[payload.gameMode] },
                data: { status: "inGame" }
            });
            this.broadcastUserStatus(this.waitibgids[payload.gameMode], 'inGame');


            console.log(
                `Game started in ${payload.gameMode} mode between ${this.waitingRooms[payload.gameMode].id
                } and ${client.id}`
            );

            this.waitingRooms[payload.gameMode] = null;
        } else if (this.waitingRooms[payload.gameMode] === null) {
            this.waitingRooms[payload.gameMode] = client;
            this.waitibgids[payload.gameMode] = payload.userId;
        }
        // else if (this.waitibgids[payload.gameMode] === payload.userId) {
        //     this.server
        //         .to(client.id)
        //         .emit('error', 'Cannot play with yourself in this game mode.');
        // }
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
                    .emit('leftscored', this.rooms[room].players);
                newX = 0;
                newY = 0;
                ball.speed = 6 / 16;
            } else if (newX > 580 / 16) {
                this.server
                    .to(this.rooms[room].players[0].id)
                    .emit('leftscored', this.rooms[room].players);
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
            .to(this.rooms[room]?.players[0].id)
            .emit('ballmove', ball.pos);
        this.server
            .to(this.rooms[room]?.players[1].id)
            .emit('ballmove', ball.pos);
        if (this.rooms[room]?.gameMode === 'training') {
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
        payload: { room: string; pos: number; SecondPlayer: number; ball: Ball }
    ): void {
        // client.broadcast.to(payload.room).emit('paddlemove',payload.ball.pos.y + (payload.ball.speed * Math.sin(payload.ball.angle)) );
        client.broadcast.to(payload.room).emit('paddlemove', payload.pos);
        // this.rooms[payload.room].players[0].pos = payload.ball.pos.y + (payload.ball.speed * Math.sin(payload.ball.angle));
        if (this.rooms[payload.room] && payload.SecondPlayer === 1) {
            this.rooms[payload.room].players[0].pos = payload.pos;
        } else if (this.rooms[payload.room] && payload.SecondPlayer === 2) {
            this.rooms[payload.room].players[1].pos = payload.pos;
        }
    }

    @SubscribeMessage('gameended')
    async handleEndgame(client: Socket, payload: { room: string }): Promise<void>{
        
        for (const room in this.rooms) {
            if (
                this.rooms[room].players[0].id === client.id ||
                this.rooms[room].players[1].id === client.id
            ) {


                if (this.rooms[room]?.plysIds[0] !== undefined){
                    console.log('id0 in gameended:    ', this.rooms[room]?.plysIds[0])
                    await this.prisma.user.update({
                        where: { id: this.rooms[room]?.plysIds[0]},
                        data: { status: "online" }
                    });
                    this.broadcastUserStatus(this.rooms[room]?.plysIds[0], 'online');
                }

                if (this.rooms[room]?.plysIds[1] !== undefined){
                    console.log('id1 in gameended:    ', this.rooms[room]?.plysIds[1])
                    await this.prisma.user.update({
                        where: { id: this.rooms[room]?.plysIds[1]},
                        data: { status: "online" }
                    });
                    this.broadcastUserStatus(this.rooms[room]?.plysIds[1], 'online');
                }
            }
        }

        for (const room in this.rooms) {
            if (
                this.rooms[room].players[0].id === client.id ||
                this.rooms[room].players[1].id === client.id
            ) {
                client.broadcast
                    .to(room)
                    .emit('PlayerDisconnected', this.rooms[room].plysIds); // khasaktsifat data mli ki ydecconecti chi had
                clearInterval(Number(this.rooms[room].intervalId));
                delete this.rooms[room];
            }
        }
        

    }
}
