import { User } from "../../../databases/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/message.js"

export const addUser =async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let user = new User(req.body)
    await category.save()

    res.json({message:'success', category})
}

export const allUsers =async(req, res, next) => {
    let pageNumber = req.query.page * 1 || 1
    const limit = 2
    if(req.query.page<1) pageNumber = 1
    let skip = (parseInt(pageNumber) - 1) * limit
    let users = User.find().skip(skip).limit(limit)
    res.json({message:'success', users})
}

//! get profile
export const  getMyProfile = async (req, res, next) =>{
    return res.status(200).json({data: req.authUser, success: true})
}

//! delete profile
export const deleteProfile = async (req, res, next) => {
    await User.findByIdAndDelete(req.auth._id)
    return res.status(200).json({message: messages.user.deleteProfile, success: true})
}

//! update profile
export const updateProfile = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    //!get data from req
    const { email } = req.body
    if(email) {
        const userExist = await User.findOne({email, _id:{$ne: req.authUser._id}})
        if (userExist) {
            return next(new AppError(messages.user.userAlreadyExist, 409))
        }
    }
    await User.updateOne({_id: req.authUser._id} , req.body, {new: true})
    return res.status(200).json({message: messages.user.updateProfile, success: true})
}