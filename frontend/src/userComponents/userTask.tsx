import React, { useEffect, useState } from 'react';
import TaskEditModal from './userEditModal';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
  assignedUser: { _id: string, email: string } | null;
}

interface UserTasksProps {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onUpdate: () => void;
}

const UserTasks: React.FC<UserTasksProps> = ({
  tasks,
  currentPage,
  totalPages,
  onPageChange,
  onUpdate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  return (
    <div className="flex justify-center mt-36">
      <div className="w-4/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right bg-blue-400">
          <thead className="text-gray-900 uppercase text-xl">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 pl-14 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Due Date</th>
              <th scope="col" className="px-6 py-3">Priority</th>
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
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleEditModal(task)}
                    type="button"
                    className="text-white bg-blue-600 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Update Status
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
          status={selectedTask.status}
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default UserTasks;
