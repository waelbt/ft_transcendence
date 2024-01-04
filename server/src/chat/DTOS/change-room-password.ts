import { IsNumber, IsString } from "class-validator";


export class changeRoomPasswordDto {

    @IsNumber()
    roomId: number;

    @IsString()
    currentPassword: string;

    @IsString()
    newPassword: string;
}