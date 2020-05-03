import {IsArray, IsEmail, IsNotEmpty} from "class-validator";

export class GetRoomDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    userId: string;
}