import { IsNumber, IsOptional, IsString } from "class-validator";

export class JoinRoomDto {
    
    @IsString()
    roomTitle: string;

    @IsNumber()
    roomId: number;

    @IsOptional()
    password?: string;
}
