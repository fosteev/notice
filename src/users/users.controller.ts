import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import {ResultDto} from "../dto/result.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<ResultDto> {
        return {
            message: 'All users',
            data: await this.usersService.findAll()
        };
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResultDto> {
        return {
            message: 'Success create user',
            data: await this.usersService.create(createUserDto)
        };
    }

    @Get(':email')
    async findOne(@Param() params): Promise<ResultDto> {
        return {
            message: 'Find user',
            data: await this.usersService.findByEmail(params.email)
        }
    }
}
