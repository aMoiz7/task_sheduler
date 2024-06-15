import { Router } from "express";
import {auth ,adminAuth} from "../middleware/auth"
import { assignTaskToUser, createTask, deleteTask, getTaskById, getTasks, updateTask, updateTaskStatus } from "../controller/task";
 const router = Router()


router.post('/new', auth, createTask);               // Task creation
router.get('/', auth, getTasks);                  // Get all tasks
router.get('/:id', auth, getTaskById);           // Get specific task by ID
router.patch('/:id', auth, updateTask);          // Edit task
router.delete('/:id', auth, deleteTask);   
      // Delete task
router.put('/:id', auth, updateTaskStatus);         // Delete task

  // Update task status
router.patch('/assign', auth, adminAuth, assignTaskToUser); // Assign task

export default router