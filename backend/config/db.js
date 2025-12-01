import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Khushbu_Project:usxk2dGh9aWsGoaP@cluster0.xnti8.mongodb.net/food-delivery').then(()=>console.log("db connected"));
}