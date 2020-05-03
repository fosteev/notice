import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {RoomChema} from "./chemas/room.chema";
import {RoomsService} from "./rooms.service";
import {RoomsController} from "./rooms.controller";
import {UsersService} from "../users/users.service";
import {UserChema} from "../users/chemas/user.chema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Room', schema: RoomChema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserChema }])
    ],
    controllers: [RoomsController],
    providers: [RoomsService, UsersService],
})
export class RoomsModule {}
