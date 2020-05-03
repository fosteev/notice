import * as mongoose from 'mongoose';

export const RoomChema = new mongoose.Schema({
    name: String,
    users: Array
});