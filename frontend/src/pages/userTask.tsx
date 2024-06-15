import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTasks from '../userComponents/userTask';
import UserHeader from './../userComponents/header';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/usertask?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  return (
    <div>
        <UserHeader/>
      <UserTasks
        tasks={tasks}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onUpdate={fetchTasks}
      />
    </div>
  );
};

export default UserDashboard;
