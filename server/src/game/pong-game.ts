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
            this.io.on('movePaddle', (data) => {
                this.updatePlayerPaddle(data.userId, data.newY);
            });
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

    private checkBallCollisions() {
        if (this.ball.y < 0 || this.ball.y > this.GAME_HEIGHT) {
            this.ball.vy = -this.ball.vy;
        }
    }

    private updateBall() {
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
    }

    // ! modes handling
    // private moveBall() {
    //     if (this.mode === GameMode.Crazy) {
    //         // Increase ball speed or add random movements
    //         this.ball.vx *= 1.05; // Example of increasing speed
    //     }
    // Rest of the moveBall logic...
    // }

    private moveBall() {
        this.updateBall();
        this.checkBallCollisions();
        this.updateScores();
    }

    private resetBall() {
        this.ball.x = this.GAME_WIDTH / 2;
        this.ball.y = this.GAME_HEIGHT / 2;
        this.ball.vx = -this.ball.vx; // Reverse horizontal direction
        this.ball.vy = 0; // Reset vertical velocity
    }
    private checkPaddleCollisions() {
        this.players.forEach((player) => {
            if (this.ballIsCollidingWithPaddle(player)) {
                // Reverse horizontal direction
                this.ball.vx = -this.ball.vx;

                // Adjust the ball's vertical velocity based on where it hits the paddle
                const paddleCenter = player.paddleY + this.PADDLE_HEIGHT / 2;
                const distanceFromPaddleCenter = this.ball.y - paddleCenter;
                this.ball.vy += distanceFromPaddleCenter * 0.05;
            }
        });
    }

    private ballIsCollidingWithPaddle(player: Player): boolean {
        // Check for collision with player's paddle
        return (
            this.ball.x >= player.paddleX &&
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
            // Emit updated paddle position to clients
            this.io.emit('paddleUpdate', {
                userId: userId,
                paddleY: player.paddleY
            });
        }
    }

    private updateScores() {
        if (this.ball.x < 0) {
            this.players[1].score += 1;
            this.checkForWinner();
            this.resetBall();
        } else if (this.ball.x > this.GAME_WIDTH) {
            this.players[0].score += 1;
            this.checkForWinner();
            this.resetBall();
        }
    }

    private checkForWinner() {
        // Check if any player has reached the winning score
        const winningScore = 5;
        if (
            this.players[0].score >= winningScore ||
            this.players[1].score >= winningScore
        ) {
            this.isGameRunning = false;
            clearInterval(this.gameInterval as unknown as number);
            this.gameInterval = null;
            // Emit the end game event with the winner's information
            this.io.emit('endGame', {
                winner:
                    this.players[0].score >= winningScore
                        ? this.players[0].userId
                        : this.players[1].userId
            });
        }
    }
    // private checkForWinner() {
    //     const winningScore = 5;
    //     if (
    //         this.players[0].score >= winningScore ||
    //         this.players[1].score >= winningScore
    //     ) {
    //         this.isGameRunning = false;
    //         clearInterval(this.gameInterval as unknown as number);
    //         this.gameInterval = null;
    //         // Emit the end game event with the winner's information
    //         const winner =
    //             this.players[0].score >= winningScore
    //                 ? this.players[0].userId
    //                 : this.players[1].userId;
    //         this.io.emit('endGame', { winner: winner });
    //         this.resetGame(); // Reset game state if necessary
    //     }
    // }
    private gameTick() {
        this.moveBall();
        this.checkPaddleCollisions();
        this.updateScores();

        // Broadcast updated game state to clients
        this.io.emit('gameUpdate', this.getGameState());
    }

    private getGameState() {
        return {
            ball: this.ball,
            players: this.players.map((player) => ({
                userId: player.userId,
                paddleY: player.paddleY,
                score: player.score
            }))
        };
    }
}
