import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Res
} from '@nestjs/common';
import {RoomsService} from "../rooms/rooms.service";
import {UsersService} from "../users/users.service";
import {ResultDto} from "../dto/result.dto";
import {MessageService} from "./message.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {GetMessageDto} from "./dto/get-message.dto";

@Controller('message')
export class MessageController {
    constructor(
        private roomsService: RoomsService,
        private usersService: UsersService,
        private messageService: MessageService
    ) {}

    @Get()
    async findAll(): Promise<ResultDto> {
        return await this.messageService.getAll()
    }

    @Get(':room')
    async find(@Param() params, @Query() getMessageDto: GetMessageDto): Promise<ResultDto> {
        return {
            message: 'Room messages',
            data: await this.messageService.getRoom(params.room, getMessageDto)
        }
    }

    @Post()
    async create(@Body() createMessage: CreateMessageDto): Promise <ResultDto> {
        if (! await this.usersService.findById(createMessage.user)) {
            throw new HttpException('User not found', 400);
        }

        if (! await this.roomsService.findById(createMessage.room)) {
            throw new HttpException('Room not found', 400);
        }

        if (! await this.messageService.create(createMessage)) {
            throw new HttpException('Not push message', 500);
        }

        return {
            message: 'Success push message',
            data: this.messageService.create(createMessage)
        }
    }
}
