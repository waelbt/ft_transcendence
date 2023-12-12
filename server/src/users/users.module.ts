import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './multer/multer.config';
import { friendsController } from './controllers/friends.controller';
import { friendsService } from './services/friends.service';
import { BlockService } from './services/blocked.service';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';


@Module({
  controllers: [UsersController, friendsController],
  providers: [PrismaOrmService, UsersService, friendsService, BlockService, JwtService],
  imports: [PrismaOrmModule, MulterModule.register(multerOptions)],
  exports: [UsersService]
})
export class UsersModule {}
