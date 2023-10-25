import { ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiProperty()
    id: number;
    
    @ApiProperty()
    fullName: string;
    
    @ApiProperty()
    email: string;
}
