import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Room, User, RoomPrivacy } from '@prisma/client'
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { CreateRoomDto } from '../DTOS/create-room.dto';
import { JoinRoomDto } from '../DTOS/join-room.dto';
import { LeaveRoomDto } from '../DTOS/leave-room.dto';
import { SetAdminDto } from '../DTOS/set-admin-room.dto';
import { KickMemberDto } from '../DTOS/kick-member.dto';
import { BanMemberDto } from '../DTOS/ban-member-dto';
import { RemoveBanDto } from '../DTOS/remove-ban-dto';
import { hashPassword, verifyPassowrd } from './hash-password';
import { changeRoomPasswordDto } from '../DTOS/change-room-password';
import { MuteUserDto, UnmuteUserDto, UnmuteUserDetails } from '../DTOS/mute-user-dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RoomService {

    private mutedUsers: Map<string, UnmuteUserDetails> = new Map<string, UnmuteUserDetails>();

    constructor(private readonly prisma: PrismaOrmService){}

    async createRoom(createRoomDto: CreateRoomDto, userId: string) {

        // const newRoom = await this.findRoomByTitle(createRoomDto.roomTitle);
        // if (!newRoom)
        // {
            const newRoom = await this.prisma.room.create({
                data: {
                    roomTitle: createRoomDto.roomTitle,
                    isConversation: createRoomDto.isConversation,
                    privacy: createRoomDto.privacy,
                    users: {
                        connect: {
                            id : userId
                        },
                    },
                    owner: [userId],
                    admins: [userId],
                },
                include : {
                    users: true,
                    messages: true,
                }
            });
            if (createRoomDto.privacy === "PROTECTED")
            {
                const password = hashPassword(createRoomDto.password);
                const roomid = newRoom.id;
                const room = await this.prisma.room.update({
                    where: {
                        id: roomid,
                    },
                    data : {
                        password: password,
                    },
                });

            }
        // }
        return (newRoom);
    }

    async findRoomByTitle(roomTitle: string) {
        
        const existingRoom = await this.prisma.room.findUnique({
            where: {
                roomTitle: roomTitle,
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        })

        return (existingRoom);
    }

    async joinRoom(joinRoomDto: JoinRoomDto, userId: string) {

        // check if the room existed and if the user is already joined
        console.log(joinRoomDto.roomTitle, userId);
        let room = await this.prisma.room.findUnique({
            where: {
                roomTitle: joinRoomDto.roomTitle,
            },
            select: {
                privacy: true,
                password: true,
            }
        });

        if (!room)
            throw new NotFoundException('No Exsiting Room With This Id');
        else if (room.privacy == 'PRIVATE')
            throw new BadRequestException("This Room Is Private");
        else if (room.privacy == 'PROTECTED')
        {
            const matched = verifyPassowrd(joinRoomDto.password, room.password);
            if (!matched)
                throw new BadRequestException('Password Does Not Match');
        }

        room = await this.prisma.room.update({
            where: {
                roomTitle: joinRoomDto.roomTitle,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include : {
                        user: true,
                    },
                },
            },
        });

        return (room);
    }

    async leaveRoom(leaveRoomDto: LeaveRoomDto, userId: string) {

        let room = await this.findRoomByTitle(leaveRoomDto.roomTitle);

        room = await this.prisma.room.update({
            where: {
                roomTitle: leaveRoomDto.roomTitle,
            },
            data : {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        // here i should check if the room has no more users
        // if yes
        // i should delete all the messages that belongs to it
        // and delete the room it self
        return (room);

    }

    async getAllRooms() {
        const rooms = await this.prisma.room.findMany({
            where: {
                isConversation: false,
                privacy: {
                    not: RoomPrivacy.PRIVATE,
                },
            },
            include: {
                users: true,
                messages: true,
            },
        });

        return (rooms);
    }


    async getOneRoom(roomId: number, userId: string) {


        const tmproom = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            }
        });

        if (!tmproom)
            throw new NotFoundException('No Exsiting Room With This Id');

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                rooms: {
                    where: {
                        id: roomId,
                    }
                }
            }
        });

        // console.log(user.rooms);

        if (user.rooms.length === 0)
            throw new BadRequestException(`You are not a member of this room`);

        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            include: {
                users: true,
                messages: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return (room);
    }

    async setUserToAdminRoom(setAdminDto: SetAdminDto, userId: string) {


        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: setAdminDto.roomId,
            },
            select: {
                admins: true,
            }
        });

        let updatedRoom;
        if (roomWithAdmins.admins.includes(userId))
        {
            updatedRoom = await this.prisma.room.updateMany({
                where: {
                    id: setAdminDto.roomId,
                },
                data :{
                    admins: {
                        set: [...roomWithAdmins.admins, setAdminDto.userId],
                    },
                },
            });
        }

        return (updatedRoom);

    }

    async kickMember(kickMemberDto: KickMemberDto, userId: string) {

        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: kickMemberDto.roomId,
            },
            select: {
                admins: true,
            }
        });


        if (roomWithAdmins.admins.includes(userId))
        {
            const room = await this.prisma.room.findUnique({
                where: {
                    id: kickMemberDto.roomId,
                },
                select: {
                    users: {
                        where: {
                            id: kickMemberDto.userId,
                        },
                    },
                }
            });

            if (room.users.length === 0)
                throw new BadRequestException('User Is Not A Member In This Room');

            await this.isUserOwner(kickMemberDto.roomId, kickMemberDto.userId, "Kick");
            await this.unsetUserFromAdmins(kickMemberDto.roomId, kickMemberDto.userId);

            const tmpRoom = await this.prisma.room.update({
                where : {
                    id: kickMemberDto.roomId,
                },
                data : {
                    users: {
                        disconnect: {
                            id: kickMemberDto.userId,
                        },
                    },
                },
                include: {
                    users: true,
                },
            });

            return (tmpRoom);
        }

        throw new BadRequestException('Only Admins Can Kick Other Users');

    }

    async unsetUserFromAdmins(roomId: number, userId: string) {

        const roomWithAdmins = await this.prisma.room.findUnique({
            where : {
                id: roomId,
            },
            select: {
                admins: true,
            },
        });

        if (roomWithAdmins.admins.includes(userId))
        {

            await this.isUserOwner(roomId, userId, "Remove Admin For");

            const room = await this.prisma.room.updateMany({
                where: {
                    id: roomId,
                },
                data: {
                    admins: {
                        set: roomWithAdmins.admins.filter((admin) => admin !== userId),
                    },
                },
            });
        }

    }
    
    async getMyRooms(userId: string) {

        
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                rooms: true,
            },
        });
    
        if (user.rooms.length === 0)
            throw new NotFoundException('You Did Not Join Any Room Yet');
        return (user.rooms);
    }

    async banMember(banMemberDto: BanMemberDto, userId: string) {

        if (await this.isUserAdmin(userId, banMemberDto.roomId))
        {
            await this.isUserMember(banMemberDto.roomId, banMemberDto.memberToBanId);
            await this.isUserOwner(banMemberDto.roomId, banMemberDto.memberToBanId, "Ban");
            await this.userAlreadyBanned(banMemberDto.roomId, banMemberDto.memberToBanId);
            const roomWithBanned = await this.prisma.room.findUnique({
            where : {
                    id: banMemberDto.roomId,
                },
                select: {
                    banned: true,
                },
            });
            const updatedRoom = await this.prisma.room.updateMany({
                where: {
                    id: banMemberDto.roomId,
                },
                data: {
                    banned: {
                        set: [...roomWithBanned.banned, banMemberDto.memberToBanId],
                    },
                },
            });

            const tmpRoom = await this.prisma.room.update({
                where: {
                    id: banMemberDto.roomId,
                },
                data: {
                    users: {
                        disconnect: {
                            id: banMemberDto.memberToBanId,
                        },
                    },
                },
            });

            this.unsetUserFromAdmins(banMemberDto.roomId, banMemberDto.memberToBanId);
            return (roomWithBanned.banned);

        } else
            throw new BadRequestException('Only Admins Can Ban Other Users');
    }

    async userAlreadyBanned(roomId: number, userId: string) {

        const bannedUsers = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                banned: true,
            },
        });

        if (bannedUsers.banned.includes(userId))
            throw new BadRequestException("This Member Is Already Banned");

    }

    async isUserAdmin(userId: string, roomId: number) {

        const roomWithAdmins = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                admins: true,
            },
        });
        
        if (roomWithAdmins.admins.includes(userId))
            return (true);
        return (false);
    }

    async isUserOwner(roomId: number, userId: string, message: string) {

        const roomOwner = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                owner: true,
            },
        });
        
        if (roomOwner.owner.includes(userId))
            throw new BadRequestException(`You Cannot ${message} The Room Owner`);
    }

    async isUserMember(roomId: number, userId: string) {
        
        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                users: {
                        where: {
                            id: userId,
                        },
                    },
                },
            });

            console.log(room.users);

        if (room.users.length === 0)
            throw new BadRequestException('User Is Not A Member In This Room');
    }

    async removeBan(removeBan: RemoveBanDto, userId: string) {
        console.log('banned function');

        const bannedUsers = await this.prisma.room.findUnique({
            where: {
                id: removeBan.roomId,
            },
            select: {
                banned: true,
            },
        });

        if (bannedUsers.banned.includes(removeBan.userId))
        {
            const room = await this.prisma.room.updateMany({
                where: {
                    id: removeBan.roomId,
                },
                data: {
                    banned: {
                        set: bannedUsers.banned.filter((bannedUser) => bannedUser !== removeBan.userId)
                    },
                },
            });

            return (bannedUsers.banned);
        }
        else
            throw new BadRequestException('User Is Not Banned');

    }

    async changeRoomPassword(changeRoomPasswordDto: changeRoomPasswordDto, userId: string) {

        if (await this.isUserAdmin(userId, changeRoomPasswordDto.roomId))
        {
            const room = await this.prisma.room.findUnique({
                where: {
                    id: changeRoomPasswordDto.roomId,
                },
                select: {
                    password: true,
                }
            });

            const matched = verifyPassowrd(changeRoomPasswordDto.currentPassword, room.password);
            if (matched)
            {
                const newPassword = hashPassword(changeRoomPasswordDto.newPassword);
                await this.prisma.room.update({
                    where: {
                        id: changeRoomPasswordDto.roomId,
                    },
                    data: {
                        password: newPassword,
                    },
                });
                console.log('password changed succefully');
            }
            else 
                throw new BadRequestException("Passowrd Does Not Match");
        }
        else
            throw new BadRequestException("Only Admins And Owners Can Change Room Password");

    }

    async muteUser(muteUserDto: MuteUserDto, userId) {

        // console.log("mute function");
        // await this.isUserMuted(muteUserDto.roomId, muteUserDto.userToMute);
        // return;
        // you cannot mute the room owner is working succefully
        if (this.isUserAdmin(userId, muteUserDto.roomId))
        {
            await this.isUserOwner(muteUserDto.roomId, muteUserDto.userToMute, "Mute");
            const unmuteTime = new Date();
            unmuteTime.setMinutes(unmuteTime.getMinutes() + muteUserDto.muteDuration);
            const roomWithMutedUsers = await this.prisma.room.findUnique({
                where: {
                    id: muteUserDto.roomId,
                },
                select: {
                    muted: true,
                },
            });

            const room = await this.prisma.room.updateMany({
                where: {
                    id: muteUserDto.roomId,
                },
                data: {
                    muted: {
                        set: [...roomWithMutedUsers.muted, muteUserDto.userToMute],
                    },
                },
            });

            const userDetails = new UnmuteUserDetails(muteUserDto.roomId, muteUserDto.userToMute, unmuteTime);
            this.mutedUsers.set(muteUserDto.userToMute, userDetails);
            return (this.mutedUsers);
        }
        else
            throw new BadRequestException('Only Admins And Owners Can Mute Other Users');
    }

    async unmuteUser(unmuteUserDto : UnmuteUserDto, userId) {

        if (this.isUserAdmin(userId, unmuteUserDto.roomId))
        {
            const roomWithMutedUsers = await this.prisma.room.findUnique({
                where: {
                    id: unmuteUserDto.roomId,
                },
                select: {
                    muted: true,
                },
            });

            const room = await this.prisma.room.updateMany({
                where: {
                    id: unmuteUserDto.roomId,
                },
                data: {
                    muted: {
                        set: roomWithMutedUsers.muted.filter((mutedUser) => mutedUser !== unmuteUserDto.userToUnmute)
                    },
                },
            });

            this.mutedUsers.delete(unmuteUserDto.userToUnmute);
        }
        else
            throw new BadRequestException('Only Admins And Owners Can UnMute Other Users');
    }

    async isUserMuted(roomId: number, userToCheck: string) {

        const roomWithMutedUsers = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                muted: true,
            },
        });

        if(roomWithMutedUsers.muted.includes(userToCheck))
            console.log(`user with the id ${userToCheck} is muted`);
        else
            console.log(`user with the id ${userToCheck} is not muted`);
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async checkUsersToUnmute() {

        this.mutedUsers.forEach((mutedUntil, userId) => {
            const currentTime = new Date();
            if (currentTime >= mutedUntil.mutEDuration)
            {
                console.log("in");
                this.unmuteUserForCron(mutedUntil);
                console.log(`user with the id ${mutedUntil.userID} is removed automatically from the muted users`);
            }
        });

    }

    async unmuteUserForCron( unmuteUser: UnmuteUserDetails) {

        const roomWithMutedUsers = await this.prisma.room.findUnique({
            where: {
                id: unmuteUser.roomID,
            },
            select: {
                muted: true,
            },
        });

        const room = await this.prisma.room.updateMany({
            where: {
                id: unmuteUser.roomID,
            },
            data: {
                muted: {
                    set: roomWithMutedUsers.muted.filter((mutedUser) => mutedUser !== unmuteUser.userID)
                },
            },
        });

        this.mutedUsers.delete(unmuteUser.userID);
    }

}