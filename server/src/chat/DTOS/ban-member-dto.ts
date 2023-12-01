import { IsNumber, IsString } from "class-validator";


export class BanMemberDto {

    @IsNumber()
    roomId: number;

    @IsString()
    memberToBanId: string;
}