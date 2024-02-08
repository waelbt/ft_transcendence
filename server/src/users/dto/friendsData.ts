import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class friendsData {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    action: string;
}
