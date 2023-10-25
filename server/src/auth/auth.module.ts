import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [JwtModule.register({}), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}