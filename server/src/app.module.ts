// @Module({
//   imports: [ConfigModule.forRoot({isGlobal: true,}), AuthModule, UserModule, PrismaOrmModule],
// })
// export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaOrmModule } from './prisma-orm/prisma-orm.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { GameGateway } from './game/game.gateway';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from './common/guards';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategy';
import { Middlware } from './auth/middlware/file.middlware';
import { UsersController } from './users/controllers/users.controller';
import { GameModule } from './game/game.module';
import { ApiCookieAuth } from '@nestjs/swagger';
import { ChatModule } from './chat/chat.module';
import { RoomService } from './chat/rooms/room.service';
import { ChatController } from './chat/chat.controller';
import { ScheduleModule } from '@nestjs/schedule';
// @ApiCookieAuth('jwt') // Specify the cookie name, e.g., 'jwt'
@Module({
  imports: [GameModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaOrmModule,
    UsersModule,
    MulterModule.register({ dest: '/home/sel-ouaf/ft_transcendence/server/uploads' }),
    // JwtModule.register({secret: process.env.JWT_secret}),
    ChatModule,
    // MulterModule.register({ dest: '/home/sel-ouaf/ft_transcendence/server/uploads' }),
    JwtModule.register({secret: process.env.JWT_secret}),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    ChatController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: accessTokenGuard,
    },
    RoomService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middlware).forRoutes(UsersController, ChatGateway);
  }
}