import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isEmail, isNotEmpty } from "class-validator";

export class AuthDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AuthDtoSignIn {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}