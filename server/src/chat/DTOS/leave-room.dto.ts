import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class LeaveRoomDto {
    @ApiProperty()
    @IsString()
    id: string;

    @IsString()
    roomTitle: string;
}