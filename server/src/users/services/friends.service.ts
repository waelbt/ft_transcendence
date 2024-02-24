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
import { notificationGateway } from '../notification/notification.gateway';

@Injectable()
export class friendsService {
    constructor(
        private prisma: PrismaOrmService,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        private blockUser: BlockService,
        private notificationGateway: notificationGateway,
    ) {}

    async sendFriendRequest(userMe: string, friendId: string) {
        console.log('user1: ', userMe, 'user2: ', friendId);
        //check for users if exists
        await this.checkUsersExistence(userMe, friendId);

        //check if u already send friend request to this one
        const existRequest = await this.findFirstStatusPending(
            userMe,
            friendId
        );

        if (existRequest) {
            throw new NotFoundException('Friend request already sent'); //need to handle this because it causes 500
        }

        //create a new friendship request
        await this.prisma.friendship.create({
            data: {
                id: userMe + friendId,
                userId1: userMe,
                userId2: friendId,
                status: 'pending',
                user: {
                    connect: {
                        id: userMe
                    }
                }
            }
        });
        //websocket();
        const receiver = await this.getNickNameEmail(friendId);
        const sender = await this.getNickNameEmail(userMe);
        console.log('--------------- sender: ', sender);
        console.log('--------------- reciever: ', receiver);
        await this.notificationGateway.notificationEvent(receiver, sender, userMe, 'send invitaion');
    }

    async acceptFriendRequest(userMe: string, friendId: string) {
        //check for users if exists
        await this.checkUsersExistence(userMe, friendId);

        const friendship = await this.prisma.friendship.findFirst({
            where: { userId1: friendId, userId2: userMe, status: 'pending' }
        });

        console.log('id1: ', friendId, 'id2: ', userMe);

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
                        id: userMe
                    }
                }
            }
        });

        //websocket();
        const receiver = await this.getNickNameEmail(friendId);
        const sender = await this.getNickNameEmail(userMe)
        await this.notificationGateway.notificationEvent(receiver, sender, userMe, 'accept invitaion');
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
        const friends = friendships.map((friendship) => {
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
                const status = friendUser.status;
                return {
                    id,
                    avatar,
                    nickName,
                    status
                };
            }
            const id = frienduser2.id;
            const avatar = frienduser2.avatar;
            const nickName = frienduser2.nickName;
            const status = frienduser2.status;
            return {
                id,
                avatar,
                nickName,
                status
            };
        });
        console.log('friends: ', friends);
        return friends;
    }

    async userListFriends(viewerId: string, userId: string) {
        const myFriends = await this.getFriends(userId, viewerId);
        console.log('hna my friend : ', myFriends);

        const otherFriends = await this.getFriends(viewerId, userId);
        console.log('hna other friend : ', otherFriends);

        const friends = await this.filterFriends(
            myFriends,
            otherFriends,
            viewerId,
            userId
        );
        console.log('his friends: ', friends);
        return friends;
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

    // async filterFriends(myFriends: any,
    //     otherFriends: any, viewerId: string, userId: string): Promise<string> {
    //     const mutualFriends: string[] = [];
    //     const potentialFriends: string[] = [];

    //     // Iterate through otherFriends
    //     const friends = otherFriends.forEach(async friend => {
    //         var friendId;

    //         if (myFriends.includes(friend)) {
    //             if (userId === friend.userId1)
    //                 friendId = friend.userId2;
    //             if (userId === friend.userId2)
    //                 friendId = friend.userId1;
    //             console.log('data: ', friend);
    //             // console.log('viewerId: ', viewerId);
    //             // console.log('userId: ', userId);
    //             console.log('friendId : ', friendId);
    //             const user = await this.prisma.user.findUnique({
    //                 where: { id: friendId }
    //             });
    //             const id = user.id;
    //             const nickName = user.nickName;
    //             const avatar = user.avatar;
    //             mutualFriends.push(friend); // Friend is in both lists
    //             return {
    //                 id,
    //                 nickName,
    //                 avatar,
    //                 action: 'Send Message'
    //             };
    //         } else {
    //             if (viewerId === friend.userId1)
    //                 friendId = friend.userId2;
    //             if (viewerId === friend.userId2)
    //                 friendId = friend.userId1;
    //             console.log('data: ', friend);
    //             // console.log('viewerId: ', viewerId);
    //             // console.log('userId: ', userId);
    //             console.log('friendId : ', friendId);
    //             const user = await this.prisma.user.findUnique({
    //                 where: { id: friendId }
    //             });
    //             console.log('ana: ', user);
    //             const id = user.id;
    //             const nickName = user.nickName;
    //             const avatar = user.avatar;
    //             potentialFriends.push(friend); // Friend is only in otherFriends
    //             return {
    //                 id,
    //                 nickName,
    //                 avatar,
    //                 action:'Add Friend'
    //             };
    //         }
    //     });

    //     console.log('mutualFriends: ', mutualFriends);
    //     console.log('potentialFriends: ', potentialFriends);
    //     console.log('helo : ', friends);
    //     return friends;
    //     // // Check if there are mutual friends
    //     // if (mutualFriends.length > 0) {
    //     //     return "You are already friends with some users.";
    //     // } else {
    //     //     return "Add these users as friends.";
    //     // }
    // }

    async filterFriends(
        myFriends: any[],
        otherFriends: any[],
        viewerId: string,
        userId: string
    ): Promise<any[]> {
        const mutualFriendsPromises: Promise<any>[] = [];
        const potentialFriendsPromises: Promise<any>[] = [];

        otherFriends.forEach(async (friend) => {
            var friendId;
            if (viewerId === friend.userId1) friendId = friend.userId2;
            if (viewerId === friend.userId2) friendId = friend.userId1;

            if (
                myFriends.some(
                    (friend) =>
                        friend.userId1 === friendId ||
                        friend.userId2 === friendId
                )
            ) {
                console.log('=====================================');

                // if (userId === friendId) return;
                const promise = this.prisma.user
                    .findUnique({
                        where: { id: friendId }
                    })
                    .then((user) => {
                        const id = user.id;
                        const nickName = user.nickName;
                        const avatar = user.avatar;
                        return {
                            id,
                            nickName,
                            avatar,
                            action: 'Send Message'
                        };
                    });
                mutualFriendsPromises.push(promise);
            } else {
                if (userId === friendId) return;
                const promise = this.prisma.user
                    .findUnique({
                        where: { id: friendId }
                    })
                    .then((user) => {
                        const id = user.id;
                        const nickName = user.nickName;
                        const avatar = user.avatar;
                        return {
                            id,
                            nickName,
                            avatar,
                            action: 'Add Friend'
                        };
                    });
                potentialFriendsPromises.push(promise);
            }
        });

        const mutualFriends = await Promise.all(mutualFriendsPromises);
        const potentialFriends = await Promise.all(potentialFriendsPromises);

        console.log('mutualFriends: ', mutualFriends);
        console.log('potentialFriends: ', potentialFriends);

        return mutualFriends.concat(potentialFriends);
    }

    // async filterFriends(myFriends: any, otherFriends: any) {
    //     const friends = await Promise.all(
    //         otherFriends.map(async (friendship) => {}).filter(Boolean)
    //     );

    //     return friends;

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
    // }

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

    async getNickNameEmail(userId: string){
        const friend = await this.userService.getOneUser(userId);
        const data = {
            email: friend.email,
            nickName: friend.nickName,
            avatar: friend.avatar,
        };
        return data;
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
