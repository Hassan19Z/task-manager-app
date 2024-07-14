import slugify from "slugify";
import { AppError } from "../../../utils/appError.js";
import { Task } from "../../../databases/models/task.model.js";

const addTask =async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let task = new Task(req.body)
    await task.save()

    res.json({message:'success', task})
    const checkType=jwt.sign({type:Task.type}, 'my-secret-key')

return res.status(200).json({message: `type is ${Task.type}`, success: true, data: checkType})
}

const allTask =async(req, res, next) => {
    let pageNumber = req.query.page * 1 || 1
    const limit = 2
    if(req.query.page<1) pageNumber = 1
    let skip = (parseInt(pageNumber) - 1) * limit

    let filterObj = {}
    if(req.params.category) filterObj.category = q.params.category
    let tasks = Task.find(filterObj).skip(skip).limit(limit).filter((Task) => Task.type).sort((Task) => Task.type)
   
    const checkType=jwt.sign({type:Task.type}, 'my-secret-key')
return res.status(200).json({message: `type is ${Task.type}`, success: true, data: checkType , tasks})
}

const getTask =async(req, res, next) => {
    let task = Task.findById(req.param.id)
    task || next(new AppError('task not found'))
    !task || res.json({message:'success', task})
    const checkType=jwt.sign({type:Task.type}, 'my-secret-key')

return res.status(200).json({message: `type is ${Task.type}`, success: true, data: checkType})
}

const updateTask =async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let task = Task.findByIdAndDelete(req.param.id,req.body,{new: true})
    task || next(new AppError('task not found'))
    !task || res.json({message:'success', task})
    const checkType=jwt.sign({type:Task.type}, 'my-secret-key')

return res.status(200).json({message: `type is ${Task.type}`, success: true, data: checkType})
    
}
const deleteTask =async(req, res, next) => {
    let task = Task.findByIdAndDelete(req.param.id)
        task || next(new AppError('task not found'))
        !task || res.json({message:'success', task})
}

export {
    addTask,
    allTask,
    getTask,
    updateTask,
    deleteTask,
}