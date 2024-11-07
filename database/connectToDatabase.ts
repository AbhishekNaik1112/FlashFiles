import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI: string = process.env.MONGO_URI || '';

const DatabaseConnection = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("🗄️ Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default DatabaseConnection;
