import express from "express";
import {
  getOrCreateDay,
  addTask,
  toggleTask,
  deleteTask,
  getAllDays,
} from "../controllers/dailyTodo.controller.js";

const router = express.Router();
import protect from "../middleware/auth.middleware.js";

// Create or get a day
router.post("/day", protect, getOrCreateDay);

// Add a task to a day
router.post("/task", protect, addTask);

// Toggle task completion
router.put("/task/:taskIndex", protect, toggleTask);

// Delete a task
router.delete("/task/:taskIndex", protect, deleteTask);
router.get("/all", protect, getAllDays);
export default router;
