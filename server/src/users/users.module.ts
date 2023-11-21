import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './multer/multer.config';


@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  imports: [HttpModule ,PrismaOrmModule, MulterModule.register(multerOptions)],
  exports: [UsersService]
})
export class UsersModule {}
