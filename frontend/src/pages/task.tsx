import React, { useState, useEffect } from 'react';
import { allTask } from '../api/taskApi'; // Import your API function for fetching tasks
import Tasks from './../components/tasks';
import NewTaskModal from '../components/newTaskModel';
import axios from 'axios';
import Header from './../components/header';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await allTask(currentPage);
        setTasks(response.tasks);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = async () => {
    const response = await allTask(currentPage);
    setTasks(response.tasks);
  };

  const handleAddTask = async (task: { title: string; description: string; dueDate: string; status: string; priority: string }) => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await axios.post('http://localhost:8000/api/v1/task/new', task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks((prevTasks) => [...prevTasks, res.data.task]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <Header onAddTask={() => setIsModalOpen(true)} />
      <Tasks
        id_={tasks._id}
        tasks={tasks}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onUpdate={handleUpdate}
      />
      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddTask} 
      />
    </div>
  );
};

export default TaskManager;
