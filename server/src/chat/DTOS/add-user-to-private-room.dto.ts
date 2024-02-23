import { IsNumber, IsString } from "class-validator";


export class AddUserToPrivateRoom {

    @IsString()
    userId: string;

    @IsNumber()
    roomId: number;
}