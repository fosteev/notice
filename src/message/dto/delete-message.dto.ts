import {IsNotEmpty} from "class-validator";

export class DeleteMessageDto {

    @IsNotEmpty()
    user: string;

}
