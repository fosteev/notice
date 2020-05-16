import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateMessageDto} from "./dto/create-message.dto";
import {GetMessageDto} from "./dto/get-message.dto";

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private messageModel: Model<any>) {}

    async create(createMessageDto: CreateMessageDto): Promise<any> {
         const message = new this.messageModel({
             room: createMessageDto.room,
             user: createMessageDto.user,
             text: createMessageDto.text,
             date: Date.now()
         });

         return message.save();
    }

    async getAll(): Promise<any> {
        return await this.messageModel.find().exec();
    }

    async getRoom(roomId: string, getMessageDto: GetMessageDto): Promise<any> {
        try {
            const limit = Number(getMessageDto.limit);
            const page = Number(getMessageDto.page) - 1;

            return await this.messageModel.find({
                room: roomId
            }).sort({
                '_id': -1
            }).skip(limit * page).limit(limit).exec()
        }  catch (e) {
            return [];
        }
    }

    async getMessage(messageId: string): Promise<any> {
        return await this.messageModel.findById(messageId).exec()
    }

    async editMessage(messageId: string, text: string) {
        const message = await this.getMessage(messageId);

        if (!message) {
            throw new NotFoundException('Not found message');
        }

        message.text = text;

        if (!message.save()) {
            throw new InternalServerErrorException(message);
        }
    }

    async deleteMessage(messageId: string) {
        const message = await this.getMessage(messageId);

        if (!message) {
            throw new NotFoundException('Not found message');
        }

        if (!message.delete()) {
            throw new InternalServerErrorException(message);
        }
    }

    async deleteRoomMessages(roomId: string) {
        const messages = await this.messageModel.find({
            room: roomId
        });

        if (!messages) {
            throw new NotFoundException('Not found messages room')
        }

        messages.forEach(message => {
            if (!message.delete()) {
                throw new InternalServerErrorException(message);
            }
        })
    }
}
