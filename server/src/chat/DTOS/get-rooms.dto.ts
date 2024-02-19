import { RoomPrivacy } from "@prisma/client";

export class GetRoomsDto {

    id: number;

    avatar: string;

    roomTitle: string;

    lastMessage: string;

    nickName: string;

    lastMessageTime: Date;

    privacy?: RoomPrivacy;

    isRoom: boolean;
}