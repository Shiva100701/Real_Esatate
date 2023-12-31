import user from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({
        message: "Hello World"
    })
}


export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler, ("Ypu can only update your own account"));
    try {
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest);
    } catch (error) {
        next(error)
        
    }
};

export const deleteUser = async (req, res, next) =>{
 if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
 try {
    await user.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json('User has been deleted')
 } catch (error) {
    next(error)
 }
}