import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class Middlware implements NestMiddleware {
    constructor(private readonly jwt: JwtService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.cookies['accessToken']; // Assuming the cookie name is 'access_token'

        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const user = await this.jwt.verify(accessToken);
            req.user = user; // Attach the user object to the request for future use
            console.log('user is: ',req.user);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}