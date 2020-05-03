import {IsNotEmpty} from "class-validator";

export class GetMessageDto {
    @IsNotEmpty()
    limit: number;

    @IsNotEmpty()
    page: number;
}
