import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthDto, AuthDtoSignIn } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
    constructor (private PrismaOrmService:PrismaOrmService,
        private jwt:JwtService,
        private config: ConfigService) {}

    async signUp(AuthDto: AuthDto) {
        //genrate the password hash
        console.log("in in signIn");
        console.log(AuthDto.password);
        const hash = await argon.hash(AuthDto.password);
        //save the new user in the db
        try{
            const user = await this.PrismaOrmService.user.create({
                data: {
                    fullName: AuthDto.fullName,
                    email: AuthDto.email,
                    HashPassword: hash,
                },
            });
            //we need to return a token.
            return this.signToken(user.id, user.email);
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            console.log(error);
            throw error;
        }
    }

    async signIn(AuthDtoSignIn: AuthDtoSignIn) {
        console.log("in in logIn");
        //find the user by email in db
        const user = await this.PrismaOrmService.user.findUnique({
            where: {
                email: AuthDtoSignIn.email,
            },
        });
        //if user does not exist throw exception
        if (!user) throw new ForbiddenException ('Credentials incorrect');
        //compare passwords
        const PasswordMatches = await argon.verify(user.HashPassword, AuthDtoSignIn.password);
        //if (password invalid) we throw exception
        if (!PasswordMatches) throw new ForbiddenException ('Credentials incorrect');
        //we need to return a token.
        return this.signToken(user.id, user.email);
    }

    // getUser(){
    //     return (this.PrismaOrmService.user.findMany({select: { email: true, FullName: true, id: true}}));
    // }

    //function that gives each user a jwt
    async signToken(userId: number, email: string): Promise<{access_token}> {
        const payload = {
            sub: userId,//use a unique identifier for a sub field
            email,
        };
        const secret = this.config.get('JWT_secret');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m', 
                secret: secret,
            },
        );
        return {
            access_token: token,
        };
    }
}

//search about refresh token