import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtGuard } from "src/auth/guard";

@ApiTags('users')
@Controller('users')
export class UserController {
    
    @UseGuards(JwtGuard)
    @Get ('/me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}