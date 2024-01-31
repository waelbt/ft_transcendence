import { Server } from 'socket.io';

export enum GameMode {
    Classic = 'classic',
    Crazy = 'crazy',
    Training = 'training'
}

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface Player {
    userId: string;
    paddleY: number;
    paddleX: number;
    score: number;
}

export class PongGame {
    private ball: Ball;
    private players: Player[];
    private gameInterval: NodeJS.Timer | null = null;
    private io: Server;
    private mode: GameMode;
    private isGameRunning: boolean = false;

    private readonly GAME_WIDTH: number = 800;
    private readonly GAME_HEIGHT: number = 600;
    private readonly PADDLE_WIDTH: number = 10; // Define appropriate paddle width
    private readonly PADDLE_HEIGHT: number = 100;

    constructor(
        io: Server,
        mode: GameMode,
        playerOneId: string,
        playerTwoId: string
    ) {
        this.io = io;
        this.mode = mode;
        this.ball = { x: 400, y: 300, vx: 5, vy: 5 };
        this.players = [
            { userId: playerOneId, paddleX: 30, paddleY: 250, score: 0 },
            { userId: playerTwoId, paddleX: 760, paddleY: 250, score: 0 }
        ];
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

    private moveBall() {
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Collision with left and right walls
        if (this.ball.x < 0 || this.ball.x > this.GAME_WIDTH) {
            // Update score if needed
            // Reset ball to center
            this.ball.x = this.GAME_WIDTH / 2;
            this.ball.y = this.GAME_HEIGHT / 2;
        }

        // Collision with top and bottom walls
        if (this.ball.y < 0 || this.ball.y > this.GAME_HEIGHT) {
            this.ball.vy = -this.ball.vy;
        }
    }
    private checkPaddleCollisions() {
        this.players.forEach((player) => {
            if (this.ballIsCollidingWithPaddle(player)) {
                const paddleCenter = player.paddleY + this.PADDLE_HEIGHT / 2;
                const distanceFromPaddleCenter = paddleCenter - this.ball.y;

                // Adjust vertical velocity based on where the ball hits the paddle
                this.ball.vy += distanceFromPaddleCenter * -0.1;

                // Reverse horizontal direction
                this.ball.vx = -this.ball.vx;
            }
        });
    }

    private ballIsCollidingWithPaddle(player: Player): boolean {
        // Assuming the paddle is vertical
        return (
            this.ball.x >= player.paddleY &&
            this.ball.x <= player.paddleX + this.PADDLE_WIDTH &&
            this.ball.y >= player.paddleY &&
            this.ball.y <= player.paddleY + this.PADDLE_HEIGHT
        );
    }
    updatePlayerPaddle(userId: string, newY: number) {
        const player = this.players.find((p) => p.userId === userId);
        if (player) {
            // Ensure the new paddle position is within the canvas boundaries
            player.paddleY = Math.max(
                Math.min(newY, this.GAME_HEIGHT - this.PADDLE_HEIGHT),
                0
            );
        }
    }
    private updateScores() {
        if (this.ball.x < 0) {
            // Player 2 scores
            this.players[1].score += 1;
            this.resetBall();
        } else if (this.ball.x > this.GAME_WIDTH) {
            // Player 1 scores
            this.players[0].score += 1;
            this.resetBall();
        }
    }

    private resetBall() {
        this.ball.x = this.GAME_WIDTH / 2;
        this.ball.y = this.GAME_HEIGHT / 2;
        this.ball.vx = 2; // Reset to initial velocity or randomize
        this.ball.vy = 0;
    }
    private gameTick() {
        this.moveBall();
        this.checkPaddleCollisions();
        this.updateScores();

        // Broadcast updated game state to clients
        this.io.emit('gameUpdate', this.getGameState());
    }
    private checkBallCollisions() {
        // Check for collisions with top and bottom walls
        if (this.ball.y <= 0 || this.ball.y >= this.GAME_HEIGHT) {
            this.ball.vy = -this.ball.vy;
        }
        // Add logic for side walls if needed
    }

    private getGameState() {
        return {
            ball: this.ball
            // players: this.players
        };
    }
}
