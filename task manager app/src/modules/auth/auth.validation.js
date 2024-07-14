import Joi from "joi";
import { generalValidation } from "../../middleWare/validation.js";

export const signUPVal= Joi.object({
    userName: generalValidation.userName,
    email: generalValidation.email,
    password: generalValidation.password,
    rePassword: generalValidation.rePassword,
    age: generalValidation.age,
    gender: generalValidation.gender
}).required()

export const signINValidation = Joi.object({
    email: generalValidation.email.required(),
    password: generalValidation.password.required
}).required 