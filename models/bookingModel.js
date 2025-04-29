import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);
const bookingModel = mongoose.model("bookings", bookingSchema)
export default bookingModel;