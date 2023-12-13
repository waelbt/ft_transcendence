import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Middlware implements NestMiddleware {
    constructor(private readonly jwt: JwtService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('zbiiiiii');
        const accessToken = req.cookies['accessToken'];

        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const user = await this.jwt.verify(accessToken);
            console.log(`here check \n ${accessToken}`);
            req.user = user;
            console.log('user is: ',req.user);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}