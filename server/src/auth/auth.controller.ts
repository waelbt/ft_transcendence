import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        console.log(dto);
        return this.AuthService.signUp(dto);
    }

    // @Get()
    // getUser() {
    //     return this.AuthService.getUser();
    // }

    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this.AuthService.signIn(dto);
    }
}