import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignIn } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { refreshTokenGuard } from "src/common/guards";
import { Public, getCurrentUser, getCurrentUserId } from "src/common/decorators";
import { Request } from "express";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Get()
    Hi(@Req() req: Request){
        console.log(req.cookies);
    }



    // @Get('google/redirect')


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