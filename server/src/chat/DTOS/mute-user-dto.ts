import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class MuteUserDto {

    @ApiProperty()
    @IsNumber()
    roomId: string;

    @ApiProperty()
    @IsString()
    userToMute: string;

    @ApiProperty()
    @IsNumber()
    muteDuration: number;

    @ApiProperty()
    @IsString()
    roomTitle: string;
}

export class UnmuteUserDto {

    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsString()
    userToUnmute: string;

    @ApiProperty()
    @IsString()
    roomTitle: string;
}

export class UnmuteUserDetails{
    roomID:       number;
    userID:       string;
    mutEDuration: Date;

    constructor(roomId: number, userId: string, muteDuration: Date) {
        this.roomID = roomId;
        this.userID = userId;
        this.mutEDuration = muteDuration;
    }
}