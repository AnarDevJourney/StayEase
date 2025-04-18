import mongoose from "mongoose";

let connected = false;

const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
