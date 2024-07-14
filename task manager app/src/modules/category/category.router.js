import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from "./category.controller.js";
import TaskRouter from "../task/task.router.js";



const categoryRouter = Router()

categoryRouter.use('/:id/tasks', TaskRouter)
categoryRouter
.route('/')
.post('/', asyncHandler(addSubCategory))
categoryRouter
.route('/')
.get('/', asyncHandler(allSubCategories))
categoryRouter
.route('/')
.get('/', asyncHandler(getSubCategory))
categoryRouter
.route('/')
.put('/', asyncHandler(updateSubCategory))
categoryRouter
.route('/')
.delete('/', asyncHandler(deleteSubCategory))

export default categoryRouter