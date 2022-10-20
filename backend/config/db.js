import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error ${error.message}.red.underline.bold`);
    process.exit(1);
  }
};
