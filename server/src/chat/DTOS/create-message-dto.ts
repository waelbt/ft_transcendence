import { IsNotEmpty, IsString } from "class-validator";


export class CreateMessageDto {
    @IsString()
    roomTitle: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}