import { model, Schema, Types } from "mongoose";
import { taskType } from "../../utils/common/enum";

const taskSchema= new Schema({
    name:{
        type:String,
        unique: [true, 'name is required'],
        trim: true,
        minLength: [2, 'too short subCategory name']
    },
    text: String,
    list:{ type: [Object]},
    slug:{
        type: String,
        lowercase: true,
        required: true
    },
    type:{
        type: Boolean,
        enum:taskType.SHARED,
        default:'shared'
    },
    category:{
        type: Types.ObjectId,
        ref: 'Category'
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true , versionKey: false})

export const Task = model('Task', taskSchema)