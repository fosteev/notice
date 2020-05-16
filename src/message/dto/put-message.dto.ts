import {IsNotEmpty} from "class-validator";

export class PutMessageDto {
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    user: string;
}
