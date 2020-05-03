import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from './interfaces/user.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<any>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        if (await this.findByEmail(createUserDto.email)) {
            throw new HttpException('This email present in the system', HttpStatus.BAD_REQUEST);
        }

        const createdCat = new this.userModel(createUserDto);
        return createdCat.save();
    }

    async findAll(): Promise<User []> {
        return this.userModel.find();
    }

    async findByEmail(email: string): Promise<User []> {
        return await this.userModel.findOne({email: email}).exec()
    }

    async findById(id: string): Promise<any> {
        try {
            return await this.userModel.findById(id).exec();
        } catch (e) {
            return null
        }
    }

    async appendGroup(userId: string, groupId: string): Promise <User []> {
        try {
            const user = await this.findById(userId);

            if (!user.rooms.some(r => r === groupId)) {
                user.rooms.push(groupId);
            }
            return await user.save();
        } catch (e) {
            return null;
        }
    }
}
