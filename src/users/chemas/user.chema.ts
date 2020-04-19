import * as mongoose from 'mongoose';

export const UserChema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: String
});