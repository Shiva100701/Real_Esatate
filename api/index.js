import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import  userRouter from './routes/userRoute.js';
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
    console.log('Connected to MongoDb!')
    })
    .catch((err)=>{
    console.log("MogoDb error::error: ", err)
    })

const app = express();  

app.listen(5173, ()=>{
    console.log("Server is running on post 3000")
})



app.use("/api/user", userRouter)