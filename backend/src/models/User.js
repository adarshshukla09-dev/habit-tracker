import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  XP: {
    type: Number,
    default: 0,
  },
});
const User = new mongoose.model("User", UserSchema);
export default User;
