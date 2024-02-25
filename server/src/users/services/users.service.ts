import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
    Req,
    forwardRef
} from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { Prisma, User } from '@prisma/client';
import * as fs from 'fs';
import { friendsService } from './friends.service';
import { BlockService } from './blocked.service';
import { match_history } from '../dto/matchHistory.dto';
import { mydata } from '../dto/mydata.dto';

export interface Player {
    avatar: string;
    name: string;
    rating: number;
}

interface score {
    score1: number;
    score2: number;
}

interface onlineUser {
    id: string;
    avatar: string;
}

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaOrmService,
        @Inject(forwardRef(() => friendsService))
        private friendService: friendsService,
        private blockUsers: BlockService
    ) {}

    // const prisma = new PrismaClient();

    async createUser(user: any, id: string) {
        const User = await this.prisma.user.create({
            data: {
                id: id,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar,
                nickName: user.nickName
            }
        });
        const achievement = await this.prisma.achievement.create({
            data: {
                UserId: User.id
            }
        });
    }

    async findAllUser() {
        return await this.prisma.user.findMany();
    }

    async findOneUser(id: string) {
        // console.log('that a user ; ', id);
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user ? true : false;
    }

    async saveUser(user: User): Promise<User> {
        return await this.prisma.user.update({
            where: { id: user.id },
            data: user
        });
    }

    async getOneUser(id: string) {
        // console.log('userId: ', id);
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async updateAvatar(id: string, avatar: string) {
        const Avatar = await this.prisma.user.update({
            where: { id: id },
            data: {
                avatar: avatar
            }
        });
    }

    async updateNickName(id: string, name: string) {
        try {
            const nickName = await this.prisma.user.update({
                where: { id: id },
                data: {
                    nickName: name
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Nickname is already in use.');
            }
            throw error;
        }
    }

    async updateUser(id: string, user: User) {
        return await this.prisma.user.update({
            where: { id },
            data: user
        });
    }

    async removeUser(id: string) {
        const ana = await this.prisma.user.findUnique({
            where: { id }
        });

        // console.log('user data : ', ana);
        // console.log('id : ', id);

        await this.prisma.achievement.delete({
            where: { UserId: id }
        });

        await this.prisma.block.deleteMany({
            where: {
                OR: [{ userId: id }, { blockedUserId: id }]
            }
        });

        await this.prisma.game.deleteMany({
            where: {
                OR: [{ player1Id: id }, { player2Id: id }]
            }
        });

        await this.prisma.user.delete({
            where: { id }
        });
    }

    async uploadAvatar(file: Express.Multer.File, @Req() req): Promise<any> {
        const user = await this.findOneUser(req.user.sub);
        if (!user) throw new NotFoundException(`User does not exist`);

        // console.log('localhost:4000/upload/' + file.filename);
        const filename = 'http://localhost:4000/upload/' + file.filename;
        return filename;
        // return (file.path);
    }

    async deleteImage(path: string) {
        const url = 'http://localhost:4000/upload/';

        if (path.includes(url)) {
            const splitedStrings = path.split(url);
            var file =
                process.env.UPLOADS_DESTINATION + '/' + splitedStrings[1];
        } else {
            // console.log('path: ', path);
            return 'this is default it can not be deleted';
        }
        try {
            await this.deleteFile(file);
            return 'File deleted successfully';
        } catch (error) {
            return `Error deleting file: ${error.message}`;
        }
    }

    deleteFile(filePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async searchBar(keyword: string) {
        const users = await this.prisma.user.findMany({
            where: {
                nickName: { contains: keyword, mode: 'insensitive' }
            }
        });
        // const result = await this.prisma.user.findMany({
        //     where: {
        //       body: {
        //         search: 'cat | dog',
        //       },
        //     },
        //   })
        const data = await Promise.all(
            users.map(async (user) => {
                const id = user.id;
                const nickName = user.nickName;
                const avatar = user.avatar;
                const fullName = user.fullName;
                return {
                    id,
                    nickName,
                    avatar,
                    fullName
                };
            })
        );

        console.log(data);
        return data;
    }

    async userAchievements(userId: string) {
        const findAchievement = await this.prisma.achievement.findUnique({
            where: { UserId: userId }
        });

        console.log('achievements : ', findAchievement);
        const {
            UserId,
            welcome,
            harban,
            khari,
            brown,
            silver,
            goldon,
            hacker
        } = findAchievement;

        const achievement = {
            UserId,
            welcome,
            harban,
            khari,
            brown,
            silver,
            goldon,
            hacker
        };
        return achievement;
    }

    async matchHistory(userId: string): Promise<match_history[]> {
        const matchs = await this.prisma.game.findMany({
            where: {
                OR: [{ winnerId: userId }, { loserId: userId }]
            }
        });

        const match = await Promise.all(
            matchs.map(async (matche) => {
                var user;
                var awarded: string;
                const result: string[] = matche.result.split('-');
                if (matche.winnerId == userId) {
                    user = await this.getOneUser(matche.loserId);
                    awarded = '400';
                    var score1: number = +result[0];
                    var score2: number = +result[1];
                } else {
                    user = await this.getOneUser(matche.winnerId);
                    awarded = '100';
                    score1 = +result[1];
                    score2 = +result[0];
                }
                const id: number = matche.id;
                const date: Date = matche.createdAt;
                const rating: number = user.level;
                const name: string = user.fullName;
                const avatar: string = user.avatar;
                const opponent: Player = {
                    avatar,
                    name,
                    rating
                };
                const score: score = {
                    score1,
                    score2
                };
                return {
                    id,
                    opponent,
                    score,
                    awarded,
                    date
                };
            })
        );
        // exampleFunction().finally(() => {
        //     prisma.$disconnect(); // Disconnect Prisma client
        //   });
        return match;
    }

    async userInfo(
        @Req() req,
        avatar: string,
        nickName: string
    ): Promise<User> {
        // console.log('id: ', req.user.sub);
        const isUser = this.findOneUser(req.user.sub);
        if (!isUser) throw new NotFoundException(`User does not exist`);
        //update user avatar and nickName if the front send them if not do not do anything
        //serach if the userName exist or not because it's need to be unique
        // if (avatar && nickName) {
        //     await this.updateAvatarNickname(req.user.sub, avatar, nickName)
        // }

        if (avatar.length !== 0) {
            console.log('update avatar');
            await this.updateAvatar(req.user.sub, avatar);
        }

        if (nickName) {
            console.log('update nickname');
            await this.updateNickName(req.user.sub, nickName);
        }

        await this.prisma.user.update({
            where: { id: req.user.sub },
            data: {
                completeProfile: true
            }
        });
        const user = await this.getOneUser(req.user.sub);
        return user;
    }

    async updateAvatarNickname(
        userId: string,
        avatar: string,
        nickName: string
    ) {
        const update = await this.prisma.user.update({
            where: { id: userId },
            data: {
                avatar: avatar,
                nickName: nickName
            }
        });
    }

    async userInfos(@Req() req, userId: string) {
        const friends = await this.friendService.userListFriends(
            userId,
            req.user.sub
        );

        console.log('FFF: ', friends);
        if (friends[0] !== undefined) {
            var friendsIds = friends.map((friends) => {
                return friends.id;
            });
        }
        //  else {
        //     console.log('hi');
        //     friendsIds = [];
        // }

        const user = await this.getOneUser(userId);
        if (!user) {
            throw new NotFoundException('this user does not exist');
        }
        delete user.HashPassword;
        console.log(user);
        //add the type of profile string
        const type = await this.friendService.typeOfProfile(
            req.user.sub,
            userId
        );
        const info = { user, friendsIds, type };
        console.log('info wael ', info);
        return info;
    }

    async myInfos(@Req() req): Promise<mydata> {
        const user = await this.getOneUser(req.user.sub);
        if (!user) {
            throw new NotFoundException('this user does not exist');
        }

        delete user.HashPassword;
        // console.log(user);

        const friends = await this.friendService.listFriends(user.id);
        // console.log('......................................................');
        // console.log(friends);
        // console.log('......................................................');

        const friendsIds = friends.map((friends) => {
            return friends.id;
        });

        // console.log(friendsIds);

        const block = await this.blockUsers.listOfBlockedUsers(user.id);
        const blocksIds = block.map((block) => {
            return block.id;
        });
        // console.log('ids ', friendsIds);

        return { user, friendsIds, blocksIds };
    }

    async userData(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) throw new NotFoundException(`User does not exist`);

        const id = user.id;
        const avatar = user.avatar;
        const nickName = user.nickName;
        return {
            id,
            avatar,
            nickName
        };
    }

    async onlineUsers(userId: string) {
        const isUser = await this.getOneUser(userId);
        if (!isUser) {
            throw new NotFoundException('this user does not exist');
        }
        const users = await this.friendService.listFriends(userId);

        const onlineUsers = users
            .filter((user) => user.status)
            .map((user) => ({
                id: user.id,
                avatar: user.avatar
            }));
        return onlineUsers;
    }

    async getAllUsersRank(userId: string) {
        const isUser = await this.findOneUser(userId);
        if (!isUser){
            throw new NotFoundException('this user does not exist');
        }
        const users = await this.findAllUser();

        const sortedUsers = users.sort((user1, user2) => {
            if (user1.level !== user2.level) {
                return user2.level - user1.level;
            } else {
                return user2.exp - user1.exp; // If levels are equal, sort by experience in descending order
            }
        });
        // console.log(sortedUsers);
        var index = 1;
        const allRankPromises = sortedUsers.map(async(sortedUsers) => {
            if (!sortedUsers.completeProfile || await this.blockUsers.isUserBlocked(userId, sortedUsers.id)){
                return ;
            }
            const id = sortedUsers.id;
            const rank = index++;
            const nickName = sortedUsers.nickName;
            const avatar = sortedUsers.avatar;
            const level = sortedUsers.level;
            const xp = sortedUsers.exp;
            return {
                id,
                rank,
                nickName,
                avatar,
                level,
                xp
            };
        });
        const allRank = await Promise.all(allRankPromises);
        const filteredRank = allRank.filter(Boolean);

        // console.log('rank: ', filteredRank);
        return filteredRank;
    }
}
