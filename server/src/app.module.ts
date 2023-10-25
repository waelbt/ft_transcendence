// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
// import { PrismaOrmModule } from './prisma-orm/prisma-orm.module';

// @Module({
//   imports: [ConfigModule.forRoot({isGlobal: true,}), AuthModule, UserModule, PrismaOrmModule],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaOrmModule } from './prisma-orm/prisma-orm.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaOrmModule,
    UsersModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}