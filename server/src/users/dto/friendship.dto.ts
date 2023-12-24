import { ApiProperty } from "@nestjs/swagger";

export class friendship{
    @ApiProperty()

    id: string;

    @ApiProperty()

    friendId: string;
}