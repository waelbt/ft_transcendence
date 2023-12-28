import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { gameDto } from './dto/game.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class gameService {
    constructor(
        private prisma: PrismaOrmService,
        private userService: UsersService){}

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
        });
        await this.updateLevelAndXP(game.winnerId, 400);
        await this.updateLevelAndXP(game.loserId, 100);
        return newGame;
    }

    async updateLevelAndXP(userId: string, earnedXP: number){
        const user = await this.userService.getOneUser(userId);

        if (!user)
            throw new UnauthorizedException('user not found');
        
        user.exp += earnedXP;
        const xpForThisLevel = this.calculateExperienceRequiredForNextLevel(user.level);
        if (user.exp >= xpForThisLevel) {
            user.level++;
            user.exp = 0 + (user.exp - xpForThisLevel);
        }
        const updatedUser = await this.userService.saveUser(user);
    }

    private calculateExperienceRequiredForNextLevel(currentLevel: number): number {
        return (currentLevel + 1) * 1200;
    }
}
