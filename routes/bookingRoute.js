import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { bookSlot, getAllBookings } from '../controllers/slotBooking.js';


const bookingRoute = express.Router()

bookingRoute.post("/addBooking", authMiddleware, bookSlot)
bookingRoute.get('/bookings', authMiddleware, getAllBookings);



export default bookingRoute;