import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class KickMemberDto {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNumber()
    roomId: number;

}