import slugify from "slugify";
import { Category } from "../../../databases/models/category.model.js";
import { AppError } from "../../../utils/appError.js";

const addCategory =async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let category = new Category(req.body)
    Category.name
    await category.save()

    res.json({message:'success', category})
}

const allCategories =async(req, res, next) => {
    let pageNumber = req.query.page * 1 || 1
    const limit = 2
    if(req.query.page<1) pageNumber = 1
    let skip = (parseInt(pageNumber) - 1) * limit
    let categories = Category.find().skip(skip).limit(limit).filter((Category) => Category.name).sort((Category) => Category.name)
    res.json({message:'success', categories})
}

const getCategory =async(req, res, next) => {
    let category = Category.findById(req.param.id)
    category || next(new AppError('Category not found'))
    !category || res.json({message:'success', category})
}

const updateCategory =async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let category = Category.findByIdAndDelete(req.param.id,req.body,{new: true})
    category || next(new AppError('Category not found'))
    !category || res.json({message:'success', category})
}
const deleteCategory =async(req, res, next) => {
    let category = Category.findByIdAndDelete(req.param.id)
        category || next(new AppError('Category not found'))
        !category || res.json({message:'success', category})
}


export {
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory
}