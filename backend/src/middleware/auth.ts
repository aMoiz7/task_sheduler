import { NextFunction, Request } from "express";
import { userSchema } from "../model/user";
import { ApiError } from "../utils/apiError";
import { asynchandler } from "../utils/asyncHandler";
import  jwt  from 'jsonwebtoken';

 const auth = asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Barer","");
    
        if(!token)throw new ApiError(400 , "Auth token not found")
    
            const decodedToken = await jwt.verify(token , process.env.SECRET!);
           
            if(!decodedToken) throw new ApiError(400 , "tokon not verify");
  
            
            const User = await userSchema.findOne({ email: decodedToken.email });
             
            if(!User)throw new ApiError(400, "user not found for Auth");
            
            req.userId = User._id;
            req.name = User.name
    
            next();
    } catch (error) {
          throw error
    }
  
  })



  const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
  
  module.exports = { auth, adminAuth };