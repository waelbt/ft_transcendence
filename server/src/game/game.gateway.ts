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

    private waitingPlayers: WaitingPlayer[] = []; // Store waiting players
    private activeGames: Record<string, PongGame> = {}; // Track active games

    handleConnection(client: Socket) {
        console.log(`Client game connected: ${client.id}`);
        // Optionally, handle initial connection logic here
    }

    handleDisconnect(client: Socket) {
        console.log('Client game disconnected: ' + client.id);
        // Handle player disconnection logic here
        // Remove player from waitingPlayers if they're there
        this.waitingPlayers = this.waitingPlayers.filter(
            (p) => p.socket.id !== client.id
        );

        // Handle disconnection logic for active games
    }

    @SubscribeMessage('selectMode')
    handleSelectMode(
        client: Socket,
        payload: { userId: string; mode: GameMode }
    ) {
        console.log(`User ${payload.userId} selected mode ${payload.mode}`);
        this.addPlayerToWaitingList(client, payload.userId, payload.mode);
    }

    private addPlayerToWaitingList(
        client: Socket,
        userId: string,
        selectedMode: GameMode
    ) {
        this.waitingPlayers.push({
            socket: client,
            userId,
            mode: selectedMode
        });

        const playersForMode = this.waitingPlayers.filter(
            (p) => p.mode === selectedMode
        );
        if (playersForMode.length >= 2) {
            this.startGame(playersForMode.slice(0, 2), selectedMode);
            this.waitingPlayers = this.waitingPlayers.filter(
                (p) => !playersForMode.slice(0, 2).includes(p)
            );
        }
    }

    private startGame(players: WaitingPlayer[], mode: GameMode) {
        // Concatenate the user IDs of the two players to create a unique room ID
        const roomID = `${players[0].userId}_${players[1].userId}`;

        players.forEach((player) => player.socket.join(roomID));

        const pongGame = new PongGame(this.server, mode);
        this.activeGames[roomID] = pongGame;
        pongGame.startGame();

        // Notify players in the room that the game has started
        this.server.to(roomID).emit('gameStarted', { room: roomID, mode });
    }
    
    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, payload: { roomId: string }) {
        const game = this.activeGames[payload.roomId];
        game?.startGame();
    }

    @SubscribeMessage('pauseGame')
    handlePauseGame(client: Socket, payload: { roomId: string }) {
        const game = this.activeGames[payload.roomId];
        game?.pauseGame();
    }

    @SubscribeMessage('resumeGame')
    handleResumeGame(client: Socket, payload: { roomId: string }) {
        const game = this.activeGames[payload.roomId];
        game?.resumeGame();
    }
}
