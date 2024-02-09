import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class Player {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsString()
    rating: number;
}

export class score {
    @ApiProperty()
    @IsString()
    score1: number;

    @ApiProperty()
    @IsString()
    score2: number;
}

export class match_history {
    @ApiProperty()
    id: number;

    @ApiProperty()
    opponent: Player;

    @ApiProperty()
    score: score;

    @ApiProperty()
    awarded: string;

    @ApiProperty()
    date: Date;
}