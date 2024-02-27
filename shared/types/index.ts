import { UserStatus } from '../../client/src/components/Avatar';

export interface User {
    actions: any;
    id: string;
    email: string;
    HashPassword: string;
    avatar: string;
    nickName: string;
    fullName: string;
    status: UserStatus;
    achivementsCounter: number;
    f2A: boolean;
    f2A_Secret: string;
    inGame: boolean;
    completeProfile: boolean;
    createdAt: string;
    exp: number;
    level: number;
}

export interface Room {
    id: number;
    createdAt: string;
    updatedAt: string;
    roomTitle: string;
    avatar: string;
    users: User[];
    messages: Message[];
    isConversation: boolean;
    privacy: string;
    password?: string;
    owner: string[];
    admins: string[];
    banned: string[];
    muted: string[];
}

interface score {
    score1: number;
    score2: number;
}

export interface Player {
    avatar: string;
    name: string;
    rating: number;
    id: string;
    status: string;
}

export interface Friend {
    id: string;
    nickName: string;
    avatar: string;
    fullName?: string;
    status: string;
    actions: string[];
}

export interface Match {
    id: number;
    opponent: Player;
    score: score;
    awarded: string;
    date: string;
}

export interface LeaderboardEntry {
    id: string;
    rank: number;
    nickName: string;
    avatar: string;
    level: number;
    xp: number;
    status: string;
}

export interface RoomsList {
    id: number;

    avatar: string;

    roomTitle: string;

    lastMessage: string;

    senderId: string;

    lastMessageTime: string;

    isRoom: boolean;

    privacy?: string;

    password?: string;
}

export interface OnlineUser {
    id: string;
    avatar: string;
}

export interface Message {
    id: number;
    avatar?: string;
    nickName?: string;
    message: string;
    createdAt: string;
    senderId: string;
    status?: string;
}

export interface DMRooms {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    roomTitle: string;
    users: User[];
    messages: Message[];
    friendId: string;
}

export interface NotificationDto {
    id: number;
    userId: string;
    type: string;
    nickName: string;
    avatar: string;
    action: string;
    roomTitle?: string;
    roomId?: string;
}
