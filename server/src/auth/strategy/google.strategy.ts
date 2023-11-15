import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifiedCallback } from "passport-jwt";

@Injectable()
export class googleStrategy extends PassportStrategy(
    Strategy, 
    'google'
    ) {
    constructor (config: ConfigService){
        super({
            clientID: config.get('Google_Client_Id'),
            ClientSecret: config.get('Google_Secret'),
            callbackURL: 'http://localhost:4000/google/redirect',
            scope: ['email' ,'profile'],
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback): Promise<any> {
        const {name, email, photo} = profile;
        const user = {
            email: email[0].value,
            fullName: name.fullName,
            accessToken,
            refreshToken,
        }
        return (user);
    }
}