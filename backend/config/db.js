import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:admin@myapp-cluster.a2t8f.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}