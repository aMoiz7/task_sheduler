import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";


export const dbconnect = async()=>{
   try {
     const Dbconection = await mongoose.connect(process.env.DB_URI!)
     
 
     console.log(Dbconection.connection.host , "mongoose connection succesfully");
 
     
 
 
   } catch (error:any) {
    console.log(error)
      throw new ApiError(500 , error.message)
   }
}