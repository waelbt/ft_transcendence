import { ApiProperty } from "@nestjs/swagger";

export class user{

    @ApiProperty()

    id: string;
    
    @ApiProperty()

    email: string;
    
    @ApiProperty()

    HashPassword: string;
    
    @ApiProperty()

    avatar: string;
    
    @ApiProperty()

    nickName: string;
    
    @ApiProperty()

    fullName: string;
    
    @ApiProperty()

    status: boolean;
    
    @ApiProperty()

    f2A: boolean;
    
    @ApiProperty()

    f2A_Secret: string;
    
    @ApiProperty()

    inGame: boolean;
    
    @ApiProperty()

    createdAt: Date;
}

export class mydata{

    @ApiProperty({type: user})

    user: user;

    @ApiProperty()

    friendsIds: string[];

    @ApiProperty()

    blocksIds: string[];
}