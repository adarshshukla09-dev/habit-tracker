import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export default function connectDB() {
  main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect(process.env.MONGO_URI);
  }
}
