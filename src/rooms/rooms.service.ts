import {HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Room} from "./interfaces/room.interface";
import {CreateRoomMongoDtoDto} from "./dto/create-room-mongo.dto";
import {PutRoomDto} from "./dto/put-room.dto";
import {DeleteRoomDto} from "./dto/delete-room.dto";

@Injectable()
export class RoomsService {
    constructor(@InjectModel('Room') private roomModel: Model<any>) {}

    async create(createRoomDto: CreateRoomMongoDtoDto): Promise<any> {
        const room = new this.roomModel(createRoomDto);
        return room.save();
    }

    async findById(id: string): Promise<Room> {
        try {
            return await    this.roomModel.findById(id);
        } catch (e) {
            return null;
        }
    }

    async getRooms(rooms: []): Promise<any> {
        return Promise.all(
            rooms.map(room => this.findById(room))
        )
    }

    async getRoom(roomId: string): Promise<any> {
        return this.roomModel.findById(roomId);
    }

    async editRoom(roomId: string, putRoomDto: PutRoomDto) {
        const room = await this.getRoom(roomId);

        if (!room) {
            throw new NotFoundException('Not found room model');
        }

        try {
            room.users = JSON.parse(putRoomDto.users);
            room.name = putRoomDto.name;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }

        if (!room.save()) {
            throw new InternalServerErrorException('Cannot save model');
        }
    }

    async deleteRoom(roomId: string) {
        const room = await this.getRoom(roomId);

        if (!room) {
            throw new NotFoundException('Not found room model');
        }

        if (!room.delete()) {
            throw new InternalServerErrorException('Cannot delete model');
        }
    }
}
