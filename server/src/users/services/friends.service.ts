import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { UsersService } from "./users.service";

@Injectable()
export class friendsService {
    constructor(private prisma: PrismaOrmService,
        private userService: UsersService) {}

    async sendFriendRequest(userId1: string, userId2: string){
        console.log('user1: ', userId1, 'user2: ', userId2);
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        //check if u already send friend request to this one
        const existRequest = await this.findFirstStatusPending(userId1, userId2);

        if (existRequest){
            throw new Error('Friend request already sent');//need to handle this because it causes 500
        }

        //create a new friendship request
        await this.prisma.friendship.create({
            data:{
                id: userId1+userId2,
                userId1,
                userId2,
                status: 'pending',
                user: {
                    connect: {
                        id: userId1,
                    },
                },
            },
        });
        //websocket();
    }
    async acceptFriendRequest(userId1: string, userId2: string){
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        //find The friendship Request
        const friendship = await this.findFirstStatusPending(userId1, userId2);

        if (!friendship){
            throw new NotFoundException('Friend request not found');
        }

        // update friendship status to accepted
        await this.prisma.friendship.update({
            where: { id: friendship.id },
            data: { 
                status: 'accepted' ,
                user: {
                    connect: {
                        id: userId1,
                    },
                },
            },
        });
    }

    async rejectFriendRequest(userId1: string, userId2: string){
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        //find the friendship request
        const friendship = await this.findFirstStatusPending(userId1, userId2);
    
        if (!friendship){
            throw new NotFoundException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id },
        }); 
    }

    async removeSentFriendRequest(userId1: string, userId2: string){
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: {userId1, userId2, status: 'pending'},
        });

        if (!friendship){
            throw new NotFoundException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id },
        });
    }

    async removeFriend(userId1: string, userId2: string){
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    {userId1, userId2, status: 'accepted'},
                    {userId1: userId2, userId2: userId1, status: 'accepted'},
                ],
            }
        });

        if (!friendship){
            throw new NotFoundException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id },
        });
    }
    async getNumberOfFriends(userId: string){
        // Find all accepted friendships where the user is involved
        const friendship = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    {userId1: userId, status: 'accepted'},
                    {userId2: userId, status: 'accepted'},
                ],
            },
        });

        return friendship.length;
    }

    async listFriends(userId: string){
    // //     //find all accepted friendships where the user is involved
    const friendships = await this.prisma.friendship.findMany({
        where: {
          OR: [
            { userId1: userId, status: 'accepted' },
            { userId2: userId, status: 'accepted' },
          ],
        },
        include: {
          user: true,
        },
      });
  
      // Extract and format friend details
      const friends = friendships.map((friendship) => {
        const friendUser = friendship.userId1 === userId ? friendship.user[1] : friendship.user[0];
        const frienduser2 =  friendship.userId2 === userId ? friendship.user[1] : friendship.user[0];
        if (friendUser.id !== userId)
            return friendUser;
        return frienduser2;
      }).filter(friend => friend.id !== userId);
      
      return friends;
    }


    async userListFriends(viewerId: string, userId: string): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          include: { friends: true },
        });
    
        const userFriends = user.friends || [];
    
        var friendListWithAction = await Promise.all(
          userFriends.map(async (friendship) => {
            if (friendship.userId1 == viewerId)
            {
                console.log('im in');
                return null;
            }
            const friendId = friendship.userId1 === userId ? friendship.userId2 : friendship.userId1;

            const isFriend = await this.areUsersFriends(viewerId, friendId);
    
            const user = await this.prisma.user.findUnique({
                where: { id: friendId },
              });

            return {
              user,
              action: isFriend ? 'Send Message' : 'Add Friend',
            };
          }).filter(Boolean),
        );
        return friendListWithAction;
      }
    
      private async areUsersFriends(userId1: string, userId2: string): Promise<boolean> {
        const friendship = await this.prisma.friendship.findFirst({
          where: {
            OR: [
              { userId1, userId2, status: 'accepted' },
              { userId1: userId2, userId2: userId1, status: 'accepted' },
            ],
          },
        });
    
        return !!friendship;
      }

    async findFirstStatusPending(userId1: string, userId2: string){
        return (await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    {userId1, userId2, status: 'pending'},
                    {userId1: userId2, userId2: userId1, status: 'pending'},
                ],
            },
        }));
    }

    async checkUsersExistence(userId1: string, userId2: string){
        const user1 = await this.userService.getOneUser(userId1);
        const user2 = await this.userService.getOneUser(userId2);

        if (!user1 || !user2) {
            throw new NotFoundException('User not found');
        }
    }
}