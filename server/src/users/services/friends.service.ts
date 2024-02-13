import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
    forwardRef
} from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { UsersService } from './users.service';
import { BlockService } from './blocked.service';

@Injectable()
export class friendsService {
    constructor(
        private prisma: PrismaOrmService,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        private blockUser: BlockService
    ) {}

    async sendFriendRequest(userId1: string, userId2: string) {
        console.log('user1: ', userId1, 'user2: ', userId2);
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        //check if u already send friend request to this one
        const existRequest = await this.findFirstStatusPending(
            userId1,
            userId2
        );

        if (existRequest) {
            throw new NotFoundException('Friend request already sent'); //need to handle this because it causes 500
        }

        //create a new friendship request
        await this.prisma.friendship.create({
            data: {
                id: userId1 + userId2,
                userId1,
                userId2,
                status: 'pending',
                user: {
                    connect: {
                        id: userId1
                    }
                }
            }
        });
        //websocket();
    }
    async acceptFriendRequest(userId1: string, userId2: string) {
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: { userId1: userId2, userId2: userId1, status: 'pending' }
        });

        console.log('id1: ', userId2, 'id2: ', userId1);

        if (!friendship) {
            throw new NotFoundException('Friend request not found');
        }

        // update friendship status to accepted
        await this.prisma.friendship.update({
            where: { id: friendship.id },
            data: {
                status: 'accepted',
                user: {
                    connect: {
                        id: userId1
                    }
                }
            }
        });
    }

    async rejectFriendRequest(userId1: string, userId2: string) {
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        //find the friendship request
        // const friendship = await this.findFirstStatusPending(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: { userId1: userId2, userId2: userId1, status: 'pending' }
        });

        // console.log('wahd: ', userId1);
        // console.log('joj: ', userId2);
        // console.log('friends: ', friendship);
        if (!friendship) {
            throw new NotFoundException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id }
        });
    }

    async removeSentFriendRequest(userId1: string, userId2: string) {
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: { userId1, userId2, status: 'pending' }
        });

        if (!friendship) {
            throw new NotFoundException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id }
        });
    }

    async removeFriend(userId1: string, userId2: string) {
        //check for users if exists
        await this.checkUsersExistence(userId1, userId2);

        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId1, userId2, status: 'accepted' },
                    { userId1: userId2, userId2: userId1, status: 'accepted' }
                ]
            }
        });

        if (!friendship) {
            throw new ForbiddenException('Friend request not found');
        }

        //delete from friendship
        await this.prisma.friendship.delete({
            where: { id: friendship.id }
        });
    }
    async getNumberOfFriends(userId: string) {
        // Find all accepted friendships where the user is involved
        const friendship = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userId1: userId, status: 'accepted' },
                    { userId2: userId, status: 'accepted' }
                ]
            }
        });

        return friendship.length;
    }

    async listFriends(userId: string) {
        // //     //find all accepted friendships where the user is involved
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userId1: userId, status: 'accepted' },
                    { userId2: userId, status: 'accepted' }
                ]
            },
            include: {
                user: true
            }
        });

        // Extract and format friend details
        const friends = friendships
            .map((friendship) => {
                const friendUser =
                    friendship.userId1 === userId
                        ? friendship.user[1]
                        : friendship.user[0];
                const frienduser2 =
                    friendship.userId2 === userId
                        ? friendship.user[1]
                        : friendship.user[0];

                if (friendUser.id !== userId) {
                    const id = friendUser.id;
                    const avatar = friendUser.avatar;
                    const nickName = friendUser.nickName;
                    return {
                        id,
                        avatar,
                        nickName
                    };
                }
                const id = frienduser2.id;
                const avatar = frienduser2.avatar;
                const nickName = frienduser2.nickName;
                return {
                    id,
                    avatar,
                    nickName
                };
            })
            .filter((friend) => friend.id !== userId);

        return friends;
    }

    async userListFriends(viewerId: string, userId: string) {
        const myFriends = await this.getFriends(viewerId, userId);
        console.log('hna my friend : ', myFriends);

        const otherFriends = await this.getFriends(userId, viewerId);
        console.log('hna other friend : ', otherFriends);

        const friends = await this.filterFriends(myFriends, otherFriends);
        return myFriends;
    }

    async getFriends(userId: string, viewerId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { friends: true }
        });

        const userFriends = user.friends || [];

        console.log('user: ', user);
        return userFriends;
    }

    async filterFriends(myFriends: any, otherFriends: any) {
        const friends = await Promise.all(
            otherFriends.map(async (friendship) => {}).filter(Boolean)
        );

        return friends;

        // var Friends = await Promise.all(
        //     userFriends
        //         .map(async (friendship) => {
        //             // console.log('wahd: ', friendship.userId1, '\njoj: ', viewerId);
        //             // if (friendship.userId1 == viewerId || friendship.userId2 == viewerId) {
        //             //     console.log('im in');
        //             //     return ;
        //             // }
        //             console.log('check: ', friendship);
        //             console.log('viewerId: ', viewerId);
        //             console.log('userId: ', userId);
        //             var friendId;
        //             if (userId === friendship.userId1)
        //                 friendId = friendship.userId2;
        //             if (userId === friendship.userId2)
        //                 friendId = friendship.userId1;
        //             console.log('friendId : ', friendId);
        //             const isFriend = await this.areUsersFriends(
        //                 viewerId,
        //                 friendId
        //             );
        //             console.log('before');
        //             if (isFriend) {
        //                 console.log('hello');
        //                 const user = await this.prisma.user.findUnique({
        //                     where: { id: friendId }
        //                 });
        //                 const id = user.id;
        //                 const nickName = user.nickName;
        //                 const avatar = user.avatar;
        //                 return {
        //                     id,
        //                     nickName,
        //                     avatar,
        //                     action: isFriend ? 'Send Message' : 'Add Friend'
        //                 };
        //             }
        //         })
        //         .filter(Boolean)
        // );
        // return Friends;
    }

    async areUsersFriends(userId1: string, userId2: string): Promise<boolean> {
        console.log('id1: ', userId1);
        console.log('id2: ', userId2);
        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId1, userId2, status: 'accepted' },
                    { userId1: userId2, userId2: userId1, status: 'accepted' }
                ]
            }
        });

        console.log('3alam : ', friendship);
        return !!friendship;
    }

    async typeOfProfile(userId1: string, userId2: string) {
        await this.checkUsersExistence(userId1, userId2);
        const block = await this.blockUser.isUserBlocked(userId1, userId2);
        if (block) return { message: 'blocked' };
        const friends = await this.areUsersFriends(userId1, userId2);
        if (friends) return { message: 'friend' };
        const pending = await this.isUserPending(userId1, userId2);
        if (pending) return { message: 'invitation sender' };
        const acceptORreject = await this.isUserNeedToAcceptOrReject(
            userId1,
            userId2
        );
        if (acceptORreject) return { message: 'invitation receiver' };
        return { message: 'not friend' };
        // this.listFriends()
        // return user;
    }

    async isUserPending(userId1: string, userId2: string) {
        return await this.prisma.friendship.findFirst({
            where: { userId1, userId2, status: 'pending' }
        });
    }

    async isUserNeedToAcceptOrReject(userId1: string, userId2: string) {
        return await this.prisma.friendship.findFirst({
            where: { userId1: userId2, userId2: userId1, status: 'pending' }
        });
    }

    async findFirstStatusPending(userId1: string, userId2: string) {
        return await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId1, userId2, status: 'pending' },
                    { userId1: userId2, userId2: userId1, status: 'pending' }
                ]
            }
        });
    }

    async checkUsersExistence(userId1: string, userId2: string) {
        const user1 = await this.userService.getOneUser(userId1);
        const user2 = await this.userService.getOneUser(userId2);

        if (!user1 || !user2) {
            throw new NotFoundException('User not found');
        }
    }
}
