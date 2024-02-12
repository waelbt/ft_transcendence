import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class achievement {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    welcome: boolean;

    @ApiProperty()
    @IsString()
    harban: boolean;

    @ApiProperty()
    @IsString()
    khari: boolean;

    @ApiProperty()
    @IsString()
    brown: boolean;

    @ApiProperty()
    @IsString()
    silver: boolean;

    @ApiProperty()
    @IsString()
    goldon: boolean;

    @ApiProperty()
    @IsString()
    hacker: boolean;
}