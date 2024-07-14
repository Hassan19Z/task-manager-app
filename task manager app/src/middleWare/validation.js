import Joi from "joi"
import { AppError } from "../utils/appError.js"
import { gender } from "../utils/common/enum.js"

export const generalValidation = {
    userName: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern('/^[A-Z][a-z0-9A-Z]{8,40}$/'),
    rePassword:Joi.valid(Joi.ref('password')),
    gender: Joi.string().valid(...Object.values(gender)),
    age: Joi.number().integer().min(15).max(100)
}
export const validation = (schema) => {
    return (req,res,next) => {
        let data = {...req.body,...req.params,...req.query}
       const {error} = schema.validate(data,{abortEarly: false})
       if (error) {
        const errorArr= error.details.map(err => err.message)
        // todo throw arrY TO GLOBAL ERROR HANDLER
        return next(new AppError(errorArr, 400))
       }
       next()
    }
}