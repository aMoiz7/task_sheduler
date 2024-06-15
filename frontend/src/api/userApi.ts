import axios from "axios";
import  Cookies  from "js-cookie";

interface signIn {
    email :string ,
    password :string
}

interface signUp {
    username :string
    email :string ,
    password :string
}

const URL = `http://localhost:8000/api/v1`;


export const signin = async(data:signIn) =>{

    
 try {
      const res  =await axios.post(`${URL}/user/signin` , data);
       
    

      return res.data
      
 } catch (error) {
    console.error(error)
 }
}


export const signup = async(data:signUp) =>{
    
    try {
         const res  =await axios.post(`${URL}/user/signup` , data);
         return res.data
         
    } catch (error) {
       console.error(error)
    }
   }