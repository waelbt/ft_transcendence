import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { UsersService } from "src/users/users.service";

type jwtPayload = {
    sub: string;
    email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(
        Strategy,
        'jwt',
    ) {
    constructor (config: ConfigService, private PrismaOrmService: PrismaOrmService, private usersService: UsersService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_secret'),
        });
    }
    
    // just change the above function that used directly Prisma service and instead use the function findOneUser from UserService module
    async validate(payload: jwtPayload) {
        // const user = await this.usersService.findOneUser(payload.sub);
        // // if (!user) return null;
        // delete user.HashPassword;
        // return user;
        return payload;
    }
}