import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
export const verifyJWT=asyncHandler(async(req,res,next)=>{
      try {
         const token=req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ","")      //we have provided cookie by cookie-parser
         if(!token){
          throw new ApiError(401,'Unauthorized request')
         }
  
         const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
         const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
  
         if(!user){
          throw new ApiError(401,'Invalid Access Token')
         }
  
         req.user=user;
         next()
      } catch (error) {
        throw new ApiError(401,'invalid')
      }
})