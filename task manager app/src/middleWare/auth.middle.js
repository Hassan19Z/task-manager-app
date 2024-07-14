import jwt from "jsonwebtoken"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/message.js"
import { User } from "../../databases/models/user.model.js"
import { status } from "../utils/common/enum.js"

export const auth =  (roles) => {
    return async (req, res , next) =>{
        
    const authorization = req.headers.authorization
    if (!authorization) {
        return next(new AppError(messages.token.required, 400))
    }
    if (!authorization.startsWuth('bearer  ')){
        return next(new AppError(messages.token.invalidbearerKey, 400))
    }
    const token = authorization.split('bearer  ')[1]
    const decode = jwt.verify(token, 'my-secret-key')
    if(!decode?._id){
        return next(new AppError(messages.token.invalidPayLoad, 400))
    }
    //!check user
    const authUser = await User.findById(decode._id)
    if(!authUser){
        return next(new AppError(messages.user.userNotFound, 404))
    }
    if(authUser.status==status.OFFLINE){
        return next(new AppError(messages.user.userOffline, 401))
    }
    if (!roles.includes(authUser.role)) {
        return next(new AppError(messages.user.notAuthorized, 401))
    }
    req.authUser = authUser
    next()
    }
}