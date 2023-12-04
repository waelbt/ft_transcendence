import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import * as speakeasy from 'speakeasy';


@Injectable()
export class twoFAService{
    constructor(private prisma: PrismaOrmService){}
    async generate2FA(nickName: string){
        const sercet = speakeasy.generateSecret({name: nickName});
        return sercet.base32;
    }
    
}