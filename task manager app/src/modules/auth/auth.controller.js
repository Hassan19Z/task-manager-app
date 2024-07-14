import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { User } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/appError.js";
import sendEmail from '../../utils/sendEmail.js';
import { messages } from '../../utils/common/message.js';
import { status } from '../../utils/common/enum.js';

//? sign up
export const signUP = async (req, res, next) =>  {
    //! get data from req
    const {userName, email, password, age, gender} = req.body
    console.log(userName, email, password, age, gender);
    
    //! check existence
    const userExist = await User.findOne({ email })
    if(userExist && userExist.verifyEmail == true){
        return next(new AppError(messages.user.userAlreadyExist,409))
        }
    if(userExist && userExist.verifyEmail == false){
        const token = jwt.sign({email}, 'my-secret-key' , {expiresIn: '5m'} )
        sendEmail({
            to:email,subject:"verify account",message:`<p>to verify your account click<a href="http://localhost:3000/vauth/erify-account?token=${token}">here</a></p>`
        })
    }
    //! hash password
    const hashPassword = bcrypt.hashSync(password,10)
    //! prepare user
    const user = new User(
        {
            userName,
            email,
            password: hashPassword,
            age,
            gender
           }
    )
    //! save user
    const createUser = await user.save()
    //! create token
    const token = jwt.sign({email}, 'my-secret-key', {expiresIn: '5m'}) 
    //! send email
    sendEmail({
        to:email,subject:"verify account",message:`<p>to verify your account click<a href="http://localhost:3000/auth/verify-account?token=${token}">here</a></p>`
    })
    //! send response
    return res.status(201).json({message: messages.user.createUser, success: true, data: createUser })
}

export const verifyAccount = async (req, res, next) => {
    //!  get data from req
    const { token } = req.query
    const decode = jwt.verify(token, 'my-secret-key')
    if (decode?.email) {
        return next(new AppError(messages.token.invalidToken, 400))
    }
    const user = await User.findByIdAndUpdate({
        email:decode.email , verifyEmail: false
    },
{verifyEmail: true}
)
if(!user){
    return next(new AppError(messages.user.userNotFound, 404))
}
return res.status(200).json({message: messages.user.verifyAccount, success: true })
}
//? sign in
export const signIn = async (req, res, next ) => {
    //! get data from feq
    const {email, password} = req.body
    //! check existence
    const userExist = await User.findOne({email, verifyEmail: true})
    if(!userExist){
        return next(new AppError(messages.user.invalidCredentioals,404 ))
    }
    //!check password
    const match = bcrypt.compareSync(password, userExist.password)
    if(!match){
        return next(new AppError(messages.user.invalidCredentioals,401 ))
    }
    //! update user status
    userExist.status= status.ONLINE
    //! create token
    const accessToken=jwt.sign({_id:userExist._id}, 'my-secret-key',{expiresIn: '12h'})
    //!send response
    return res.status(200).json({message: messages.user.signInSuccessfully, success: true, data: accessToken})
}