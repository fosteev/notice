import * as mongoose from 'mongoose';

export const UserChema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },

    password: String,

    rooms: Array,

    friends: Array,
    NotAllowed: Array,
    Banned: Array
});