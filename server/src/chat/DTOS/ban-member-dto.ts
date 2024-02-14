import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanMemberDto {
    @ApiProperty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsString()
    memberToBanId: string;
}
