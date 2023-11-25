import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { RoomPrivacy } from '@prisma/client';

export class CreateRoomDto {

    @IsString()
    roomTitle: string;

    @IsBoolean()
    isConversation: boolean;

    @IsEnum(RoomPrivacy)
    privacy:    RoomPrivacy;

    @IsString()
    @IsOptional()
    password?:  string;
}
