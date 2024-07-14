import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/taskManger')
        console.log('mongoDB connected successfully')
    }
    catch (error) {
        console.log(error);
    }
}