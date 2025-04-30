import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import { Types } from "mongoose";
import packageModel from "../models/packageModel.js";

export const bookSlot = async (req, res) => {
    try {
        const userId = req.userId; // This should be set by auth middleware
        const { name, email, date, people, packageId } = req.body;
        const _id = packageId

        const packageDetails = await packageModel.findById(packageId);
        if (!packageDetails) {
            return res.status(404).json({ message: "Package not found." });
        }
        const amount = packageDetails.packageExpense.replace(/[^0-9]/g, '');
        const numericAmount = Number(amount) * people;
        const userDetails = await userModel.findById(userId);
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        let bookingDoc = await bookingModel.findOne({ userId });

        const newBookingEntry = { name, email, date, people, packageId, amount: numericAmount };

        if (bookingDoc) {
            bookingDoc.booking.push(newBookingEntry);
            await bookingDoc.save();
        } else {
            bookingDoc = await bookingModel.create({
                userId,
                booking: [newBookingEntry],
            });
        }

        return res.status(200).json({
            message: 'Booking added successfully',
            booking: bookingDoc,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const userId = req.userId; // Set by auth middleware
        const bookingDoc = await bookingModel.findOne({ userId });
        if (!bookingDoc) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }
        if (!bookingDoc || bookingDoc.booking.length === 0) {
            return res.status(404).json({
                message: 'No bookings found for this user',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings: bookingDoc.booking,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
