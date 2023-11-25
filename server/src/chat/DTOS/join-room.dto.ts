import { IsNumber, IsOptional, IsString } from "class-validator";

export class JoinRoomDto {
    
    @IsNumber()
    roomid: number;

    @IsOptional()
    password?: string;
}
