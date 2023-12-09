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
            clientID: 'u-s4t2ud-7945ba61de4ba67ad52d4f88677d3ce18e8ac60d14c137c5f5a5f25982ee2cf7',
            clientSecret: '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',
            callbackURL: 'http://localhost:4000/auth/intra/callback',
            Scope: ['profile', 'email'],
        });
    }
    async validate(accessToken : string, refreshToken : string, profile : any): Promise<any> {
        console.log('im in validate 42 strategy');
        console.log(profile);
        const user = {
            id: profile.id,
            email: profile._json.email,
            fullName: profile.displayName,
            Avatar: profile._json.image.versions.medium,
            nickName: profile.username,
        }
        // console.log(profile);
        return (user);
    }
}
