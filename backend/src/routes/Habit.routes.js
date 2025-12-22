import express from "express";
import {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
} from "../controllers/Habit.controller.js";

import {
  toggleHabit,
  getWeekLogs,
} from "../controllers/habitLog.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/c", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:habitId", protect, updateHabit);
router.delete("/:habitId", protect, deleteHabit);

router.post("/:habitId/toggle", protect, toggleHabit);
router.get("/logs/week", protect, getWeekLogs);

export default router;
