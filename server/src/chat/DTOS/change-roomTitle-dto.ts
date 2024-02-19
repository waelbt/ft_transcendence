import { IsString } from "class-validator";


export class ChangeRoomTitle {

    @IsString()
    id: string;

    @IsString()
    newTitle: string;
}