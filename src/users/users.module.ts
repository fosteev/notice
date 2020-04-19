import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserChema} from "./chemas/user.chema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserChema }])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}