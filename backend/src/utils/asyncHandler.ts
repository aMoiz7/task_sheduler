import { NextFunction, Request, Response } from "express";

export const asynchandler = (fun:(req:Request,res:Response,next:NextFunction)=>Promise<void>) => {
    return (req:Request,res:Response,next:NextFunction)=>{
      Promise.resolve(fun(req,res,next)).catch((error) => next(error))
    } 
}