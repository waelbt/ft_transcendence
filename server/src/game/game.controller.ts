import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/services/users.service';
import { gameService } from './game.service';
import { gameDto } from './dto/game.dto';

@ApiBearerAuth()
@Controller('game')
@ApiTags('game')
export class GameController {
    constructor(
        private userService: UsersService,
        private gameService: gameService){}

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post('create')
    @ApiBody({type: gameDto})

    async create(@Body() game: gameDto){
        await this.checkUsers(game.winnerId, game.loserId);

        console.log('hi im in create game');
        return (await this.gameService.createGame(game));
    }

    async checkUsers(userId1: string, userId2: string){
        const user1 = await this.userService.findOneUser(userId1);
        const user2 = await this.userService.findOneUser(userId2);

        if (!user1 || !user2)
            throw new NotFoundException('user not found');
    }
}
