import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, Param, Req } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { User } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';
import { P_N_Dto } from './dto/completeProfile.dto';
import * as fs from 'fs';



@Injectable()
export class UsersService {

  constructor(private readonly httpService: HttpService,
    private prisma: PrismaOrmService,) {}
  
  createUser(user: User) {
    return (this.prisma.user.create({
      data: user
    }));
  }

  findAllUser() {
    return (this.prisma.user.findMany());
  }

  async findOneUser(User: User) {

    // console.log('that a user ; ',User);
    const user = await this.prisma.user.findUnique({
      where: {
                email : User.email 
              },
    });
    return user ? true : false;
  }

  async getOneUser(User: User): Promise<User>{
    return (await this.prisma.user.findUnique({
      where: { id : User.id,
                email : User.email 
              },
    }));
  }

  updateUser(id: string, user: User) {
    return (this.prisma.user.update({
      where: { id },
      data: user,
    }));
  }

  removeUser(id: string) {
    return (this.prisma.user.delete({
      where: { id }
    }));
  }

  async uploadAvatar(
    file: Express.Multer.File,
    @Req() req,
  ): Promise<any> {
      console.log('jjjjj');
      const user = await this.findOneUser(req.user);
      if (!user)
        throw new NotFoundException(`User does not exist`);
      console.log('im user');
    // const theUser = this.getOneUser(User);
    // User.Avatar = imageData.data.url;
    this.updateUser(req.user.id, req.user);
    console.log('path is : ', file.path);
    return file.path;
  }

  async deleteImage(path:string){
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

  async userInfo(@Req() req, dto: P_N_Dto){
    const isUser = this.findOneUser(req.user);
    if (isUser)
      throw new NotFoundException(`User does not exist`);
    //update user avatar and nickName if the front send them if not do not do anything
    var user = this.getOneUser(req.user);
    if (dto.Avatar && dto.nickName)
    {
      (await user).Avatar = dto.Avatar;
      (await user).nickName = dto.nickName;
    }
    this.updateUser((await user).id, (await user));
    return user;
  }
}
