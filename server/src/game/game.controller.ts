import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { gameService } from './game.service';
import { gameDto } from './dto/game.dto';

@ApiBearerAuth()
@Controller('game')
@ApiTags('game')
export class GameController {
    constructor(
        private gameService: gameService
    ) {}

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post('create')
    @ApiBody({ type: gameDto })
    async create(@Body() game: gameDto) {
        await this.gameService.checkUsers(game.winnerId, game.loserId);

        // console.log('hi im in create game');
        return await this.gameService.createGame(game);
    }
}
