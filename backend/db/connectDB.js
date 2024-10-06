import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv to load environment variables
dotenv.config();

export const connectDB = async () => {
  try {
    console.log("mongo_uri:", process.env.MONGO_URI || "undefined");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB : ", error.message);
    process.exit(1);
  }
};
