import mongoose from "mongoose";
let isConnected = false;
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://tudxt:SXdoLYZAZmPujea6@ecomcluster.ou6bxaa.mongodb.net/?appName=ECOMCluster";
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(DATABASE_URL);
    isConnected = true;
    console.log("Conneted to MongoDB succesful!");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default connectDB;
