import { IsString } from "class-validator"

export class LeaveRoomDto {
    @IsString()
    roomTitle: string;
}