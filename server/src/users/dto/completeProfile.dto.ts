import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class dto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(10, { message: 'Nickname is too long, maximum 10 characters allowed' })
    nickName: string;

    @ApiProperty()
    @IsString()
    avatar: string;
}