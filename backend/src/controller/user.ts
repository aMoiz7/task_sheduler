import { NextFunction, Request, Response } from "express";
import { userSchema} from "../model/user";
import { asynchandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";


const generateAccessToken = async(userid:any) =>{
    try {
      if(!userid) throw new ApiError(400 , "user id not found ");
  
      const finduser  = await userSchema.findById(userid);
      
      if(!finduser) throw new ApiError(400 , "user not find for creating accesstoken")
      //@ts-ignore
      const accessToken:String =  finduser.generateAccessToken()
  
      return accessToken;
    } catch (error:any) {
       throw new ApiError(500 , " error i n generating accesstoken" , error)
    }
     
  

}


export const singUp = asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
   const {username , email , password} =req.body

   if(["username" , "email" , "password"].some((data)=> data.trim() === ' ')){
    throw new ApiError(401 , "all feild are required")
   }

   const checkuser = await userSchema.findOne({email});

   if(checkuser){
    throw new ApiError(400 , "user already exist")
   }

   const user = await  userSchema.create({
    username,
    email , 
    password})

    if(!user){
        throw new ApiError(401 ,"error in creatung user")
    }
        

    res.status(200).json(new ApiResponse(200 , user , "user creates succesfully" ))
    

})



export const singin = asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { email , password} = req.body
 
    if([ "email" , "password" ].some((data)=> data.trim() === ' ')){
     throw new ApiError(401 , "all feild are required")
    }
 
    const user = await userSchema.findOne({email});
 
    if(!user){
     throw new ApiError(400 , "user not exist")
    }
    //@ts-ignore
    const isvalipassword = user.ispasswordCorrect(password)

    if(!isvalipassword) throw new ApiError(400 , "invalid credentials")

        const accessToken = await generateAccessToken(user._id);
     
        if (!accessToken) throw new ApiError(500, "Error in creating access token");

        const option = {
            httpOnly: true,
            secure: true
        };

        const returnUser = await userSchema.findOne({ email }).select("-password");
         
 
     res.status(200).cookie("accessToken" , accessToken , option).json(new ApiResponse(200 , returnUser , "user login succesfully" ))
     
 
 })