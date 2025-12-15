import express from "express";
import {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabits,
} from "../controllers/Habit.controller.js";

import {
  toggleHabit,
  getWeekLogs,
} from "../controllers/habitLog.controller.js";

const router = express.Router();

router.post("/c", createHabit);
router.get("/", getHabits);
router.put("/:habitId", updateHabits);
router.delete("/:habitId", deleteHabit);

router.post("/:habitId/toggle", toggleHabit);
router.get("/logs/week", getWeekLogs);

export default router;
