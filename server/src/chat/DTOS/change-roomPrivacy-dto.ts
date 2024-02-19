import { RoomPrivacy } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class ChangeRoomPrivacy {
    
    @IsString()
    id: string;

    @IsString()
    newPrivacy: RoomPrivacy;

    @IsString()
    @IsOptional()
    password?: string;
}