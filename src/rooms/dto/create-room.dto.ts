import {IsArray, IsEmail, IsJSON, IsNotEmpty} from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;

    @IsJSON()
    users: '';
}