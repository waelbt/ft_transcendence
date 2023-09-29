import { Global, Module } from '@nestjs/common';
import { PrismaOrmService } from './prisma-orm.service';

@Global()
@Module({
  providers: [PrismaOrmService],
  exports: [PrismaOrmService],
})
export class PrismaOrmModule {}
