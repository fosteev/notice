import {IsArray, IsEmail, IsJSON, IsNotEmpty} from "class-validator";

export class CreateRoomMongoDtoDto {
    @IsNotEmpty()
    name: string;

    @IsArray()
    users: [];

    @IsNotEmpty()
    admin: string;
}
