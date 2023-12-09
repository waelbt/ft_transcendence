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
import { P_N_Dto } from '../dto/completeProfile.dto';
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
        return await this.prisma.user.create({
            data: {
                id: id,
                email: user.email,
                fullName: user.fullName,
                Avatar: user.avatar,
                nickName: user.nickName
            }
        });
    }

    findAllUser() {
        return this.prisma.user.findMany();
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
        console.log('jjjjj');
        const user = await this.findOneUser(req.user.id);
        if (!user) throw new NotFoundException(`User does not exist`);
        console.log('im user');
        // const theUser = this.getOneUser(User);
        // User.Avatar = imageData.data.url;
        this.updateUser(req.user.id, req.user);
        console.log('path is : ', file.path);
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

    async userInfo(@Req() req, dto: P_N_Dto) {
        const isUser = this.findOneUser(req.user.id);
        if (isUser) throw new NotFoundException(`User does not exist`);
        //update user avatar and nickName if the front send them if not do not do anything
        //serach if the userName exist or not because it's need to be unique
        var user = this.getOneUser(req.user.id);
        if (dto.Avatar && dto.nickName) {
            (await user).Avatar = dto.Avatar;
            (await user).nickName = dto.nickName;
        }
        this.updateUser((await user).id, await user);
        return user;
    }

    async userInfos(@Req() req, userId: string) {
        const friends = await this.friendService.listFriends(userId);
        console.log(friends);
        const user = await this.getOneUser(userId);
        console.log(user);
        const block = await this.blockUsers.listOfBlockedUsers(userId);
        const info = { user, friends, block };
        return info;
    }

    async myInfos(@Req() req) {
        const user = await this.getOneUser(req.user.sub);
        console.log(user);

        const friends = await this.friendService.listFriends(user.id);
        console.log(friends);

        const block = await this.blockUsers.listOfBlockedUsers(user.id);
        const info = { user, friends, block };
        return info;
    }
}
