// controllers/taskController.js
import { userSchema } from "../model/user";
import {  taskschema } from "../model/task";
import { asynchandler } from './../utils/asyncHandler';
import { Request, Response } from "express";

// Create a new task
export const createTask = asynchandler(async(req:Request, res:Response) => {
    const { title, description, dueDate, priority } = req.body;
  
    try {
      const task = new taskschema({ title, description, dueDate, priority });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })

// Get all tasks with pagination


export const getTasks = asynchandler(async (req, res) => {
    const { page = 1, limit = 10, status }:any = req.query;
  
    try {
      const query = status ? { status } : {};
      const tasks = await taskschema.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await taskschema.countDocuments(query);
  
      res.status(200).json({
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })



// Get a specific task by ID
export const getTaskById = asynchandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await taskschema.findById(id).populate('assignedUser', 'name email');
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })





// Edit a task
export const updateTask = asynchandler(async (req, res) => {
    const { id } = req.params;
    const  { title, description, dueDate,  } = req.body;
  
    try {
      const task = await taskschema.findById(id).populate('assignedUser', 'name email');
      
      

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if(title){
        task.title = title
      }
      if(description){
        task.description =description
      }

      if(dueDate){
        task.dueDate = dueDate
      }

    await task.save()

    const updatedtask = await taskschema.findById(id).populate('assignedUser', 'name email');

      res.status(200).json(updatedtask);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })

// Delete a task
export const deleteTask = asynchandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await taskschema.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })

// Update task status
export const updateTaskStatus = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const task = await taskschema.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.status = status;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })

// Assign task to user




  export const assignTaskToUser = asynchandler(async (req, res) => {
    const { id } = req.params; // Task ID
    const { assignedUserId } = req.body; // User ID to assign task to and new status
    
    try {
      const task = await taskschema.findById(id); // Find task by ID
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      const user = await userSchema.findById(assignedUserId); // Find task by ID
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      // Update task fields
      task.assignedUser = user._id; // Assign task to user by setting assignedUser field
      await task.save(); // Save updated task
      res.status(200).json(task); // Respond with updated task document
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

  
 
