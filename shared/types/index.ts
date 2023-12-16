export interface User {
    id: number;
    fullName: string;
    email: string;
    HashPassword: string;
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

export interface Match {
    id: number;
    opponent: Player;
    score: score;
    awarded: string;
    date: string;
}
