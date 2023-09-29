import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(
        Strategy,
        'jwt',
    ) {
    constructor (config: ConfigService, private PrismaOrmService: PrismaOrmService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoteExpiration: false,
            secretOrKey: config.get('JWT_secret'),
        });
    }

    async validate(payload: {sub: number, email: string}) {
        const user = await this.PrismaOrmService.user.findUnique({
            where: {
                id: payload.sub,
            }
        });
        // if (!user) return null;
        delete user.HashPassword;
        return user;
    }
}