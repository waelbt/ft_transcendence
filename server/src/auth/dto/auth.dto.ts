import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isEmail, isNotEmpty } from "class-validator";

export class AuthDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    FullName: string;
}