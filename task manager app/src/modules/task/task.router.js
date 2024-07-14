import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { addTask, allTask, deleteTask, getTask, updateTask } from "./task.controller.js";



const TaskRouter = Router({mergeParams: true})

TaskRouter
.route('/')
.post(asyncHandler(addTask))
TaskRouter
.route('/')
.get(asyncHandler(allTask))
TaskRouter
.route('/id')
.get( asyncHandler(getTask))
TaskRouter
.route('/id')
.put( asyncHandler(updateTask))
TaskRouter
.route('/id')
.delete( asyncHandler(deleteTask))

export default TaskRouter