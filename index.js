// Standard Library Imports
import express from 'express';
import bodyParser from 'body-parser';

// Third-party Library Imports
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './dataBase.js'
import authRoute from './routes/authRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import packageRouter from './routes/packageRoute.js';

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

connectDB();

app.use('/auth', authRoute);
app.use('/booking', bookingRoute);
app.use("/packages", packageRouter);



const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`App is running on ${PORT}`) })