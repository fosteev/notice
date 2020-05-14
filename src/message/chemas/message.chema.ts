import * as mongoose from 'mongoose';

export const MessageChema = new mongoose.Schema({
    text: String,
    room: String,
    user: String,
    date: Date
});
