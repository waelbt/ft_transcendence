import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-42';


@Injectable()
export class intrastrategy extends PassportStrategy(
    Strategy, 
    '42'
    ) {
    constructor (config: ConfigService){
        super({
            clientID: config.get('intra_Client_Id'),
            clientSecret: config.get('intra_Secret'),
            callbackURL: config.get('intraCallback'),
            Scope: ['profile', 'email'],
        });
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

    async validate(accessToken : string, refreshToken : string, profile : any): Promise<any> {
        // console.log('im in validate 42 strategy');
        // console.log(profile);

        const user = {
            id: profile.id,
            email: profile._json.email,
            fullName: profile.displayName,
            Avatar: profile._json.image.versions.medium,
            nickName: profile.username + this.generateRandomString(10),
        }
        // console.log(profile);
        return (user);
    }
}
