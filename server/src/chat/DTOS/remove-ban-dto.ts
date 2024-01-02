import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class RemoveBanDto {

    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsString()
    userId: string;
}