import { IsNumber, IsString } from "class-validator";


export class KickMemberDto {

    @IsString()
    userId: string;

    @IsNumber()
    roomId: number;

}