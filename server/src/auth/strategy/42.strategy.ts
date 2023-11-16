import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";


@Injectable()
export class googleStrategy extends PassportStrategy(
    Strategy, 
    '42'
    ) {
    constructor (config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_secret,
            clientID: config.get('Google_Client_Id'),
            ClientSecret: config.get('Google_Secret'),
            callbackURL: 'http://localhost:4000/google/redirect',
        })
    }
    async validate(profile: any, done: VerifiedCallback): Promise<any> {
        const user = {
            userId: profile.id,
            email: profile._json.email,
            fullName: profile.displayName,
            Avatar: profile._json.image.versions.medium,
            nickName: profile.username,
        }
        return (user);
    }
}
