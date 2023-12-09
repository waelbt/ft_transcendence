import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
<<<<<<< HEAD
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
=======
import { Strategy } from "passport-google-oauth20";

>>>>>>> main

@Injectable()
export class googleStrategy extends PassportStrategy(
    Strategy, 
    'google'
    ) {
    constructor (config: ConfigService){
        super({
<<<<<<< HEAD
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('R_JWT_secret'),
            passReqToCallback: true,
            clientID: config.get('Google_Client_Id'),
            ClientSecret: config.get('Google_Secret'),
            callbackURL: 'http://localhost:4000/google/redirect',
=======
            clientID: '1010031413538-61qtbs1ba0qjnmld9s5kfe3ciak5m4ho.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:4000/auth/google/callback',
>>>>>>> main
            scope: ['email' ,'profile'],
        })
    }
    async validate(accessToken : string, refreshToken : string, profile: any): Promise<any> {
        console.log('im in validate google strategy');
        console.log(profile);
        const {name, emails, photos} = profile;
        const user = {
            id: profile.id,
            email: emails[0].value,
            fullName: profile.displayName,
            nickName: profile.displayName,
            Avatar: photos[0].value,
        }
        return (user);
    }
}