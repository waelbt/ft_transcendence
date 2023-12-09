import { Injectable, Res } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import * as speakeasy from 'speakeasy';
import { User } from "@prisma/client";
import * as qrcode from 'qrcode';


@Injectable()
export class twoFAService{
    constructor(private prisma: PrismaOrmService){}
    generate2FASecret(nickName: string){
        const sercet = speakeasy.generateSecret({name: nickName});
        return sercet.base32;
    }
    async generate2FA(@Res() res, user: User){
        const secret = this.generate2FASecret((await user).fullName);
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret,
            label: `transandance:${(await user).fullName}`,
            issuer: 'transandance', 
        });
    
        try {
            const qrCodeDataURL = await qrcode.toDataURL(otpAuthUrl);
            const f2a = await this.prisma.user.update({
                where: {id: (await user).id},
                data: {F2A_Secret: secret},
            });
            return res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error);
            return res.status(500).json({ message: 'Error generating QR code' });
        }
    }

    // generateTwoFAToken(secret) {
    //     return speakeasy.totp({
    //       secret,
    //       encoding: 'base32',
    //     });
    // }

    async validateTwoFAToken(token, secret) {
        return speakeasy.totp.verify({
          secret,
          encoding: 'base32',
          token,
          window: 1, 
      });
    }

    async isItEnable(user: User){
        if (user.F2A == true)
            return { message: '2FA enable'};
        return { message: '2FA is not enable'};
    }

    async  disable2FA(user: User){
        const update = await this.prisma.user.update({
            where: {id: user.id},
            data: {F2A: false},
        });
    }
}