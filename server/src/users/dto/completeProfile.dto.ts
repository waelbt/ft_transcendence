import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class dto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    avatar: string;
}