// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';



const userHeader = () => {

  const navigate = useNavigate()
  const logoutuser = ()=>{
    localStorage.removeItem("accessToken");
     navigate('/signin')
 }
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>
     
      <button 
        onClick={logoutuser}
        className="bg-red-700 w-36  text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </header>
  );
};

export default userHeader;
