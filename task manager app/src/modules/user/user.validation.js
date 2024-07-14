import Joi, { required } from "joi";
import { generalValidation } from "../../middleWare/validation.js";

//! update user 
export const updateProfileVal = Joi.object({
    userName: generalValidation.userName,
    email: generalValidation.email,
    password: generalValidation.password,
}).required()