import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaOrmService) {}
  
  createUser(createUserDto: CreateUserDto) {
    return (this.prisma.user.create({
      data: createUserDto
    }));
  }

  findAllUser() {
    return (this.prisma.user.findMany());
  }

  findOneUser(id: number) {
    return (this.prisma.user.findUnique({ 
      where: { id },
    }));
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return (this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    }));
  }

  removeUser(id: number) {
    return (this.prisma.user.delete({
      where: { id }
    }));
  }
}
