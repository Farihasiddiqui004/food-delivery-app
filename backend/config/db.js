import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Use the MongoDB URI from the environment variable
        const mongoURI = process.env.MONGO_URI;

        // Connect to MongoDB using the URI from the environment variable
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
};
