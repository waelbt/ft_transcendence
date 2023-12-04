import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@Injectable()
export class twoFAService{
    constructor(private prisma: PrismaOrmService){}
    async generate2FA(){
        
    }
}