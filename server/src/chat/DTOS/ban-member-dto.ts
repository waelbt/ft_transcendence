import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanMemberDto {
    @ApiProperty()
    @IsNumber()
    roomId: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    roomTitle: string;
}
