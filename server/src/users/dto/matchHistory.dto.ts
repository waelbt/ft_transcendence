import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class match_history {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsString()
    level: string;

    @ApiProperty()
    score: string[];

    @ApiProperty()
    addedXp: any;

    @ApiProperty()
    date: Date;
}