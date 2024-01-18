import { Controller, Get, NotFoundException, Req, Res, Body, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { twoFAService } from "../services/2FA.services";
import { UsersService } from "src/users/services/users.service";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('2fa')
@Controller('2fa')
export class twoFAController{
    constructor(private twoFAService: twoFAService,
        private userService: UsersService){}

    @Get('generate')
    async generate2FA(@Req() req, @Res() res){
        const user = await this.userService.getOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        // if (user.F2A) {
        //     return res.status(400).json({ message: '2FA already enabled!' });
        // }
        await this.twoFAService.generate2FA(res, user);
    }

    @Post('enable')
    async enableTwoFA(@Body() body, @Req() req, @Res() res){
        const user = await this.userService.getOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        // if (user.F2A) {
        //     return res.status(400).json({ message: '2FA already enabled!' });
        // }
        const token = body;
        const isValidToken = await this.twoFAService.validateTwoFAToken(token, user.f2A_Secret);
        if (!isValidToken) {
            return res.status(401).json({ message: 'Invalid 2FA token' });
        }
        return res.status(200).json({ message: '2FA enabled successfully'});
    }

    @Get('isEnable')
    async isItEnable(@Req() req){
        const user = await this.userService.getOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        return this.twoFAService.isItEnable(user);
    }

    @Post('disable')
    async disable2FA(@Req() req){
        const user = await this.userService.getOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        await this.twoFAService.disable2FA(user);
    }
}