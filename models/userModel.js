import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
})

const userModel = mongoose.model('users', userSchema);
export default userModel