import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js"
import {uploadOnCloud} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken=async(userId)=>{
             try{
                          const user=await User.findById(userId)
                          const accessToken=user.generateAccessToken();
                          const refreshToken=user.generateRefreshToken();
                          user.refreshToken=refreshToken
                          await user.save({validateBeforeSave:false})         // bss save kr checking nakko.

                          return {accessToken,refreshToken}
             }catch(error){
                throw new ApiError(400,'Token error')
             }
}

const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,email,username,password}=req.body    //step 1-get data
    // console.log('Email:',email)
    if(                                                         //step-2 validation
        [fullname,password,email,username].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields required");
    }

    const existedUser= await User.findOne(                         //User will call database step-3 Checking already exist
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
      console.log(avatarLocalPath)

    //step-5 upload Image on Cloudinary.
    const avatar=await uploadOnCloud(avatarLocalPath)  
    console.log(avatar)           //Takes Time.
    const coverImage=await uploadOnCloud(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar Not Found2")
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
        throw new ApiError(500,"Something Went Wrong While Registering.")
     }

     res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully.")
     )

})

const loginUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username && !email){
        throw new ApiError(400,'Username or email required');
    }

    const user=await User.findOne({                                 // find data
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,'User not found');
    }
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,'Password incorrect');
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);


    const loggedinUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(200,{
          user:loggedinUser,accessToken,refreshToken
    },
"User logged in successfully")
})

const logoutUser=asyncHandler(async(req,res)=>{
              await User.findByIdAndUpdate(
                req.user._id,
                {
                    $set:{
                        refreshToken:undefined
                    }
                },{
                    new:true
                }
              )
              const options={
                httpOnly:true,
                secure:true
            }
            return res.status(200).clearCookie("accessToken",options)
            .clearCookie("refreshToken",options).json(new ApiResponse(200,'User Logged Out Successfully'))
})

export {registerUser,loginUser,logoutUser}