import express from "express";
import {
  register,
  Login,
  logout,
  getUser,
  getXP,
  AddXP,
  removeXP,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/me", protect, getUser);
router.put("/addXp", protect, AddXP);
router.put("/removeXp", protect, removeXP);
router.get("/getXp", protect, getXP);
export default router;
