import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class avatarDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    oldAvatar: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newAvatar: string;
}