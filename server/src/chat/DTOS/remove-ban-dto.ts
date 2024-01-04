import { IsNumber, IsString } from "class-validator";


export class RemoveBanDto {

    @IsNumber()
    roomId: number;

    @IsString()
    userId: string;
}