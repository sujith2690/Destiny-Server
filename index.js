import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import connectDB from './dataBase.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
// console.log("PORT.......", PORT)
// connectDB()
app.listen(PORT, () => console.log(`App is running -- ${PORT}`))