import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [HttpModule ,PrismaOrmModule],
  exports: [UsersService]
})
export class UsersModule {}
