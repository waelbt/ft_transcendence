import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthDtoSignIn } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Post('signup')
    signUp(@Body() AuthDto: AuthDto) {
        console.log(AuthDto);
        return this.AuthService.signUp(AuthDto);
    }

    // @Get()
    // getUser() {
    //     return this.AuthService.getUser();
    // }

    @Post('signin')
    signIn(@Body() AuthDtoSignIn: AuthDtoSignIn) {
        return this.AuthService.signIn(AuthDtoSignIn);
    }
}