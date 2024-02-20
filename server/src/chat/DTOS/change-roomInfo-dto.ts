import { RoomPrivacy } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";


export class ChangeRoomInfoDto {

    @IsString()
    id: string;

    @IsString()
    newAvatar: string;

    @IsString()
    newPrivacy: RoomPrivacy;

    @IsString()
    newTitle: string;

    @IsString()
    @IsOptional()
    password?: string;
}