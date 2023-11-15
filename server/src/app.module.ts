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
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from './common/guards';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaOrmModule,
    UsersModule,
    MulterModule.register({ dest: '/home/sel-ouaf/ft_transcendence/server/uploads' }),
    // JwtModule.register({secret: process.env.JWT_secret}),
  ],
  providers: [ChatGateway, 
    {
      provide: APP_GUARD,
      useClass: accessTokenGuard,
    },
    // JwtStrategy,
  ],
})
export class AppModule {}