import { NextFunction, Request } from "express";
import { userSchema } from "../model/user";
import { ApiError } from "../utils/apiError";
import { asynchandler } from "../utils/asyncHandler";
import  jwt  from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(400, 'Auth token not found');
    }

    console.log(token,"backend")

    const decodedToken = jwt.verify(token, process.env.SECRET!);

    if (!decodedToken) {
      throw new ApiError(400, 'Token not verified');
    }

    const { email } = decodedToken as { email: string }; // Assuming the decoded token has an email field

    const user = await userSchema.findOne({ email });

    if (!user) {
      throw new ApiError(400, 'User not found for given token');
    }

    // Attach user information to the request object for later use
    req.userId = user._id; // Assuming user._id is the MongoDB ObjectId
    req.name = user.name; // Assuming user.name is the name of the user

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(error); // Pass the error to the next error-handling middleware
  }
};



  export const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
  
