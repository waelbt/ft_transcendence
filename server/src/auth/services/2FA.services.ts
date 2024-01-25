import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { User } from '@prisma/client';
import * as otplib from 'otplib';
import * as qrcodeLib from 'qrcode';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class twoFAService {
    constructor(private prisma: PrismaOrmService) {}

    generate2FASecret(nickName: string) {
        const sercet = speakeasy.generateSecret({ name: nickName });
        return sercet.base32;
    }

    async generate2FA(@Res() res, user: User) {
        const secret = this.generate2FASecret((await user).fullName);
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret,
            label: `transandance:${(await user).fullName}`,
            issuer: 'transandance'
        });

        try {
            const qrCodeDataURL = await qrcode.toDataURL(otpAuthUrl);
            const f2a = await this.prisma.user.update({
                where: { id: (await user).id },
                data: { f2A_Secret: secret }
            });
            return res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error);
            return res
                .status(500)
                .json({ message: 'Error generating QR code' });
        }
    }

    // generateTwoFAToken(secret) {
    //     return speakeasy.totp({
    //       secret,
    //       encoding: 'base32',
    //     });
    // }

    // async validateTwoFAToken(token, secret) {
    //     return (await speakeasy.totp.verify({
    //       secret,
    //       encoding: 'base32',
    //       token,
    //       window: 1,
    //   }));
    // }

    async validateTwoFAToken(token: string, secret: string): Promise<boolean> {
        const isValidToken = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1
        });
        return isValidToken;
    }

    async validateTwoFA(@Req() req, code, @Res() res) {
        console.log('code   ', code);
        const user = await this.prisma.user.findUnique({
            where: { id: req.user.sub }
        });
        if (!user) throw new NotFoundException(`User does not exist`);

        console.log(user.f2A_Secret);
        const isValidToken = await this.validateTwoFAToken(
            code,
            user.f2A_Secret
        );
        console.log('hda : ', isValidToken);
        if (isValidToken) {
            await this.prisma.user.update({
                where: { id: req.user.sub },
                data: { f2A: true }
            });

            return res
                .status(200)
                .json({ message: '2FA validation successful', user });
        } else {
            return res.status(401).json({ message: 'Invalid 2FA token' });
        }
    }

    async isItEnable(user: User) {
        if (user.f2A == true) return { message: '2FA enable' };
        return { message: '2FA is not enable' };
    }

    async disable2FA(user: User) {
        const update = await this.prisma.user.update({
            where: { id: user.id },
            data: { f2A: false }
        });
    }
}
