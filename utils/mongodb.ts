import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log(error);
  }
};
