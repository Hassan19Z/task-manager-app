import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { signIn, signUP, verifyAccount } from "./auth.controller.js";
import { validation } from "../../middleWare/validation.js";
import { signINValidation, signUPVal } from "./auth.validation.js";

const authRouter = Router()
//! sign up
authRouter.post('/signup',validation(signUPVal), asyncHandler(signUP))

authRouter.get('/verify-account', asyncHandler(verifyAccount))

//! sign in 
authRouter.post('/sign-in', validation(signINValidation), asyncHandler(signIn))
export { authRouter }