import { Injectable } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { gameDto } from './dto/game.dto';

@Injectable()
export class gameService {
    constructor(
        private prisma: PrismaOrmService){}

    async createGame(game: gameDto){
        const newGame = await this.prisma.game.create({
            data:{
                player1Id: game.winnerId,
                player2Id: game.loserId,
                winnerId: game.winnerId,
                loserId: game.loserId,
                result: game.result,
                Mode: game.mode,
            }
        })
        return newGame;
    }
}
