import {
    Inject,
    Injectable,
    NotFoundException,
    Param,
    Req,
    forwardRef
} from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { User } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import { CreateUserDto } from '../dto/create-user.dto';
import { friendsService } from './friends.service';
import { BlockService } from './blocked.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaOrmService,
        @Inject(forwardRef(() => friendsService))
        private friendService: friendsService,
        private blockUsers: BlockService
    ) {}

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
			data : {
                UserId : User.id,
            }
		});
    }

    async findAllUser() {
        return await this.prisma.user.findMany();
    }

    async findOneUser(id: string) {
        console.log('that a user ; ', id);
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user ? true : false;
    }

    async saveUser(user: User): Promise<User> {
        return this.prisma.user.update({
          where: { id: user.id },
          data: user,
        });
    }

    async getOneUser(id: string) {
        console.log('userId: ', id);
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    updateUser(id: string, user: User) {
        return this.prisma.user.update({
            where: { id },
            data: user
        });
    }

    removeUser(id: string) {
        return this.prisma.user.delete({
            where: { id }
        });
    }

    async uploadAvatar(file: Express.Multer.File, @Req() req): Promise<any> {
        const user = await this.findOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);

        return file.path;
    }

    async deleteImage(path: string) {
        try {
            await this.deleteFile(path);
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

    async userInfo(@Req() req, avatar: string, nickName: string) {
        console.log('id: ', req.user.sub);
        const isUser = this.findOneUser(req.user.sub);
        if (!isUser) throw new NotFoundException(`User does not exist`);
        //update user avatar and nickName if the front send them if not do not do anything
        //serach if the userName exist or not because it's need to be unique
        if (avatar && nickName) {
            await this.updateAvatarNickname(req.user.sub, avatar, nickName)
        }

        await this.prisma.user.update({
            where: {id: req.user.sub},
            data: {
                completeProfile: true,
            }
        });
        const user = await this.getOneUser(req.user.sub);
        return user;
    }

    async updateAvatarNickname(userId: string, avatar: string, nickName: string){
        const update = await this.prisma.user.update({
            where: {id: userId},
            data: {
                avatar: avatar,
                nickName: nickName,
            },
        });
    }

    async userInfos(@Req() req, userId: string) {
        const friends = await this.friendService.userListFriends(
            req.user.sub,
            userId
        );

        const friendsIds = friends.map((friends) => {
            return friends.id;
        })

        const user = await this.getOneUser(userId);
        delete user.HashPassword;
        console.log(user);
        //add the type of profile string
        const type = await this.friendService.typeOfProfile(req.user.sub, userId);
        const info = { user, friendsIds , type};
        return info;
    }

    async myInfos(@Req() req) {
        const user = await this.getOneUser(req.user.sub);
        delete user.HashPassword;
        console.log(user);

        const friends = await this.friendService.listFriends(user.id);

        const friendsIds = friends.map((friends) => {
            return friends.id;
        })

        console.log(friendsIds);

        const block = await this.blockUsers.listOfBlockedUsers(user.id);
        const blocksIds = block.map((block) => {
            return block.id;
        })

        const info = { user, friendsIds, blocksIds };
        return info;
    }

    async getAllUsersRank(){
        const users = await this.findAllUser();
        
        console.log(users);

        const sortedUsers = users.sort((user1, user2) => {
            if (user1.level !== user2.level) {
              return user2.level - user1.level; // Sort user2y level in descending order
            } else {
              return user2.exp - user1.exp; // If levels are equal, sort by experience in descending order
            }
          });
          console.log(sortedUsers);
          return sortedUsers;
    }
}