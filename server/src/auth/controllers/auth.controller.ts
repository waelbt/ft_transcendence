import {  Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "src/users/services/users.service";
import { jwtGuard } from "../authGuard";


@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService,
        private usersService: UsersService) {}
    
    @Get('google')
    @Public()
    @UseGuards(AuthGuard('google'))
    google(){}

    @Get('/google/callback')
    @Public()
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req, @Res() res){
        // console.log('im in callback google');
        await this.AuthService.setUpTokens(req, res, req.user.id);
    }

    @Get('42')
    @Public()
    @UseGuards(AuthGuard('42'))
    Intra(){}

    @Get('/intra/callback')
    @Public()
    @UseGuards(AuthGuard('42'))
    async intraLogin(@Req() req, @Res() res){
        // console.log('im in callback 42');
        // console.log('logId : ', req.user.id);
        await this.AuthService.setUpTokens(req, res, req.user.id);
    }

    @Get('checkAuth')
    @Public()
    async checkCookie(@Req() req): Promise<boolean>{
        const accessToken = req.cookies['accessToken'];
        if (!accessToken)
            return false
        return true;
    }

    @Public()
    @UseGuards(jwtGuard)
    @Get('refresh')
    async refreshToken(@Req() req, @Res() res){
        // console.log('im in refresh');
        res.send(await this.AuthService.refreshToken(req, res));
    }

    @Get('logout')
    async logout(@Res() res){
        this.AuthService.logout(res);
    }

    // @Get('ana')
    // ana(@Res() res){
    //     console.log('ssssss');
    //     res.send('ok');
    // }
    // @Public()
    // @Post('signup')
    // signUp(@Body() AuthDto: AuthDto) {
    //     console.log(AuthDto);
    //     return this.AuthService.signUp(AuthDto);
    // }

    // @Public()
    // @Post('signin')
    // @HttpCode(HttpStatus.OK)
    // signIn(@Body() AuthDtoSignIn: AuthDtoSignIn) {
    //     return this.AuthService.signIn(AuthDtoSignIn);
    // }

    // @Public()
    // @UseGuards(refreshTokenGuard)
    // @Post('refresh')
    // @HttpCode(HttpStatus.OK)
    // refreshToken(@getCurrentUserId() userId: number ,@getCurrentUser('refreshToken') refreshToken: string){
    //     return this.AuthService.refreshTokens(userId, refreshToken);
    // }

    // @Get('logout')
    // @HttpCode(HttpStatus.OK)
    // logout(@getCurrentUserId() userId: number) {
    //     this.AuthService.logout(userId);
    //   }
}