import { Server } from 'socket.io';

export enum GameMode {
    Classic = 'classic',
    Crazy = 'crazy',
    Training = 'training'
}

interface Ball {
    x: number;
    y: number;
    vx: number; // velocity in x direction
    vy: number; // velocity in y direction
}

interface Player {
    paddleY: number; // Y position of the paddle
    score: number; // Player's score
}

export class PongGame {
    private ball: Ball;
    private players: Player[];
    private gameInterval: NodeJS.Timer | null;
    private io: Server; // Reference to the Socket.IO server instance
    private mode: GameMode; // The game mode

    // Constants for game dimensions
    private readonly GAME_WIDTH: number = 800; // Adjust as per your game's dimensions
    private readonly GAME_HEIGHT: number = 600;
    private isGameRunning: boolean = false;
    constructor(io: Server, mode: GameMode) {
        this.io = io;
        this.mode = mode;
        this.ball = { x: 0, y: 0, vx: 5, vy: 5 };
        this.players = [
            { paddleY: 0, score: 0 },
            { paddleY: 0, score: 0 }
        ];
        this.gameInterval = null;
    }

    startGame() {
        if (!this.isGameRunning) {
            this.gameInterval = setInterval(() => this.gameTick(), 1000 / 60);
            this.isGameRunning = true;
        }
    }

    pauseGame() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval as unknown as number); // Cast to any to bypass type checking
            this.gameInterval = null;
        }
        this.isGameRunning = false;
    }
    resumeGame() {
        if (!this.gameInterval) {
            this.startGame();
        }
    }

    private gameTick() {
        // Update ball position
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Collision with top and bottom
        if (this.ball.y <= 0 || this.ball.y >= this.GAME_HEIGHT) {
            this.ball.vy *= -1;
        }

        // Modify game logic based on the mode
        // For example, different behavior for 'Crazy' or 'Training' mode

        // Broadcast updated game state to clients
        this.io.emit('gameUpdate', this.getState());
    }

    private getState() {
        return {
            ball: this.ball,
            players: this.players
        };
    }

    // Implement additional methods as needed
}
