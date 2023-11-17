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
            ClientSecret: config.get('intra_Secret'),
            callbackURL: 'http://localhost:4000/auth/intra/callback',
            scope: ['profile'],
        })
    }
    async validate(accessToken : string, refreshToken : string, profile : any): Promise<any> {
        const user = {
            userId: profile.id,
            email: profile._json.email,
            fullName: profile.displayName,
            Avatar: profile._json.image.versions.medium,
            nickName: profile.username,
        }
        console.log(profile);
        return (user);
    }
}
