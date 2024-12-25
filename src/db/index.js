import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DBNAME } from '../constants.js';
dotenv.config({path:'./env'})

const DBCONNECT=async ()=>{
    try{
        const connection=await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`);
        console.log(`MongoDb Connected :${connection.connection.host}`);

    }catch(error){
        console.log(`Db Connection Failed:`,error);
        process.exit(1);
    }
}

export default DBCONNECT;