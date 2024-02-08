import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { UsersService } from './users.service';

@Injectable()
export class BlockService {
    constructor(private prisma: PrismaOrmService){}
    async blockUser(userId: string, blockedUserId: string){
        const block = await this.prisma.block.findFirst({
            where: { 
                  OR: [
                      { userId: userId , blockedUserId: blockedUserId },
                      { userId: blockedUserId , blockedUserId: userId },
                  ],
              },
        });
        
        if (!block){
            await this.prisma.block.create({
                data: {
                    userId,
                    blockedUserId,
                  },
            });
        }

    }

    async unblockUser(userId: string, blockedUserId: string): Promise<void> {
        await this.prisma.block.deleteMany({
          where: { userId: userId },
        });
    }

    async isUserBlocked(
        userId: string,
        blockedUserId: string
    ): Promise<boolean> {
        const block = await this.prisma.block.findFirst({
            where: {
                OR: [
                    { userId: userId , blockedUserId: blockedUserId },
                    { userId: blockedUserId , blockedUserId: userId },
                ],
            },
        });
        console.log('block: ', !!block);
        return !!block;
    }

    async listOfBlockedUsers(userId: string) {
        console.log('id: ', userId);
        const listBlocked = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { blockedUsers: true }
        });
        const blockedUsers = await Promise.all(
            listBlocked.blockedUsers.map(async (user) => {
                const blockedUser = await this.prisma.user.findUnique({
                    where: { id: user.blockedUserId }
                });
                const id = blockedUser.id;
                const name = blockedUser.fullName;
                const avatar = blockedUser.avatar;
                // console.log('ana hna : ', blockedUser);
                return {
                    id,
                    name,
                    avatar
                };
            })
        );
        return blockedUsers;
    }
}
