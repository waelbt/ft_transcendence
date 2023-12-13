import { IsNumber, IsString } from "class-validator";

export class MuteUserDto {

    @IsNumber()
    roomId: number;

    @IsString()
    userToMute: string;

    @IsNumber()
    muteDuration: number;
}

export class UnmuteUserDto {

    @IsNumber()
    roomId: number;

    @IsString()
    userToUnmute: string;
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