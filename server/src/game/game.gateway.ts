import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameMode, PongGame } from './pong-game';

interface WaitingPlayer {
    socket: Socket;
    userId: string;
    mode: GameMode;
}
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: 'game'
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private waitingPlayers: WaitingPlayer[] = [];
    private activeGames: Record<string, PongGame> = {};

    handleConnection(client: Socket) {
        console.log(`Client game connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log('Client game disconnected: ' + client.id);

        this.waitingPlayers = this.waitingPlayers.filter(
            (p) => p.socket.id !== client.id
        );
    }

    @SubscribeMessage('selectMode')
    handleSelectMode(
        client: Socket,
        payload: { userId: string; mode: GameMode }
    ) {
        console.log(`User ${payload.userId} selected mode ${payload.mode}`);
        const existingPlayerIndex = this.waitingPlayers.findIndex(
            (p) => p.userId === payload.userId
        );
        if (existingPlayerIndex !== -1) {
            // ? feature : Player is already in the waiting list, update their mode if it has changed
            this.waitingPlayers[existingPlayerIndex].mode = payload.mode;
        } else {
            // ? Add new player to the waiting list
            this.waitingPlayers.push({
                socket: client,
                userId: payload.userId,
                mode: payload.mode
            });
        }

        this.matchPlayers();
    }

    private matchPlayers() {
        // Try to match players who are waiting for the same mode
        this.waitingPlayers.forEach((player, index, object) => {
            const matchIndex = object.findIndex(
                (p) => p.mode === player.mode && p.userId !== player.userId
            );
            if (matchIndex !== -1) {
                // Found a match, start a game between these players
                const opponent = object[matchIndex];
                this.startGame([player, opponent], player.mode);
                // Remove matched players from the waiting list
                object.splice(index, 1);
                object.splice(matchIndex, 1);
            }
        });
    }

    private startGame(players: WaitingPlayer[], mode: GameMode) {
        const roomID = `${players[0].userId}${players[1].userId}`;

        players.forEach((player, index) => {
            player.socket.join(roomID);
            // Notify each player of their opponent's userId and the roomID
            player.socket.emit('gameSetup', {
                roomId: roomID,
                opponentUserId: players[(index + 1) % 2].userId // Get the other player's userId
            });
        });

        const pongGame = new PongGame(
            this.server,
            mode,
            players[0].userId,
            players[1].userId
        );
        this.activeGames[roomID] = pongGame;
        pongGame.startGame();

        this.server.to(roomID).emit('gameStarted', { room: roomID, mode });
    }

    @SubscribeMessage('paddleMove')
    handlePaddleMove(client: Socket, data: { roomId: string; y: number }) {
        const roomID = data.roomId;
        const newY = data.y;
    
        client.to(roomID).emit('opponentPaddleMove', { y: newY });
    }
}
