import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Room, User, RoomPrivacy } from '@prisma/client';
import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { CreateRoomDto } from '../DTOS/create-room.dto';
import { JoinRoomDto } from '../DTOS/join-room.dto';
import { LeaveRoomDto } from '../DTOS/leave-room.dto';
import { SetAdminDto, UnSetAdminDto } from '../DTOS/set-admin-room.dto';
import { KickMemberDto } from '../DTOS/kick-member.dto';
import { BanMemberDto } from '../DTOS/ban-member-dto';
import { RemoveBanDto } from '../DTOS/remove-ban-dto';
import { hashPassword, verifyPassowrd } from './hash-password';
import { changeRoomPasswordDto } from '../DTOS/change-room-password';
import {
    MuteUserDto,
    UnmuteUserDto,
    UnmuteUserDetails
} from '../DTOS/mute-user-dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateMessageDto } from '../DTOS/create-message-dto';
import { GetRoomsDto } from '../DTOS/get-rooms.dto';
import { dirxml, log } from 'console';
import { SendMessageDto } from '../DTOS/send-message-dto';
import { ChangeRoomPrivacy } from '../DTOS/change-roomPrivacy-dto';
import { ChangeRoomAvatar } from '../DTOS/change-roomAvatar-dto';
import { ChangeRoomTitle } from '../DTOS/change-roomTitle-dto';
import { ChangeRoomInfoDto } from '../DTOS/change-roomInfo-dto';

@Injectable()
export class RoomService {
    private mutedUsers: Map<string, UnmuteUserDetails> = new Map<
        string,
        UnmuteUserDetails
    >();

    constructor(private readonly prisma: PrismaOrmService) {}

    async createRoom(createRoomDto: CreateRoomDto, userId: string) {
        console.log(` createRoom user id is : ${userId}`);

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
                        id: userId
                    }
                },
                avatar: createRoomDto.avatar,
                owner: [userId],
                admins: [userId]
            },
            include: {
                users: true,
                messages: true
            }
        });
        if (createRoomDto.privacy === 'PROTECTED') {
            const password = hashPassword(createRoomDto.password);
            const room = await this.prisma.room.update({
                where: {
                    id: newRoom.id
                },
                data: {
                    password: password
                }
            });
            return room;
        }

        const roomCreated: GetRoomsDto = {
            id: newRoom.id,
            avatar: newRoom.avatar,
            roomTitle: newRoom.roomTitle,
            lastMessage: '',
            nickName: newRoom.roomTitle,
            lastMessageTime: null,
            isRoom: true
        };
        return roomCreated;
    }

    // async findRoomByTitle(roomTitle: string) {
    //     const existingRoom = await this.prisma.room.findUnique({
    //         where: {
    //             roomTitle: roomTitle
    //         },
    //         include: {
    //             users: true,
    //             messages: {
    //                 include: {
    //                     sender: true
    //                 }
    //             }
    //         }
    //     });

    //     return existingRoom;
    // }

    async joinRoom(joinRoomDto: JoinRoomDto, userId: string) {
        // check if the room existed and if the user is already joined
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                rooms: true
            }
        });

        // console.log(joinRoomDto.roomTitle, userId);

        let room = await this.prisma.room.findUnique({
            where: {
                id: joinRoomDto.roomId
            }
            // select: {
            //     privacy: true,
            //     password: true,
            // }
        });
        if (!room)
            throw new ForbiddenException('No Existing Room With This Id');
        // return { message: 'No Existing Room With This Id', state: false };
        if (user.rooms.includes(room))
            throw new ForbiddenException('Alread Joined');
        if (room.banned.includes(userId))
            throw new ForbiddenException('You Are Banned');
        // return {
        //     message: 'Already Joined',
        //     state: false,
        //     joinedRoom: room
        // };
        // if (!room)
        //     throw new NotFoundException('No Exsiting Room With This Id');
        else if (room.privacy == 'PRIVATE')
            throw new ForbiddenException('This Room Is PRIVATE');
        // return { message: 'This Room Is Private', state: false };
        else if (room.privacy == 'PROTECTED') {
            const matched = verifyPassowrd(joinRoomDto.password, room.password);
            if (!matched) throw new ForbiddenException('Pssword Does No Match');
            // return { message: 'Password Does Not Match', state: false };
        }

        room = await this.prisma.room.update({
            where: {
                id: joinRoomDto.roomId
            },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });

        return { joinedRoom: room, state: true };
    }

    async leaveRoom(leaveRoomDto: LeaveRoomDto, userId: string) {
        const id = +leaveRoomDto.id;
        const room = await this.prisma.room.update({
            where: {
                id: id
            },
            data: {
                users: {
                    disconnect: {
                        id: userId
                    }
                }
            },
            include: {
                users: true
            }
        });

        await this.unsetUserFromAdmins(+leaveRoomDto.id, userId);

        if (room.users.length === 0) {
            await this.prisma.message.deleteMany({
                where: {
                    roomId: id
                }
            });

            await this.prisma.room.delete({
                where: {
                    id: id
                }
            });
        }
        // // here i should check if the room has no more users
        // // if yes
        // // i should delete all the messages that belongs to it
        // // and delete the room it self
    }

    async getAllRooms(userId: string) {
        const allRooms: GetRoomsDto[] = [];

        const rooms = await this.prisma.room.findMany({
            where: {
                isConversation: false,
                privacy: {
                    not: RoomPrivacy.PRIVATE
                },
                users: {
                    none: {
                        id: userId
                    }
                }
            },
            select: {
                id: true,
                roomTitle: true,
                avatar: true,
                privacy: true,
                users: {
                    select: {
                        id: true
                    }
                },
                messages: true
            }
        });

        rooms.forEach((item) => {
            let lastMessage = '';
            let createdAt = new Date();

            if (item.messages.length > 0) {
                lastMessage = item.messages[item.messages.length - 1].message;
                createdAt = item.messages[item.messages.length - 1].createdAt;
            }

            const singleRoom: GetRoomsDto = {
                id: item.id,
                avatar: item.avatar,
                roomTitle: item.roomTitle,
                lastMessage: lastMessage,
                nickName: item.roomTitle,
                lastMessageTime: createdAt,
                isRoom: true,
                privacy: item.privacy
            };
            allRooms.push(singleRoom);
        });

        return allRooms;
    }

    async getOneRoom(roomId: number, userId: string) {
        const tmproom = await this.prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!tmproom)
            throw new NotFoundException('No Exsiting Room With This Id');

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                rooms: {
                    where: {
                        id: roomId
                    }
                }
            }
        });

        if (user.rooms.length === 0)
            throw new BadRequestException(`You are not a member of this room`);

        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        room: true
                    }
                }
            }
        });

        return room;
    }

    async getDmRoom(dmId: number, userId: string) {
        console.log(dmId);

        const tmpDm = await this.prisma.dMRooms.findUnique({
            where: {
                id: dmId
            }
        });

        if (!tmpDm)
            throw new NotFoundException('No Exsiting Room With This Id');

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                rooms: {
                    where: {
                        id: dmId
                    }
                }
            }
        });

        if (!user) throw new NotFoundException('this user does not exist');

        const dm = await this.prisma.dMRooms.findUnique({
            where: {
                id: dmId
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });
        console.log('dm: ', dm);
        dm.users = dm.users.filter((user) => userId != user.id);
        return dm;
    }

    async setUserToAdminRoom(setAdminDto: SetAdminDto, userId: string) {
        console.log('=====================', setAdminDto);
        const roomWithAdmins = await this.prisma.room.findUnique({
            where: {
                id: +setAdminDto.roomId
            },
            select: {
                admins: true
            }
        });

        let updatedRoom;
        if (roomWithAdmins.admins.includes(userId)) {
            updatedRoom = await this.prisma.room.updateMany({
                where: {
                    id: +setAdminDto.roomId
                },
                data: {
                    admins: {
                        set: [...roomWithAdmins.admins, setAdminDto.userId]
                    }
                }
            });
        }
        return updatedRoom;
    }

    async removeFromAdmins(unSetAdminDto: UnSetAdminDto, userId: string) {

        await this.unsetUserFromAdmins(+unSetAdminDto.roomId, unSetAdminDto.userId)
    }

    async kickMember(kickMemberDto: KickMemberDto, userId: string) {
        const roomWithAdmins = await this.prisma.room.findUnique({
            where: {
                id: +kickMemberDto.id
            },
            select: {
                admins: true
            }
        });

        if (roomWithAdmins.admins.includes(userId)) {
            const room = await this.prisma.room.findUnique({
                where: {
                    id: +kickMemberDto.id
                },
                select: {
                    users: {
                        where: {
                            id: kickMemberDto.userId
                        }
                    }
                }
            });

            if (room.users.length === 0) return;
            // throw new BadRequestException(
            //     'User Is Not A Member In This Room'
            // );

            await this.isUserOwner(
                +kickMemberDto.id,
                kickMemberDto.userId,
                'Kick'
            );
            await this.unsetUserFromAdmins(
                +kickMemberDto.id,
                kickMemberDto.userId
            );

            const tmpRoom = await this.prisma.room.update({
                where: {
                    id: +kickMemberDto.id
                },
                data: {
                    users: {
                        disconnect: {
                            id: kickMemberDto.userId
                        }
                    }
                },
                include: {
                    users: true
                }
            });

            return tmpRoom;
        }
        return;
        // throw new BadRequestException('Only Admins Can Kick Other Users');
    }

    async changeRoomTitle(changeRoomTitle: ChangeRoomTitle, userId: string) {
        if (await this.isUserAdmin(userId, +changeRoomTitle.id)) {
            const id = +changeRoomTitle.id;
            await this.prisma.room.update({
                where: {
                    id: id
                },
                data: {
                    roomTitle: changeRoomTitle.newTitle
                }
            });
        } else
            throw new ForbiddenException(
                'Only Owner And Admins Can Change Room Title'
            );
    }

    async changeRoomAvatar(changeRoomAvatar: ChangeRoomAvatar, userId: string) {
        if (await this.isUserAdmin(userId, +changeRoomAvatar.id)) {
            const id = +changeRoomAvatar.id;
            await this.prisma.room.update({
                where: {
                    id: id
                },
                data: {
                    avatar: changeRoomAvatar.newAvatar
                }
            });
        } else
            throw new ForbiddenException(
                'Only Owner And Admins Can Change Room Avatar'
            );
    }

    async changeRoomPrivacy(
        changeRoomPrivacy: ChangeRoomPrivacy,
        userId: string
    ) {
        if (await this.isUserAdmin(userId, +changeRoomPrivacy.id)) {
            const id = +changeRoomPrivacy.id;
            if (changeRoomPrivacy.newPrivacy === 'PROTECTED') {
                const password = hashPassword(changeRoomPrivacy.password);
                const room = await this.prisma.room.update({
                    where: {
                        id: id
                    },
                    data: {
                        password: password,
                        privacy: 'PROTECTED'
                    }
                });
            } else {
                await this.prisma.room.update({
                    where: {
                        id: id
                    },
                    data: {
                        privacy: changeRoomPrivacy.newPrivacy
                    }
                });
            }
        } else
            throw new ForbiddenException(
                'Only Owner And Admins Can Change Room Privacy'
            );
    }

    async unsetUserFromAdmins(roomId: number, userId: string) {
        const roomWithAdmins = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                admins: true
            }
        });

        if (roomWithAdmins.admins.includes(userId)) {
            await this.isUserOwner(roomId, userId, 'Remove Admin For');

            const room = await this.prisma.room.updateMany({
                where: {
                    id: roomId
                },
                data: {
                    admins: {
                        set: roomWithAdmins.admins.filter(
                            (admin) => admin !== userId
                        )
                    }
                }
            });
        }
    }

    async getMyRooms(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                rooms: true
            }
        });

        if (user.rooms.length === 0)
            throw new NotFoundException('You Did Not Join Any Room Yet');
        return user.rooms;
    }

    async banMember(banMemberDto: BanMemberDto, userId: string) {
        console.log(
            '--------------------------------------------------------------'
        );
        if (await this.isUserAdmin(userId, +banMemberDto.roomId)) {
            console.log('dkhel');
            await this.isUserMember(
                +banMemberDto.roomId,
                banMemberDto.memberToBanId
            );
            await this.isUserOwner(
                +banMemberDto.roomId,
                banMemberDto.memberToBanId,
                'Ban'
            );
            await this.userAlreadyBanned(
                +banMemberDto.roomId,
                banMemberDto.memberToBanId
            );
            const roomWithBanned = await this.prisma.room.findUnique({
                where: {
                    id: +banMemberDto.roomId
                },
                select: {
                    banned: true
                }
            });
            const updatedRoom = await this.prisma.room.updateMany({
                where: {
                    id: +banMemberDto.roomId
                },
                data: {
                    banned: {
                        set: [
                            ...roomWithBanned.banned,
                            banMemberDto.memberToBanId
                        ]
                    }
                }
            });

            const tmpRoom = await this.prisma.room.update({
                where: {
                    id: +banMemberDto.roomId
                },
                data: {
                    users: {
                        disconnect: {
                            id: banMemberDto.memberToBanId
                        }
                    }
                }
            });

            this.unsetUserFromAdmins(
                +banMemberDto.roomId,
                banMemberDto.memberToBanId
            );
            const banned = await this.prisma.room.findUnique({
                where: {
                    id: +banMemberDto.roomId
                },
                select: {
                    banned: true
                }
            });
            console.log('banned users =======================', banned.banned);
            // return roomWithBanned.banned;
        }
        // else throw new BadRequestException('Only Admins Can Ban Other Users');
    }

    async userAlreadyBanned(roomId: number, userId: string) {
        const bannedUsers = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                banned: true
            }
        });

        if (bannedUsers.banned.includes(userId)) return;
        // throw new BadRequestException('This Member Is Already Banned');
    }

    async isUserAdmin(userId: string, roomId: number) {
        const roomWithAdmins = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                admins: true
            }
        });
        console.log(roomWithAdmins, '   ', userId);
        if (roomWithAdmins.admins.includes(userId)) return true;
        return false;
    }

    async isUserOwner(roomId: number, userId: string, message: string) {
        const roomOwner = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                owner: true
            }
        });

        if (roomOwner.owner.includes(userId)) return;
        // throw new BadRequestException(
        //     `You Cannot ${message} The Room Owner`
        // );
    }

    async isUserMember(roomId: number, userId: string) {
        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                users: {
                    where: {
                        id: userId
                    }
                }
            }
        });

        console.log(room.users);

        if (room.users.length === 0) return;
        // throw new BadRequestException('User Is Not A Member In This Room');
    }

    async removeBan(removeBan: RemoveBanDto, userId: string) {
        console.log('banned function');

        const bannedUsers = await this.prisma.room.findUnique({
            where: {
                id: removeBan.roomId
            },
            select: {
                banned: true
            }
        });

        if (bannedUsers.banned.includes(removeBan.userId)) {
            const room = await this.prisma.room.updateMany({
                where: {
                    id: removeBan.roomId
                },
                data: {
                    banned: {
                        set: bannedUsers.banned.filter(
                            (bannedUser) => bannedUser !== removeBan.userId
                        )
                    }
                }
            });

            return bannedUsers.banned;
        } else throw new BadRequestException('User Is Not Banned');
    }

    async changeRoomPassword(
        changeRoomPasswordDto: changeRoomPasswordDto,
        userId: string
    ) {
        if (await this.isUserAdmin(userId, changeRoomPasswordDto.roomId)) {
            const room = await this.prisma.room.findUnique({
                where: {
                    id: changeRoomPasswordDto.roomId
                },
                select: {
                    password: true
                }
            });

            const matched = verifyPassowrd(
                changeRoomPasswordDto.currentPassword,
                room.password
            );
            if (matched) {
                const newPassword = hashPassword(
                    changeRoomPasswordDto.newPassword
                );
                await this.prisma.room.update({
                    where: {
                        id: changeRoomPasswordDto.roomId
                    },
                    data: {
                        password: newPassword
                    }
                });
                console.log('password changed succefully');
            } else throw new BadRequestException('Passowrd Does Not Match');
        } else
            throw new BadRequestException(
                'Only Admins And Owners Can Change Room Password'
            );
    }

    async muteUser(muteUserDto: MuteUserDto, userId: string) {
        // await this.isUserMuted(muteUserDto.roomId, muteUserDto.userToMute);
        // you cannot mute the room owner is working succefully
        if (await this.isUserAdmin(userId, +muteUserDto.roomId)) {
            console.log(`user ${userId}`);
            await this.isUserOwner(
                +muteUserDto.roomId,
                muteUserDto.userToMute,
                'Mute'
            );
            const unmuteTime = new Date();
            unmuteTime.setMinutes(
                unmuteTime.getMinutes() + muteUserDto.muteDuration
            );
            const roomWithMutedUsers = await this.prisma.room.findUnique({
                where: {
                    id: +muteUserDto.roomId
                },
                select: {
                    muted: true
                }
            });

            const room = await this.prisma.room.updateMany({
                where: {
                    id: +muteUserDto.roomId
                },
                data: {
                    muted: {
                        set: [
                            ...roomWithMutedUsers.muted,
                            muteUserDto.userToMute
                        ]
                    }
                }
            });

            const MutedUsers = await this.prisma.room.findUnique({
                where: {
                    id: +muteUserDto.roomId
                },
                select: {
                    muted: true
                }
            });
            console.log('----------------muted', MutedUsers);

            const userDetails = new UnmuteUserDetails(
                +muteUserDto.roomId,
                muteUserDto.userToMute,
                unmuteTime
            );
            this.mutedUsers.set(muteUserDto.userToMute, userDetails);
            return this.mutedUsers;
        }
        // else throw new Error('Only Admins And Owners Can Mute Other Users');
    }

    async unmuteUser(unmuteUserDto: UnmuteUserDto, userId) {
        if (this.isUserAdmin(userId, unmuteUserDto.roomId)) {
            const roomWithMutedUsers = await this.prisma.room.findUnique({
                where: {
                    id: unmuteUserDto.roomId
                },
                select: {
                    muted: true
                }
            });

            const room = await this.prisma.room.updateMany({
                where: {
                    id: unmuteUserDto.roomId
                },
                data: {
                    muted: {
                        set: roomWithMutedUsers.muted.filter(
                            (mutedUser) =>
                                mutedUser !== unmuteUserDto.userToUnmute
                        )
                    }
                }
            });

            this.mutedUsers.delete(unmuteUserDto.userToUnmute);
        } else
            throw new BadRequestException(
                'Only Admins And Owners Can UnMute Other Users'
            );
    }

    async isUserMuted(roomId: number, userToCheck: string) {
        const roomWithMutedUsers = await this.prisma.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                muted: true
            }
        });

        if (roomWithMutedUsers.muted.includes(userToCheck)) {
            console.log(`user with the id ${userToCheck} is muted`);
            return false;
        } else {
            console.log(`user with the id ${userToCheck} is not muted`);
            return true;
        }
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async checkUsersToUnmute() {
        this.mutedUsers.forEach((mutedUntil, userId) => {
            const currentTime = new Date();
            if (currentTime >= mutedUntil.mutEDuration) {
                this.unmuteUserForCron(mutedUntil);
                console.log(
                    `user with the id ${mutedUntil.userID} is removed automatically from the muted users`
                );
            }
        });
    }

    async unmuteUserForCron(unmuteUser: UnmuteUserDetails) {
        const roomWithMutedUsers = await this.prisma.room.findUnique({
            where: {
                id: unmuteUser.roomID
            },
            select: {
                muted: true
            }
        });

        const room = await this.prisma.room.updateMany({
            where: {
                id: unmuteUser.roomID
            },
            data: {
                muted: {
                    set: roomWithMutedUsers.muted.filter(
                        (mutedUser) => mutedUser !== unmuteUser.userID
                    )
                }
            }
        });

        this.mutedUsers.delete(unmuteUser.userID);


    }

    // createMessage
    async createMessage(sendMessageDto: SendMessageDto, senderId: string) {
        let room = await this.prisma.room.findFirst({
            where: {
                id: +sendMessageDto.id
            },
            include: {
                messages: true
            }
        });

        const user = await this.prisma.user.findUnique({
            where: {
                id: senderId
            }
        });

        if (await this.isUserMuted(room.id, senderId)) {
            const newMessage = await this.prisma.message.create({
                data: {
                    message: sendMessageDto.message,
                    avatar: user.avatar,
                    nickName: user.nickName,
                    sender: {
                        connect: {
                            id: senderId
                        }
                    },
                    room: {
                        connect: {
                            id: room.id
                        }
                    }
                },
                include: {
                    sender: true,
                    room: true
                }
            });

            room = await this.prisma.room.findFirst({
                where: {
                    id: +sendMessageDto.id
                },
                include: {
                    messages: true
                }
            });

            return { room, newMessage };
        } else throw Error('You Are Muted');
    }

    async getAllMyDms(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                dm: {
                    include: {
                        users: true,
                        messages: true
                    }
                }
            }
        });
        // const dmRooms = await this.prisma.dMRooms.findMany({
        //     where: {
        //       users: {
        //         some: {
        //           id: userId,
        //         },
        //       },
        //     },
        //     include: {
        //         users: true,
        //     },
        //   });

        //   console.log('rooms are', dmRooms[0].)
        for (let i = 0; i < user.dm.length; i++) {
            user.dm[i].users = user.dm[i].users.filter(
                (user) => user.id != userId
            );
        }
        // for (let i = 0; i < user.dm.length; i++)
        // {
        //     console.log('dm', user.dm[i]);
        // }
        // console.log('dms', user.dm);
        return user.dm;
    }

    async getAllChannels(userId: string) {
        const allChannels: GetRoomsDto[] = [];

        const userWithRooms = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                rooms: {
                    include: {
                        messages: true
                    }
                },
                dm: {
                    include: {
                        messages: true,
                        users: true
                    }
                }
            }
        });

        const rooms = userWithRooms.rooms;
        const dms = userWithRooms.dm;

        rooms.forEach((item) => {
            let lastMessage = '';
            let createdAt = new Date();

            if (item.messages.length > 0) {
                lastMessage = item.messages[item.messages.length - 1].message;
                createdAt = item.messages[item.messages.length - 1].createdAt;
            }

            const singleRoom: GetRoomsDto = {
                id: item.id,
                avatar: item.avatar,
                roomTitle: item.roomTitle,
                lastMessage: lastMessage,
                nickName: userWithRooms.nickName,
                lastMessageTime: createdAt,
                isRoom: true
            };
            allChannels.push(singleRoom);
        });

        for (let i = 0; i < dms.length; i++)
            dms[i].users = dms[i].users.filter((user) => user.id != userId);

        dms.forEach((item) => {
            let lastMessage = '';
            let createdAt = new Date();

            if (item.messages.length > 0) {
                lastMessage = item.messages[item.messages.length - 1].message;
                createdAt = item.messages[item.messages.length - 1].createdAt;
            }

            const singleDm: GetRoomsDto = {
                id: item.id,
                avatar: item.users[0].avatar,
                roomTitle: item.users[0].nickName,
                lastMessage: lastMessage,
                nickName: item.users[0].nickName,
                lastMessageTime: createdAt,
                isRoom: false
            };
            allChannels.push(singleDm);
        });

        return allChannels;
    }

    async ChangeRoomInfo(changeRoomInfoDto: ChangeRoomInfoDto, userId: string) {
        if (await this.isUserAdmin(userId, +changeRoomInfoDto.id)) {
            const id = +changeRoomInfoDto.id;
            if (changeRoomInfoDto.newPrivacy === 'PROTECTED') {
                const password = hashPassword(changeRoomInfoDto.password);
                const room = await this.prisma.room.update({
                    where: {
                        id: id
                    },
                    data: {
                        password: password,
                        privacy: 'PROTECTED'
                    }
                });
            } else {
                await this.prisma.room.update({
                    where: {
                        id: id
                    },
                    data: {
                        privacy: changeRoomInfoDto.newPrivacy,
                        avatar: changeRoomInfoDto.newAvatar,
                        roomTitle: changeRoomInfoDto.newTitle
                    }
                });
            }
        } else
            throw new ForbiddenException(
                'Only Owner And Admins Can Change Room Informations'
            );
    }
}
