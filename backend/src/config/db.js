import mongoose from "mongoose";
export default function connectDB() {
  main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/habitTracker");
  }
}
