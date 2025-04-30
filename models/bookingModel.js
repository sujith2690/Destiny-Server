import mongoose from "mongoose";

// Sub-schema for each individual booking entry
const singleBookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        packageId: {
            type: mongoose.Types.ObjectId,
            ref: "packages",
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        people: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    booking: [singleBookingSchema],
});

const bookingModel = mongoose.model("bookings", bookingSchema);
export default bookingModel;
