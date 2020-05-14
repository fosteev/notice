import {IsNotEmpty} from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    room: string;

    @IsNotEmpty()
    user: string;
}
