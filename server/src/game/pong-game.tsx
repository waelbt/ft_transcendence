import { Server } from 'socket.io';

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

    // Constants for game dimensions
    private readonly GAME_WIDTH: number = 800; // Adjust as per your game's dimensions
    private readonly GAME_HEIGHT: number = 600;

    constructor(io: Server) {
        this.ball = { x: 0, y: 0, vx: 5, vy: 5 };
        this.players = [
            { paddleY: 0, score: 0 },
            { paddleY: 0, score: 0 }
        ];
        this.gameInterval = null;
        this.io = io; // Pass the Socket.IO server instance to the game
    }

    startGame() {
        this.gameInterval = setInterval(() => this.gameTick(), 1000 / 60); // 60 FPS
    }

    private gameTick() {
        // Update ball position
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Collision with top and bottom
        if (this.ball.y <= 0 || this.ball.y >= this.GAME_HEIGHT) {
            this.ball.vy *= -1;
        }

        // Add logic for collision with paddles and scoring

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
