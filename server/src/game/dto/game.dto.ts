import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class gameDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()

    winnerId: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()

    loserId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()

    result: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()

    mode: string;
}