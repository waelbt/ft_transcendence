import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
        Strategy,
        'jwt',
    ) {
    constructor (config: ConfigService, private PrismaOrmService: PrismaOrmService, private usersService: UsersService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoteExpiration: false,
            secretOrKey: config.get('JWT_secret'),
        });
    }

    // async validate(payload: {sub: number, email: string}) {
    //     const user = await this.PrismaOrmService.user.findUnique({
    //         where: {
    //             id: payload.sub,
    //         }
    //     });
    //     // if (!user) return null;
    //     delete user.HashPassword;
    //     return user;
    // }

    // just change the above function that used directly Prisma service and instead use the function findOneUser from UserService module
    async validate(payload: {sub: number}) {
        const user = await this.usersService.findOneUser(payload.sub);
        // if (!user) return null;
        delete user.HashPassword;
        return user;
    }
}