import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
    constructor (private PrismaOrmService:PrismaOrmService, 
        private jwt:JwtService,
        private config: ConfigService) {}

    async signUp(dto: AuthDto) {
        console.log('in signup');
        console.log(dto);
        //genrate the password hash
        console.log(dto.password);
        const hash = await argon.hash(dto.password);
        console.log('argon');
        //save the new user in the db
        try{
            console.log('try')
            const user = await this.PrismaOrmService.user.create({
                data: {
                    email: dto.email,
                    HashPassword: hash,
                    FullName: dto.FullName,
                },
            });
            //we need to return a token.
            console.log('in return ');
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

    async signIn(dto: AuthDto) {
        //find the user by email in db
        const user = await this.PrismaOrmService.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        //if user does not exist throw exception
        if (!user) throw new ForbiddenException ('Credentials incorrect');
        //compare passwords
        const PasswordMatches = await argon.verify(user.HashPassword, dto.password);
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
        console.log('im in')
        const secret = this.config.get('JWT_secret');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m', 
                secret: secret,
            },
        );
        console.log(token);
        return {
            access_token: token,
        };
    }
}

//search about refresh token