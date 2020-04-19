import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':email')
    findOne(@Param() params): Promise<User []> {
        return this.usersService.findByEmail(params.email)
    }
}