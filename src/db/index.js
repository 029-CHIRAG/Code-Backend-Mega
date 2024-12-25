import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DBNAME } from '../constants.js';
import { asyncHandler } from '../utils/asyncHandler.js';
dotenv.config({path:'./env'})

// const DB=()=>{
//     mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`)
// }    // handle with asyncHandler {Don't do}

// asyncHandler(DB)

const DBCONNECT=async ()=>{
    try{
        const connection=await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`);
        console.log(`MongoDb Connected :${connection.connection.host}`);

    }catch(error){
        console.log(`Db Connection Failed:`,error);
        process.exit(1);
    }
}

// const DBCONNECT=()=>{
//     asyncHandler(DB);
// }     {Bkchodi h mtt krio}

export default DBCONNECT;