import { Controller, Get, NotFoundException, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { twoFAService } from "../services/2FA.services";
import { UsersService } from "src/users/services/users.service";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';


@ApiTags('2fa')
@Controller('2fa')
export class twoFAController{
    constructor(private twoFAService: twoFAService,
        private userService: UsersService){}

    @Get('generate')
    async generate2FA(@Req() req, @Res() res){
        const user = this.userService.getOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        const secret = this.twoFAService.generate2FA((await user).fullName);
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret,
            label: `transandance:${(await user).fullName}`,
            issuer: 'transandance', 
        });
    
        try {
            const qrCodeDataURL = await qrcode.toDataURL(otpAuthUrl);
            return res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error);
            return res.status(500).json({ message: 'Error generating QR code' });
        }
    }
}