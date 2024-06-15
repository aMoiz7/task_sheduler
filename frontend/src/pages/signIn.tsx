import React, { useState } from 'react'
import { signin } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const signIn = () => {

    const navigate = useNavigate()
  
   const [data ,  setData] = useState({email:"" , password :""})

    const handler = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
          const {name ,value} = e.target

          setData((prev)=> ({...prev , [name]:value}))
    }

    const loginHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const res = await signin(data)
         
        if(res){
         
          localStorage.setItem("accessToken",res.message )
        }
        if(res.data.role==='admin'){
           navigate('/task')
        }else{
          navigate('/usertask')
        }
    }



  return (
   <div className=' flex justify-center align-middle mt-40'><div className="  flex-col  px-6 py-20  border rounded-2xl  bg-blue-100  border-gray-800  w-1/3  h-5/2 flex justify-center ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
      <form className="space-y-6" onSubmit={loginHandler} method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email"  onChange={handler} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
         
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password"   onChange={handler} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10">Sign in</button>
        </div>
        <p>create a new acccount ? <a href="/signup">SignUp</a></p>
      </form>
     
    </div>
  </div></div>

  )
}

export default signIn