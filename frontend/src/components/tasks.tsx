import React, { useEffect, useState } from 'react';
import TaskEditModal from './TaskEditModal';
import axios from 'axios';
import ConfirmationModal from './comformationModel';

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
  assignedUser: { _id: string, email: string } | null;
}

interface TaskProps {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onUpdate: () => void;
}

const Tasks: React.FC<TaskProps> = ({
  tasks,
  currentPage,
  totalPages,
  onPageChange,
  onUpdate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


  const toggleEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-300';
      case 'medium':
        return 'bg-yellow-300';
      case 'low':
        return 'bg-green-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Inprogress':
        return 'bg-yellow-300';
      case 'Pending':
        return 'bg-blue-300';
      case 'Done':
        return 'bg-green-300';
      default:
        return 'bg-gray-300';
    }
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i}>
        <a
          href="#"
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
            currentPage === i ? 'text-blue-600 bg-blue-50' : ''
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      </li>
    );
  }

  const openConfirmModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setTaskToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(`http://localhost:8000/api/v1/task/${taskToDelete}` ,{headers});
      onUpdate();
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
   
  return (
    <div className="flex justify-center mt-36">
      <div className="w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right bg-blue-400">
          <thead className="text-gray-900 uppercase text-xl">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 pl-14 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Due Date</th>
              <th scope="col" className="px-6 py-3">Priority</th>
              <th scope="col" className="px-6 py-3">Assigned User</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="bg-blue-100 border-b hover:bg-blue-200">
                <td className="p-4"></td>
                <td className="px-4 py-4 font-semibold text-xl text-black whitespace-nowrap">{task.title}</td>
                <td className={`px-2 py-2 ${getStatusClass(task.status)} rounded-lg font-semibold text-lg pl-12`}>
                  {task.status}
                </td>
                <td className="px-0 py-4 font-semibold text-lg pl-8">{task.dueDate}</td>
                <td className={`px-6 py-4 ${getPriorityClass(task.priority)} font-semibold text-lg pl-16 rounded-xl`}>
                  {task.priority}
                </td>
                <td className="px-4 py-4 font-semibold text-xl text-black whitespace-nowrap">
                  {task.assignedUser ? `Id : ${task.assignedUser} ` : 'Not Assigned'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleEditModal(task)}
                    type="button"
                    className="text-white bg-blue-600 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                <button
                    onClick={() => openConfirmModal(task._id)}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex items-center flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-black mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalPages)}
            </span>{' '}
            of <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {paginationItems}
          </ul>
        </nav>
      </div>
      {selectedTask && (
        <TaskEditModal
          id={selectedTask._id}
          title={selectedTask.title}
          status={selectedTask.status}
          dueDate={selectedTask.dueDate}
          priority={selectedTask.priority}
          description={selectedTask.description}
          email={selectedTask.assignedUser ? selectedTask.assignedUser.email : ''}
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}

<ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default Tasks;
