import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class JoinRoomDto {
    
    @ApiProperty()
    @IsString()
    roomTitle: string;

    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    password?: string;
}
