import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class SetAdminDto {
    
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNumber()
    roomId: number;
}