import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignIn } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { refreshTokenGuard } from "src/common/guards";
import { Public, getCurrentUser, getCurrentUserId } from "src/common/decorators";
import { Request } from "express";
import { JwtStrategy } from "./strategy";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Get('google')
    @Public()
    google(){}

    @Get('/google/callback')
    @Public()
    async googleLogin(@Req() req, @Res() res){
        this.AuthService.setUpTokens(req, res);
    }

    @Get('42')
    @Public()
    Intra(){}

    @Get('intra/callback')
    @Public()
    async intraLogin(@Req() req, @Res() res){
        this.AuthService.setUpTokens(req, res);
    }

    @Get('refresh')
    async refreshToken(@Req() req, @Res() res){
        this.refreshToken(req, res);
    }

    @Get('logout')
    async logout(@Res() res){
        this.AuthService.logout(res);
    }
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