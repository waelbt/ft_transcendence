import { IsNumber, IsString } from "class-validator";

export class MuteUserDto {

    @IsNumber()
    roomId: number;

    @IsString()
    userToMute: string;

    @IsString()
    muteDuration: number;
}

export class UnmuteUserDto {

    @IsNumber()
    roomId: number;

    @IsString()
    userToUnmute: string;
}

export class unmuteUserDetails {
    roomId:       number;
    userId:       string;
    muteDuration: Date;

    constructor(roomId: number, userId: string, muteDuration: Date) {
        this.roomId = roomId;
        this.userId = userId;
        this.muteDuration = muteDuration;
    }
}