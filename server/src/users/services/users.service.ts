import {
    Inject,
    Injectable,
    NotFoundException,
    Param,
    Req,
    UnauthorizedException,
    forwardRef
} from '@nestjs/common';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { Prisma, User } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import { CreateUserDto } from '../dto/create-user.dto';
import { friendsService } from './friends.service';
import { BlockService } from './blocked.service';
import { match_history } from '../dto/matchHistory.dto';
import { mydata, user } from '../dto/mydata.dto';

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

    async updateAvatar(id: string, avatar: string) {
        const Avatar = await this.prisma.user.update({
            where:{ id: id},
            data:{
                avatar: avatar,
            },
        });
    }

    async updateNickName(id: string, name: string) {
        try {
            const nickName = await this.prisma.user.update({
                where:{ id: id},
                data:{
                    nickName: name,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new UnauthorizedException('Nickname is already in use.');
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

    removeUser(id: string) {
        return this.prisma.user.delete({
            where: { id }
        });
    }

    async uploadAvatar(file: Express.Multer.File, @Req() req): Promise<any> {
        const user = await this.findOneUser(req.user.sub);
        if (!user)
            throw new NotFoundException(`User does not exist`);
        
        console.log('localhost:4000/upload/' + file.filename);
        const filename = 'localhost:4000/upload/' + file.filename;
        return (filename);
        // return (file.path);
    }

    async deleteImage(path: string) {
        const url = 'localhost:4000/upload/';
  
        if (path.includes(url)) {
          const splitedStrings = path.split(url);
          var file = process.env.UPLOADS_DESTINATION + '/' + splitedStrings[1];
        } else {
          console.log('path: ', path);
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
                nickName: { contains: keyword, mode: 'insensitive' },
            }
          });
        // const result = await this.prisma.user.findMany({
        //     where: {
        //       body: {
        //         search: 'cat | dog',
        //       },
        //     },
        //   })
        const data = await Promise.all( users.map( async (user) =>{
            const id = user.id;
            const nickName = user.nickName;
            const avatar = user.avatar;
            return {
                id,
                nickName,
                avatar,
            };
        }));

        console.log(data);
        return data;
    }

    async matchHistory(userId: string): Promise<match_history[]>{
        const matchs = await this.prisma.game.findMany({
            where:{
                OR: [
                    {winnerId: userId},
                    {loserId: userId},
                ],
            },
        });
    
        const match = await Promise.all( matchs.map( async (matche) =>{

            var user;
            var addedXp : any;
            if (matche.winnerId == userId)
            {
                user = await this.getOneUser(matche.loserId);
                addedXp = 400;
            }else{
                user = await this.getOneUser(matche.winnerId);
                addedXp = 100;
            }
            const score : string[] = matche.result.split('-');
            const id : number = matche.id;
            const date : Date = matche.createdAt;
            const level : string = user.level;
            const name : string = user.fullName;
            const avatar : string  = user.avatar;
            return {
                id,
                name,
                avatar,
                level,
                score,
                addedXp,
                date,
            }
        }));
        // exampleFunction().finally(() => {
        //     prisma.$disconnect(); // Disconnect Prisma client
        //   });
        return match;
    }

    async userInfo(@Req() req, avatar: string, nickName: string): Promise<User> {
        console.log('id: ', req.user.sub);
        const isUser = this.findOneUser(req.user.sub);
        if (!isUser)
            throw new NotFoundException(`User does not exist`);
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

        if (!friends) {
            var friendsIds = friends.map((friends) => {
                return friends.id;
            })
        } else {
            friendsIds = [];
        }

        const user = await this.getOneUser(userId);
        delete user.HashPassword;
        console.log(user);
        //add the type of profile string
        const type = await this.friendService.typeOfProfile(req.user.sub, userId);
        const info = { user, friendsIds , type};
        return info;
    }

    async myInfos(@Req() req): Promise<mydata>{
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

        return { user, friendsIds, blocksIds };
    }

    async userData(userId: string){
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException(`User does not exist`);

        const id = user.id;
        const avatar = user.avatar;
        const nickName = user.nickName;
        return ({
            id,
            avatar,
            nickName,
        });
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