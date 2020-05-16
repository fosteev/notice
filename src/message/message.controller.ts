import {
    Body,
    Controller, Delete,
    ForbiddenException,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    Query,
    Res
} from '@nestjs/common';
import {RoomsService} from "../rooms/rooms.service";
import {UsersService} from "../users/users.service";
import {ResultDto} from "../dto/result.dto";
import {MessageService} from "./message.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {GetMessageDto} from "./dto/get-message.dto";
import {ChatGateway} from "./chat.gateway";
import {PutMessageDto} from "./dto/put-message.dto";
import {DeleteMessageDto} from "./dto/delete-message.dto";

@Controller('message')
export class MessageController {
    constructor(
        private roomsService: RoomsService,
        private usersService: UsersService,
        private messageService: MessageService,
        private chatGateway: ChatGateway
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

        const room = await this.roomsService.findById(createMessage.room);

        if (!room) {
            throw new HttpException('Room not found', 400);
        }

        const accessUsers: string[] = room.users;

        if (!accessUsers.includes(createMessage.user)) {
            throw new HttpException('Not access room for user', 403);
        }

        if (! await this.messageService.create(createMessage)) {
            throw new HttpException('Not push message', 500);
        }

        this.chatGateway.handleMessage(createMessage);

        return {
            message: 'Success push message',
            data: []
        }
    }

    @Put(':message')
    async editMessage(@Param() param, @Body() putMessageDto: PutMessageDto) {
        const message = await this.messageService.getMessage(param.message);

        if (!message) {
            throw new HttpException('Message not found', 400);
        }

        if (message.user !== putMessageDto.user) {
            throw new HttpException('Its not ur message', 403);
        }

        await this.messageService.editMessage(message._id, putMessageDto.text);
    }

    @Delete(':message')
    async deleteMessage(@Param() param, @Body() deleteMessageDto: DeleteMessageDto) {
        const message = await this.messageService.getMessage(param.message);

        if (!message) {
            throw new HttpException('Message not found', 400);
        }

        if (message.user !== deleteMessageDto.user) {
            throw new HttpException('Its not ur message', 403);
        }

        await this.messageService.deleteMessage(message._id);
    }
}
