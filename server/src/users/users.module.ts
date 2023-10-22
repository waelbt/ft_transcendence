import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaOrmModule],
  exports: [UsersService]
})
export class UsersModule {}
