import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class rank {
    @ApiProperty()
    @IsString()
    id: number;

    @ApiProperty()
    @IsString()
    rank: number;

    @ApiProperty()
    @IsString()
    nickName: string;

    @ApiProperty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsString()
    level: number;

    @ApiProperty()
    @IsString()
    xp: number;

}