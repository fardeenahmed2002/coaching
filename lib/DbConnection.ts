import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(uri);

    console.log("Database connected");
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export default connectToDb;