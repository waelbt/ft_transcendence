import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaOrmModule } from './prisma-orm/prisma-orm.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { Middlware } from './auth/middlware/file.middlware';
import { UsersController } from './users/controllers/users.controller';
import { GameModule } from './game/game.module';
import { ChatModule } from './chat/chat.module';
import { RoomService } from './chat/rooms/room.service';
import { ChatController } from './chat/chat.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from './common/guards';
const uploadsDestination = process.env.UPLOADS_DESTINATION;

@Module({
    imports: [
        GameModule,
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        PrismaOrmModule,
        UsersModule,
        MulterModule.register({ dest: uploadsDestination }),
        ChatModule,
        JwtModule.register({ secret: process.env.JWT_secret }),
        ScheduleModule.forRoot()
    ],
    controllers: [ChatController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: accessTokenGuard
        },
        RoomService
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(Middlware).forRoutes(UsersController, ChatGateway);
    }
}
