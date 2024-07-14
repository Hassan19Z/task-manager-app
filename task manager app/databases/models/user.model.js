
import { model, Schema } from "mongoose";
import {gender, status, systemRoles} from "../../src/utils/common/enum.js";
import { systemRole } from "../../utils/common/enum.js";
const userSchema = new Schema({
    
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:Object.values(systemRole),
        default: systemRoles.USER
    },
}, {timestamps: true})

export const User= model('user',userSchema)