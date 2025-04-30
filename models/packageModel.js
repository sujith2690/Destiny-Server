// models/packageModel.js
import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        packageExpense: {
            type: String, // or Number if you prefer to handle pricing as numeric
            required: true,
        },
    },
    { timestamps: true }
);
const packageModel = mongoose.model("packages", packageSchema);
export default packageModel;
