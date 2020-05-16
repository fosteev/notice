import {IsArray, IsEmail, IsJSON, IsNotEmpty} from "class-validator";

export class PutRoomDto {
    @IsNotEmpty()
    name: string;

    @IsJSON()
    users: string;

    @IsNotEmpty()
    user: string;
}
