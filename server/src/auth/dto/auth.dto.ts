import { IsEmail, IsNotEmpty, IsString, isEmail, isNotEmpty } from "class-validator";

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    FullName: string;
}