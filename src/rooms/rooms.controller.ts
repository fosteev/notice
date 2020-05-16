import {
    Body,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Put, Query,
} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {CreateRoomDto} from "./dto/create-room.dto";
import {UsersService} from "../users/users.service";
import {ResultDto} from "../dto/result.dto";
import {PutRoomDto} from "./dto/put-room.dto";
import {DeleteRoomDto} from "./dto/delete-room.dto";
import {MessageService} from "../message/message.service";

@Controller('rooms')
export class RoomsController {
    constructor(
        private roomsService: RoomsService,
        private usersService: UsersService,
        private messageService: MessageService
    ) {}

    @Get(':room')
    async find(@Param() params): Promise<ResultDto> {
        const find = await this.roomsService.findById(params.room);

        if (!find) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return {
            message: find ? 'Found' : 'Not found',
            data: find
        };
    }
    @Get('user/:user')
    async findUser(@Param() params): Promise<ResultDto> {
        try {
            const find = await this.usersService.findByEmail(params.user);

            if (!find) {
                return {
                    message: 'Not find user',
                    data: []
                }
            }

            const rooms = await this.roomsService.getRooms(find.rooms);

            return {
                message: params.user,
                data: rooms.filter(v => v)
            }

        } catch (e) {
            return {
                message: e.message,
                data: []
            }
        }

    }

    @Post()
    async create(@Body() createRoomDto: CreateRoomDto): Promise <ResultDto> {
        const users = JSON.parse(createRoomDto.users);

        if (users.length === 0) {
            return
        }

        for (const key in users) {
            if (!await this.usersService.findById(users[key])) {
                throw new HttpException('Not found user Id: ' + users[key], 400)
            }
        }

        const group = await this.roomsService.create({
            name: createRoomDto.name,
            users: users,
            admin: createRoomDto.admin
        });

        for (const key in users) {
            const append = await this.usersService.appendGroup(users[key], group._id.toString());
            if (!append) {
                throw new HttpException('Cannot create room', 500)
            }
        }

        return {
            message: 'Success create room',
            data: group
        };
    }

    @Put(':room')
    async editRoom(@Param() param, @Body() putRoomDto: PutRoomDto) {
        const room = await this.roomsService.getRoom(param.room);

        if (!room) {
            throw new HttpException('Not found room', 404);
        }

        const {admin} = room;

        if (admin && (putRoomDto.user !== admin)) {
            throw new HttpException('Forbidden', 403);
        }

        await this.roomsService.editRoom(room._id, putRoomDto);
    }

    @Delete(':room')
    async deleteRoom(@Param() param, @Query() deleteRoomDto: DeleteRoomDto) {
        const room = await this.roomsService.getRoom(param.room);

        if (!room) {
            throw new HttpException('Not found room', 404);
        }

        const {admin} = room;

        if (admin && (deleteRoomDto.user !== admin)) {
            throw new HttpException('Forbidden', 403);
        }

        await this.messageService.deleteRoomMessages(room._id);
        await this.roomsService.deleteRoom(room._id);
    }
}
