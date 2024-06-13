import mongoose, { Schema  } from "mongoose";
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"




const user_schema = new Schema({
   username:{
     type:String,
     require :true,
     unique :true,
   },

   email:{
    type:String,
    require:true,
    unique:true
   },
   password:{
    type:String,
    require:true
   },
   role: { type: String, enum: ['user', 'admin'], default: 'user' },

},{timestamps:true})

user_schema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next()
    }

    await bcrypt.hash("password" , 10)
})

user_schema.methods.ispasswordCorrect = async function(password:string){
    return bcrypt.compare(password , this.password)
}


const sec = process.env.SECRET
user_schema.methods.generateAccessToken = async function(){
    return jwt.sign({
        name : this.name,
        email:this.email
    },sec!,{
        expiresIn:"10D"
    })
}


export const userSchema =  mongoose.model("user" , user_schema)