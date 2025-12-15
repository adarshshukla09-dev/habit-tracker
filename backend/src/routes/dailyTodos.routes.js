import express from "express";
import {
  getOrCreateDay,
  addTask,
  toggleTask,
  deleteTask,
} from "../controllers/dailyTodo.controller.js";

const router = express.Router();

router.post("/day", getOrCreateDay);
router.post("/task/:dayId", addTask);
router.patch("/task/:dayId/:taskIndex", toggleTask);
router.delete("/task/:dayId/:taskIndex", deleteTask);

export default router;
