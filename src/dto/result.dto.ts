import {IsJSON, IsNotEmpty} from "class-validator";

export class ResultDto {
    @IsNotEmpty()
    message: string;

    data: {};
}
