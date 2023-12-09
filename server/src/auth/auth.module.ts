import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, googleStrategy } from "./strategy";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { intrastrategy } from "./strategy/42.strategy";
import { twoFAController } from "./controllers/2FA.controller";
import { twoFAService } from "./services/2FA.services";

@Module({
    imports: [JwtModule.register({secret: process.env.JWT_secret,}), UsersModule, PassportModule],
    controllers: [AuthController, twoFAController],
    providers: [AuthService, twoFAService, JwtStrategy, googleStrategy, intrastrategy],
})
export class AuthModule {}