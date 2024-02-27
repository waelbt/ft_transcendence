import { ApiProperty } from "@nestjs/swagger";
import { notification } from "./notification.dto";

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

    status: string;
    
    @ApiProperty()

    f2A: boolean;
    
    @ApiProperty()

    f2A_Secret: string;
    
    @ApiProperty()

    inGame: string;
    
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

    @ApiProperty({type: notification})

    notification: notification[];
}