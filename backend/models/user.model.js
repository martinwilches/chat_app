import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    connectCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

export default mongoose.model('User', userSchema)
