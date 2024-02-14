export interface User {
    id: string;
    email: string;
    HashPassword: string;
    avatar: string;
    nickName: string;
    fullName: string;
    status: boolean;
    f2A: boolean;
    f2A_Secret: string;
    inGame: boolean;
    completeProfile: boolean;
    createdAt: Date; // Converted from TIMESTAMP
    exp: number;
    level: number;
}

interface score {
    score1: number;
    score2: number;
}

export interface Player {
    avatar: string;
    name: string;
    rating: number;
}

export interface Friend {
    id: number;
    nickName: string;
    avatar: string;
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
}

export interface Room {
    roomId: number;

    avatar: string;

    roomTitle: string;

    lastMessage: string;

    senderId: string;

    // ! NAME

    lastMessageTime: string;

    isRoom: boolean;
}
