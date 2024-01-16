import { ApiProperty } from "@nestjs/swagger";

export class userDTO{

    @ApiProperty()

    id: string;
    
    @ApiProperty()

    email: string;
    
    @ApiProperty()

    HashPassword: string;
    
    @ApiProperty()

    Avatar: string;
    
    @ApiProperty()

    nickName: string;
    
    @ApiProperty()

    fullName: string;
    
    @ApiProperty()

    status: boolean;
    
    @ApiProperty()

    F2A: boolean;
    
    @ApiProperty()

    F2A_Secret: string;
    
    @ApiProperty()

    inGame: boolean;
    
    @ApiProperty()

    createdAt: Date;
}

export class userInfos{

    @ApiProperty({type: userDTO})

    user: userDTO;

    @ApiProperty({type: [userDTO] })

    friends: userDTO[];

    // @ApiProperty({type: [userDTO]})

    // block: userDTO[]
}