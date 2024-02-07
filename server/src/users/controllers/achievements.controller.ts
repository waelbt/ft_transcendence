import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "../services/users.service";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@ApiTags('achievement')
@Controller('achievement')
export class achievementController{
    constructor(private readonly usersService: UsersService,
        private prisma: PrismaOrmService) {}
    
    
}