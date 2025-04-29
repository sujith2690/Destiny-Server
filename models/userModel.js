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
    mobile: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    Notifications: [
        {
            content: {
                type: String,
                required: true,
            },
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: 'users',
            },
            bookingId: {
                type: mongoose.Schema.ObjectId,
                ref: 'bookings',
            },
            date: Date,
        },
    ],
    favoritePlaces: [{
        type: mongoose.Types.ObjectId,
        ref: "places",
        required: true
    }]
})

const userModel = mongoose.model('users', userSchema);
export default userModel