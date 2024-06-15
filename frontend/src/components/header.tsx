// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onAddTask: () => void;
}


const Header: React.FC<HeaderProps> = ({ onAddTask }) => {

  const navigate = useNavigate()
  const logoutuser = ()=>{
    localStorage.removeItem("accessToken");
     navigate('/signin')
 }
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold"> Admin Task Manager</h1>
      <button 
        onClick={onAddTask}
        className="bg-lime-400 w-48  text-zinc-800 font-bold py-2 px-4 rounded-full"
      >
        Add New Task
      </button>
      <button 
        onClick={logoutuser}
        className="bg-red-700 w-36  rounded-full text-white font-bold py-2 px-4 "
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
