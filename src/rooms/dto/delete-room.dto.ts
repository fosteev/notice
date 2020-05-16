import {IsArray, IsEmail, IsJSON, IsNotEmpty} from "class-validator";

export class DeleteRoomDto {
    @IsNotEmpty()
    user: string;
}
