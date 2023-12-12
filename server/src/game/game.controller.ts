import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('game1')
export class GameController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  create(@Body() createCatDto: any): string {
    console.log('post', createCatDto);
    return createCatDto.contact;
  }
  
}
