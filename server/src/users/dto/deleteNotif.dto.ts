import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class deleteNotById {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
		notificationId: number;

}