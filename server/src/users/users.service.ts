import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { User } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';



@Injectable()
export class UsersService {

  constructor(private readonly httpService: HttpService,
    private prisma: PrismaOrmService) {}
  
  createUser(user: User) {
    return (this.prisma.user.create({
      data: user
    }));
  }

  findAllUser() {
    return (this.prisma.user.findMany());
  }

  async findOneUser(User: User) {

    // console.log(User.email);
    const user = await this.prisma.user.findUnique({
      where: { id : User.id,
                email : User.email 
              },
    });
    return user ? true : false;
  }

  async getOneUser(User: User){
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
    avatar: Express.Multer.File,
    User: User,
  ): Promise<any> {
    const user = await this.findOneUser(User);
    if (!user)
      throw new NotFoundException(`User does not exist`);
    const formData = new FormData();
    formData.append('image', avatar.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
      .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
        formData,
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
  );
  // const theUser = this.getOneUser(User);
  User.Avatar = imageData.data.url;
  this.updateUser(User.id, User);
  return imageData;
  }
}
