import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaOrmService) {}
  
  createUser(user: User) {
    return (this.prisma.user.create({
      data: user
    }));
  }

  findAllUser() {
    return (this.prisma.user.findMany());
  }

  async findOneUser(User: User) {

    const user = await this.prisma.user.findUnique({
      where: { id : User.id,
                email : User.email 
              },
    });

    return user ? true : false;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return (this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    }));
  }

  removeUser(id: string) {
    return (this.prisma.user.delete({
      where: { id }
    }));
  }
}
