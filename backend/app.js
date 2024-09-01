import express from 'express'
import conn from './conn/conn.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './Routes/user.route.js'
import blogroute from './Routes/blogs.route.js'

dotenv.config({});

const app = express();


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsoption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsoption))
const PORT = process.env.PORT || 3000;

// calling apis
app.use('/api/v1/user', userRoute)       //user api
app.use('/api/v1/blog', blogroute)

app.listen(PORT, () => {
    conn()
    console.log("Server Started", PORT)
})