import { ForbiddenException, Injectable, Req, Res, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthDto, AuthDtoSignIn } from "../dto";
import * as argon from 'argon2';
import { UsersService } from "src/users/services/users.service";
import { User } from "@prisma/client";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import * as otplib from 'otplib';
import * as qrcodeLib from 'qrcode';


@Injectable({})
export class AuthService {
    constructor (private PrismaOrmService:PrismaOrmService,
        private jwt:JwtService,
        private config: ConfigService,
        private usersService: UsersService) {}

        async setUpTokens(@Req() req, @Res() res, id: string){
            console.log('here = ', req.user);
            console.log(req.user.userId);
            var isUser = await this.usersService.findOneUser(id);
            if (!isUser)
            {
                console.log('im in create user');
                await this.usersService.createUser(req.user, id);
            }
            await this.generateATRT(res, req.user);
            if (isUser)
                res.redirect('http://localhost:8000/auth/ana'); // home
            else
                res.redirect('http://localhost:8000/auth/ana'); //profile
        }

        async refreshToken(@Req() req, @Res() res){
            const foundUser = await this.matchRefreshToken(req);
            const user = await this.usersService.getOneUser(foundUser.id);
            console.log(user.email);
            await this.generateATRT(res, user);
        }

        logout(@Res() res){
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.redirect('/auth/google');
        }

        async matchRefreshToken(@Req() req){
            const refreshToken = req.cookies['refreshToken'];
            try{
                const payload = await this.jwt.verify(refreshToken, this.config.get('JWT_secret'));
                return payload;
            }
            catch(err){
                throw new UnauthorizedException('No Valid Token');
            }
        }

        async generateATRT(@Res() res, user: User){
            const [access_token, refreshToken] = await Promise.all([
                this.jwt.signAsync(
                 {
                    sub: user.id,
                    email: user.email,
                 },
                 {
                    secret: this.config.get('JWT_secret'),
                    expiresIn: '1d',
                 },
                ),
                this.jwt.sign(
                 {
                    sub: user.id,
                    email: user.email,
                 },
                 {
                    secret: this.config.get('JWT_secret'),
                    expiresIn: '7d',
                 },
                ),
            ]);
            res.cookie('accessToken', access_token, { httpOnly: true, secure : true});
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure : true});
        }

        // async generate2FA(@Req() req){
        //     const user = this.usersService.getOneUser(req.user.sub);
        //     console.log('id: ', (await user).id);
        //     const secret = otplib.authenticator.generateSecret();
        //     const otpAuthenticator = otplib.authenticator.keyuri((await user).nickName, "sooooo", secret);
        //     const f2a = await this.PrismaOrmService.user.update({
        //         where: {id: (await user).id},
        //         data: {F2A_Secret: secret},
        //     });
        //     const qrcode = await qrcodeLib.toDataURL(otpAuthenticator);
        //     return qrcode;
        //     // const secret = speakeasy.generateSecret({length: 20});
        //     // const uri = await qrcode.toDataURL(secret.otpauth_url);
        //     // console.log("secret: \n", secret);
        //     // return ({
        //     //     secret: secret.base32,
        //     //     uri: uri,
        //     // })
        // }
}
/*
   async signUp(AuthDto: AuthDto) {
        //genrate the password hash
        const hash = await this.hashData(AuthDto.password);
        //save the new user in the db
        try{
            const user = await this.PrismaOrmService.user.create({
                data: {
                    fullName: AuthDto.fullName,
                    email: AuthDto.email,
                    HashPassword: hash,
                    hashRefreshToken: '',
                },
            });
            //we need to return a token.
            const token = await this.getTokens(user.id, user.email);
            await this.updateRefrshToken(user.id, user.hashRefreshToken);
            return token;
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
        const token = await this.getTokens(user.id, user.email);
        await this.updateRefrshToken(user.id, user.hashRefreshToken);
        return token;
    }

    hashData(data: string) {
        return argon.hash(data);
    }
    // getUser(){
    //     return (this.PrismaOrmService.user.findMany({select: { email: true, FullName: true, id: true}}));
    // }

    //function that gives each user a jwt
    async getTokens(userId: number, email: string): Promise<{access_token, refreshToken}> {
        const [access_token, refreshToken] = await Promise.all([
           this.jwt.signAsync(
            {
                sub: userId,
                email,
            },
            {
                secret: this.config.get('JWT_secret'),
                expiresIn: '15m',
            },
           ),
           this.jwt.signAsync(
            {
                sub: userId,
                email,
            },
            {
                secret: this.config.get('R_JWT_secret'),
                expiresIn: '7d',
            },
           ),
        ]);
        return {
            access_token,
            refreshToken,
        }
    }
    async  updateRefrshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.PrismaOrmService.user.update({
            where: {
                id: userId,
            },
            data: {
                hashRefreshToken: hashedRefreshToken,
            },
        });
    }
    async logout(userId: number){
        await this.PrismaOrmService.user.updateMany({
            where: {
                id: userId,
                hashRefreshToken: {
                    not: null,
                },
            },
            data: {
                hashRefreshToken: null,
            },

        })
    }
    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.PrismaOrmService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashRefreshToken) throw new ForbiddenException("Access Denied");
        const refreshTokenMatch = await argon.verify(refreshToken, user.hashRefreshToken);
        if (!refreshTokenMatch) throw new ForbiddenException("Access Denied");
        const token = await this.getTokens(user.id, user.email);
        await this.updateRefrshToken(user.id, user.hashRefreshToken);
        return token;
    }
*/
//search about refresh token