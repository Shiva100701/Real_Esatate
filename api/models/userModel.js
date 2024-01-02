import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    }, {timestamps: true} //timestamp automatically tracks the creation and updation of the user and it help us while sorting the user information.
);

const user = mongoose.model('User', userSchema)

export default user;