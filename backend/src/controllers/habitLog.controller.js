import HabitLog from "../models/HabitLog.js";
import Habit from "../models/Habit.js";

// const userId = "64b000000000000000000000001";

// TOGGLE HABIT FOR DATE
export const toggleHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body; // YYYY-MM-DD
    const userId = req.user.id;

    if (!date) {
      return res.status(400).json({ message: "Date required" });
    }

    // ensure habit exists
    const habit = await Habit.findOne({
      _id: habitId,
      user: userId,
      isActive: true,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const existing = await HabitLog.findOne({
      habit: habitId,
      user: userId,
      date,
    });

    if (existing) {
      existing.completed = !existing.completed;
      await existing.save();
      return res.json(existing);
    }

    const log = await HabitLog.create({
      habit: habitId,
      user: userId,
      date,
      completed: true,
    });

    res.status(201).json(log);
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET WEEK LOGS
export const getWeekLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // YYYY-MM-DD
    const userId = req.user.id;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate required" });
    }

    const logs = await HabitLog.find({
      date: { $gte: startDate, $lte: endDate },
      user: userId,
    }).populate("habit");

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
