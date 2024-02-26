import { ApiProperty } from "@nestjs/swagger";


export class notification{
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    userId: string;
    
    @ApiProperty()
    nickName: string;
    
    @ApiProperty()
    avatar: string;
    
    @ApiProperty()
    action: string;
    
    @ApiProperty()
    type: string;
}