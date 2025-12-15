import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const genrateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const isMatch = await User.findOne({ email });
    if (isMatch) {
      return res.status(400).json({ message: "user already exist " });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password });
    const token = genrateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,

      sameSite: "None",
    });

    res.status(201).json({
      message: "User registered ",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(email).select("+password");
    if (!user) return res.status(500).json({ message: "user donot exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    const token = genrateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,

      sameSite: "None",
    });

    res.status(201).json({
      message: "User logged in",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
export const getUser = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
