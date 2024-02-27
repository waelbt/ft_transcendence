import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";


@Injectable()
export class googleStrategy extends PassportStrategy(
    Strategy, 
    'google'
    ) {
    constructor (config: ConfigService){
        super({
            clientID: config.get('Google_Client_Id'),
            clientSecret: config.get('Google_Secret'),
            callbackURL: config.get('googleCallback'),
            scope: ['email' ,'profile'],
        })
    }

    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async validate(accessToken : string, refreshToken : string, profile: any): Promise<any> {
        // console.log('im in validate google strategy');
        // console.log(profile);
        const {name, emails, photos} = profile;
        const user = {
            id: profile.id,
            email: emails[0].value,
            fullName: profile.displayName,
            nickName: profile.displayName + this.generateRandomString(10),
            Avatar: photos[0].value,
        }
        return (user);
    }
}