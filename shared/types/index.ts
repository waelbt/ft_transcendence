export interface User {
	id: number;
	fullName: string;
	email: string;
	HashPassword: string;
}

export interface Player {
	name: string;
	rating: number;
}

export interface Match {
	id: number;
	players: Player[];
	result: string;
	awarded: string;
	date: string;
}

export interface Column<D extends object> {
	Header: string;
	accessor: keyof D  | ((data: D) => string); // accessor can be a key of Match or a function that returns a string
}
