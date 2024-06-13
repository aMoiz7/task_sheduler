import mongoose, { Schema  } from "mongoose";
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"
import { userSchema } from './user';




const task_schema = new Schema({
   title:{
     type:String,
     require :true,
   },

   description:{
    type:String,
    require:true,
   },
   status:{
    type :  String,
    enum:["Pending" ,"Inprogress" , "Done" ],
    default:"Pending"

   },
   dueDate: { type: Date, required: true },
   assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' },

   
},{timestamps:true})


module.exports = mongoose.model('Task', task_schema);
