import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { auth } from "../../middleWare/auth.middle.js";
import { addUser, allUsers, deleteProfile, getMyProfile, updateProfile } from "./user.controller.js";
import { validation } from "../../middleWare/validation.js";
import { updateProfileVal } from "./user.validation.js";

const userRouter = Router()

categoryRouter
.route('/')
.post('/',auth, asyncHandler(addUser))
categoryRouter
.route('/')
.get('/',auth, asyncHandler(allUsers))
categoryRouter
.route('/')
.get('/',auth, asyncHandler(getMyProfile))
categoryRouter
.route('/')
.put('/',auth, asyncHandler(updateProfile))
categoryRouter
.route('/')
.delete('/',auth, asyncHandler(updateProfile))
export {userRouter}