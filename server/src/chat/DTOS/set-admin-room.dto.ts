import { IsNumber, IsString } from "class-validator";


export class SetAdminDto {
    
    @IsString()
    userId: string;

    @IsNumber()
    roomId: number;
}