import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateMessageDto {
    @IsString()
    roomTitle: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    message: string;
}