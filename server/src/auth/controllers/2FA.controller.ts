import { Controller, Get, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { twoFAService } from "../services/2FA.services";

@ApiTags('2fa')
@Controller('2fa')
export class twoFAController{
    constructor(private twoFAService: twoFAService){}

    @Get('generate')
    async generate2FA(@Req() req, @Res() res){
        const secret = this.twoFAService.generate2FA();
    }
}