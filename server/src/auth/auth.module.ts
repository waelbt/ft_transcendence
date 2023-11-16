import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, googleStrategy } from "./strategy";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [JwtModule.register({secret: process.env.JWT_secret,}), UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, googleStrategy],
})
export class AuthModule {}