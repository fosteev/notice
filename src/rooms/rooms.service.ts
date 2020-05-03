import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Room} from "./interfaces/room.interface";
import {CreateRoomMongoDtoDto} from "./dto/create-room-mongo.dto";

@Injectable()
export class RoomsService {
    constructor(@InjectModel('Room') private roomModel: Model<any>) {}

    async create(createRoomDto: CreateRoomMongoDtoDto): Promise<any> {
        const room = new this.roomModel(createRoomDto);
        return room.save();
    }

    async findById(id: string): Promise<Room> {
        return this.roomModel.findById(id);
    }
}