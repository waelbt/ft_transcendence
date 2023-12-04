import { Injectable } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { UsersService } from "./users.service";

@Injectable()
export class BlockService {
    constructor(private prisma: PrismaOrmService,
        private userService: UsersService){}
    async blockUser(userId: string, blockedUserId: string){
        await this.prisma.block.create({
            data: {
                id: userId + blockedUserId,
                userId,
                blockedUserId,
              },
        });
    }

    async unblockUser(userId: string, blockedUserId: string): Promise<void> {
        await this.prisma.block.deleteMany({
          where: { id: userId + blockedUserId },
        });
    }

    async isUserBlocked(userId: string, blockedUserId: string): Promise<boolean> {
        const block = await this.prisma.block.findFirst({
          where: { 
                OR: [
                    {id: userId + blockedUserId },
                    {id: blockedUserId + userId},
                ],
            },
        });
        return !!block;
    }

    async listOfBlockedUsers(userId: string){
        const listBlocked = await this.prisma.user.findUnique({
            where: {id: userId},
            include: {blockedUsers: true,},
        });
        const blockedUsers = await Promise.all (
            listBlocked.blockedUsers.map(async (user)=> {
            const blockedUser = await this.prisma.user.findUnique({where: {id: user.blockedUserId}});
            // console.log('ana hna : ', blockedUser);
            return blockedUser;
        }),
        );
        return blockedUsers;
    }
}