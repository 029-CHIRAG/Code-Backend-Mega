import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js"
import {uploadOnCloud} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,email,username,password}=req.body    //step 1-get data
    // console.log('Email:',email)
    if(                                                         //step-2 validation
        [fullname,password,email,username].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields required");
    }

    const existedUser= User.findOne(                         //User will call database step-3 Checking already exist
        {
            $or:[{username},{email}]                        //this is for checking multiple things
        }
    )
    if(existedUser){
        throw new ApiError(409,"User already exist")
    }

    //step-4 image uploadation
    const avatarLocalPath=req.files?.avatar[0]?.path;              // this will give us local path provided by multer.
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
            throw new ApiError(400,"Avatar Not Found")
    }

    //step-5 upload Image on Cloudinary.
    const avatar=await uploadOnCloud(avatarLocalPath)             //Takes Time.
    const coverImage=await uploadOnCloud(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar Not Found")
    }

    //Upload on db
   const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")
     if(!createdUser){
        throw new ApiError(500,"Something Wen Wrong While Registering.")
     }

     res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully.")
     )

})

export {registerUser}