import { Controller, Get, NotFoundException, Req, Res, Body, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { twoFAService } from "../services/2FA.services";
import { UsersService } from "src/users/services/users.service";

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
        return (await this.twoFAService.generate2FA(res, user));
        // return res.status(200).json({message: await this.twoFAService.generate2FA(res, user)});
    }

    // @Post('enable')
    // @ApiBody({ 
    //     schema: {
    //       type: 'object',
    //       properties: {
    //         Code: {
    //           type: 'string',
    //         },
    //       },
    //     },
    // })
    // async enableTwoFA(@Body("Code") code, @Req() req, @Res() res){
		// return (await this.twoFAService.validateTwoFA(req, code, res));
    // }

    @Post('validate')
    @ApiBody({ 
        schema: {
          type: 'object',
          properties: {
            Code: {
              type: 'string',
            },
          },
        },
    })
    async validateTwoFA(@Body("Code") Code, @Req() req, @Res() res) {
        return (await this.twoFAService.validateTwoFA(req, Code, res));
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