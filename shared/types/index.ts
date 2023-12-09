export interface User {
	id: number;
	fullName: string;
	email: string;
	HashPassword: string;
}

interface Result {
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
	players: Player[];
	result: Result;
	awarded: string;
	date: string;
}
