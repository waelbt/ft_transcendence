import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { gameDto } from './dto/game.dto';
import { Achievement } from '@prisma/client';

@Injectable()
export class gameService {
    constructor(
        private prisma: PrismaOrmService,){}

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

        await this.winnerAchievements(game.winnerId, game.mode, game.result);
        await this.loserAchievement(game.loserId, game.result);
        await this.updateLevelAndXP(game.winnerId, 400);
        await this.updateLevelAndXP(game.loserId, 100);
        return newGame;
    }


    async updateLevelAndXP(userId: string, earnedXP: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user)
            throw new NotFoundException('user not found');
        
        user.exp += earnedXP;
        const xpForThisLevel = this.calculateExperienceRequiredForNextLevel(user.level);
        if (user.exp >= xpForThisLevel) {
            user.level++;
            user.exp = 0 + (user.exp - xpForThisLevel);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: user
        });
    }

    private calculateExperienceRequiredForNextLevel(currentLevel: number): number {
        return (currentLevel + 1) * 1200;
    }

    async winnerAchievements(userId: string, mode: string, result: string){
        const achievement = await this.prisma.achievement.findUnique({ where: { UserId: userId } });

        console.log('chihja');
        console.log(achievement);
        // if u win ur first game
        await this.firstGameWin(achievement, userId);

        // // if u win by 5-0
        await this.bigWin(achievement, userId, result);

        // // 1- if u win 3 games in row brown | 2- if u win 5 games in row silver | 3- if u win 10 games in row golden    
        await this.consecutiveWinsAchievements(achievement, userId);
        
        // // if u win agains boot
        await this.winsVSboot(achievement, userId);
    }

    async loserAchievement(userId: string, result: string){
        // if u lose by 5-0
        const achievement = await this.prisma.achievement.findUnique({ where: { UserId: userId } });

        if (achievement && !achievement.khari){
            // User has lose a game with a score of 0-5
            if (result === "0-5") {
                await this.prisma.achievement.update({
                    where: { UserId: userId },
                    data: { khari: true },
                });
            }
        }
    }

    async firstGameWin(achievement: Achievement, userId: string){
        // console.log('here: ', achievement.welcome);
        if (achievement && !achievement.welcome) {          
            console.log('hanaya: ', userId);
            await this.prisma.achievement.update({
                where: { UserId: userId },
                data: { welcome: true },
            });
        }
    }

    async bigWin(achievement: Achievement, userId: string, result: string){
        if (achievement && !achievement.harban){

            // User has won a game with a score of 5-0
            if (result === "5-0") {
                await this.prisma.achievement.update({
                    where: { UserId: userId },
                    data: { harban: true },
                });
            }
        }
    }

    async consecutiveWinsAchievements(achievement: Achievement, userId: string){
        if (achievement) {
            const newConsecutiveWins = achievement.consecutiveWins + 1;
            await this.prisma.achievement.update({
                where: { UserId: userId },
                data: { consecutiveWins: newConsecutiveWins },
            });
        }
        if (achievement && achievement.consecutiveWins == 3) {
            await this.prisma.achievement.update({
              where: { UserId: userId },
              data: { brown: true },
            });
        }
        if (achievement && achievement.consecutiveWins == 5) {
            await this.prisma.achievement.update({
              where: { UserId: userId },
              data: { silver: true },
            });
        }
        if (achievement && achievement.consecutiveWins == 10) {
            await this.prisma.achievement.update({
              where: { UserId: userId },
              data: { goldon: true },
            });
        }
    }

    async winsVSboot(achievement: Achievement, userId: string){
        if (achievement && !achievement.hacker) {          
            await this.prisma.achievement.update({
                where: { UserId: userId },
                data: { hacker: true },
            });
        }
    }

    async checkUsers(userId1: string, userId2: string) {
        const user1 = await this.prisma.user.findUnique({
            where: {
                id: userId1
            }
        });
        const user2 = await this.prisma.user.findUnique({
            where: {
                id: userId2
            }
        });

        if (!user1 || !user2) throw new NotFoundException('user not found');
    }

}
