import { IsString } from "class-validator";

export class CreateDmDto {

    @IsString()
    friendId: string;
}