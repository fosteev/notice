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
import {RoomsService} from "./rooms.service";
import {GetRoomDto} from "./dto/get-room.dto";
import {CreateRoomDto} from "./dto/create-room.dto";
import {Room} from "./interfaces/room.interface";
import {UsersService} from "../users/users.service";
import {ResultDto} from "../dto/result.dto";

@Controller('rooms')
export class RoomsController {
    constructor(
        private roomsService: RoomsService,
        private usersService: UsersService
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
            users: users
        });

        for (const key in users) {
            const append = await this.usersService.appendGroup(users[key], group._id.toString());
            if (!append) {

            }
        }

        return {
            message: 'Success create room',
            data: group
        };
    }
}
