import {Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import {ResultDto} from "../dto/result.dto";
import {GetUserDto} from "./dto/get-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get()
    async findAll(@Query() params): Promise<ResultDto> {
        if (params.users) {
            const users = await Promise.all(
                params.users.split(',').map(
                    userId => this.usersService.findById(userId)
                )
            )

            return {
                message: 'Current users',
                data: users.map((user: User) => ({
                    id: user._id,
                    email: user.email
                }))
            }
        }

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

    @Get('findByEmail/:email')
    async findOne(@Param() params): Promise<ResultDto> {
        return {
            message: 'Find user',
            data: await this.usersService.findByEmail(params.email)
        }
    }

    @Get('search')
    async searchUsers(@Query() query): Promise<ResultDto> {
        const {email, limit, page} = query;

        if (!email) {
            return {
                message: "Missing parameter",
                data: []
            }
        }

        const users = await this.usersService.searchUserByEmail(
            email,
            Number(limit) || 50,
            Number(page) || 0
        )

        return {
            message: "Found users",
            data: users.map(u => ({
                email: u.email,
                _id: u._id
            }))
        }
    }
}
