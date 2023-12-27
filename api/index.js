import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDb!')
}).catch((err)=>{
    console.log("MogoDb error::error: ", err)
})

const app = express();                          
app.listen(3000, ()=>{
    console.log("Server is running on post 3000")
}
)