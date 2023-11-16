import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { UsersService } from "src/users/users.service";

type jwtPayload = {
    sub: number;
    email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(
        Strategy,
        'jwt',
    ) {
    constructor (private PrismaOrmService: PrismaOrmService, private usersService: UsersService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_secret,
        });
    }
    
    // just change the above function that used directly Prisma service and instead use the function findOneUser from UserService module
    async validate(payload: jwtPayload) {
        const user = this.usersService.findOneUser(payload.sub);
        if (!user)
            throw new UnauthorizedException;
        return payload;
    }
}