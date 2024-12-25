import mongoose from 'mongoose';
import { DBNAME } from './constants.js';
import express from 'express';
import dotenv from 'dotenv';
import DBCONNECT from './db/index.js';
import app from './app.js';

dotenv.config()

// const app=express();

DBCONNECT()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening at port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`Database connection failed error`);
})

// ;(
//     async()=>{
//         try{
//             await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`);
//              app.on('error',(error)=>{
//                      console.log('Error in Connecting' ,error);
//                      throw error;
//              })
//              app.listen(process.env.PORT,()=>{
//                 console.log(`App is running on http://localhost:${process.env.PORT}`);
//              })
//         }catch(error){
//                 console.error('error in connecting to database:',error)
//                 throw error;
//         }
//     }
// )();    // This is a approach but we follow Db Approach.