import { Module } from '@nestjs/common';
import { gameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { UsersService } from 'src/users/services/users.service';
import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { friendsService } from 'src/users/services/friends.service';
import { BlockService } from 'src/users/services/blocked.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  	controllers: [GameController],
  	providers: [PrismaOrmService, gameService, GameGateway, JwtService],
  	imports: [PrismaOrmModule],
  	exports: [gameService],
})

export class GameModule {}
