import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

import { RoomPrivacy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    roomTitle: string;

    @ApiProperty()
    @IsBoolean()
    isConversation: boolean;

    @ApiProperty()
    @IsEnum(RoomPrivacy)
    privacy: RoomPrivacy;

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    password?: string;

    avatar: string;
}
