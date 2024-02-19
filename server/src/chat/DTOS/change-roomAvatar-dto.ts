import { IsString } from "class-validator";


export class ChangeRoomAvatar {
    
    @IsString()
    id: string;

    @IsString()
    newAvatar: string;
}