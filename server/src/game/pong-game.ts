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
    userId: string;
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

    constructor(
        io: Server,
        mode: GameMode,
        playerOneId: string,
        playerTwoId: string
    ) {
        this.io = io;
        this.mode = mode;
        this.ball = { x: 400, y: 300, vx: 5, vy: 5 }; // Initial ball position and velocity
        this.players = [
            { userId: playerOneId, paddleY: 250, score: 0 },
            { userId: playerTwoId, paddleY: 250, score: 0 }
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
        this.io.emit('gameUpdate', this.getGameState());
    }

    private handleCollisions() {
        // Implement logic to handle ball collisions with paddles
        // Update scores if necessary
    }

    private getGameState() {
        return {
            ball: this.ball,
            players: this.players
        };
    }

    // updatePlayerPaddle(userId: string, newY: number) {
    //     const player = this.players.find((p) => p.userId === userId);
    //     if (player) {
    //         // Ensure the new paddle position is within the canvas boundaries
    //         player.paddleY = Math.max(
    //             Math.min(newY, this.GAME_HEIGHT - this.PADDLE_HEIGHT),
    //             0
    //         );
    //     }
    // }
    // Implement additional methods as needed
}

// footprint
// The PongGame class in your server-side code (using NestJS and Socket.IO) serves as the core logic controller for a Pong game session. It manages the game state, processes game logic, and communicates with connected clients to synchronize the game state across players. Here's a detailed breakdown of its responsibilities and how it might be structured:
// Responsibilities of the PongGame Class

//     Manage Game State: It holds the state of the game, including the positions and velocities of the ball and paddles, scores, and game mode.

//     Game Loop Management: It controls the game loop, typically using setInterval to update the game state at a fixed time interval (e.g., 60 times per second for a smooth experience).

//     Collision Detection: It handles the logic for detecting collisions between the ball and the paddles, as well as the ball and the game boundaries (top, bottom, and sides of the canvas).

//     Score Keeping: It keeps track of players' scores, updating them when the ball passes a paddle (indicating a point has been scored).

//     Handle Player Inputs: It processes inputs received from players (like paddle movements) and updates the game state accordingly.

//     Broadcast Game Updates: It sends regular updates to connected clients to synchronize the game state across all players. This includes the positions of the ball and paddles, current scores, and any other relevant game information.

//     Game Mode Logic: If there are different game modes (like Classic, Crazy, or Training), it adjusts the game mechanics according to the selected mode.

//     Start, Pause, and Resume: It controls the flow of the game, handling start, pause, and resume functionalities.

// export class PongGame {
//     private ball: Ball; // Ball state (position, velocity)
//     private players: Player[]; // Player states (paddle position, score)
//     private gameInterval: NodeJS.Timer | null; // For the game loop
//     private isGameRunning: boolean; // Game running state
//     private io: Server; // Socket.IO server instance
//     private mode: GameMode; // Current game mode

//     constructor(io: Server, mode: GameMode) {
//         this.io = io;
//         this.mode = mode;
//         // Initialize ball and players
//         this.isGameRunning = false;
//         // Other initializations
//     }

//     startGame() {
//         // Start or resume the game loop
//     }

//     pauseGame() {
//         // Pause the game loop
//     }

//     private gameTick() {
//         // Update game state: Move ball, check collisions, update scores
//         // Emit state to players
//     }

//     updatePlayerPaddle(playerId: string, newPosition: number) {
//         // Update the specified player's paddle position
//     }

//     private checkCollisions() {
//         // Handle collision logic
//     }

//     private updateScores() {
//         // Update players' scores based on game state
//     }

//     // Additional methods as needed
// }
