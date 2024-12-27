import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app=express();
app.use(cors());
app.use(express.json({limit:"16kb"}))   // accept json file
app.use(express.urlencoded());
app.use(express.static('Public'));
app.use(cookieParser());


//router defination
import router from './routes/user.routes.js';
app.use("/api/v1/users",router);   //Creating a middleware for now it will go to userRouter.From there we can run controllers.

export default app;