import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {RoomsService} from "../rooms/rooms.service";
import {UsersService} from "../users/users.service";
import {MessageChema} from "./chemas/message.chema";
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";
import {RoomChema} from "../rooms/chemas/room.chema";
import {UserChema} from "../users/chemas/user.chema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Message', schema: MessageChema }]),
        MongooseModule.forFeature([{ name: 'Room', schema: RoomChema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserChema }])
    ],
    controllers: [MessageController],
    providers: [RoomsService, UsersService, MessageService],
})
export class MessageModule {}
