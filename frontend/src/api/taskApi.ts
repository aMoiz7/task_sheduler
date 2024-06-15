import axios from 'axios';
import Cookies from 'js-cookie';

const URL = 'http://localhost:8000/api/v1';

;

export const allTask = async (page = 1, limit = 10, status = '') => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');

  try {
    const res = await axios.get(`${URL}/task/`, {
      params: { page, limit, status }, // Pass pagination parameters as query params
      headers: {
        Authorization: `Bearer ${token}`, // Ensure 'Bearer ' prefix for JWT
      },
    });
    return res.data; // Return the response data (tasks, totalPages, currentPage)
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Optionally handle errors or rethrow
  }
};



export const Task = async (id) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');

  try {
    const res = await axios.get(`${URL}/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure 'Bearer ' prefix for JWT
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Optionally handle errors or rethrow
  }
};


export const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.patch(`${URL}/task/${id}`, taskData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

