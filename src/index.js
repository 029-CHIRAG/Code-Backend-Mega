import mongoose from 'mongoose';
import { DBNAME } from './constants.js';
import express from 'express';
import dotenv from 'dotenv';
import DBCONNECT from './db/index.js';

dotenv.config()

const app=express();

DBCONNECT();

;(
    async()=>{
        try{
            await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`);
             app.on('error',(error)=>{
                     console.log('Error in Connecting' ,error);
                     throw error;
             })
             app.listen(process.env.PORT,()=>{
                console.log(`App is running on http://localhost:${process.env.PORT}`);
             })
        }catch(error){
                console.error('error in connecting to database:',error)
                throw error;
        }
    }
)();