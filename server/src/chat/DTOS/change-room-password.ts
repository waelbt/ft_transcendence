import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class changeRoomPasswordDto {

    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsString()
    currentPassword: string;

    @ApiProperty()
    @IsString()
    newPassword: string;
}