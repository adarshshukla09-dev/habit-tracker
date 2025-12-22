import Habit from "../models/Habit.js";
// CREATE
export const createHabit = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title required" });
    }

    const habit = await Habit.create({
      title: title.trim(),
      user: req.user.id,
    });

    res.status(201).json(habit);
  } catch (err) {
    console.log(err.message);

    return res.status(500).json({ message: "Failed to create habit" });
  }
};

// READ
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};

// UPDATE
export const updateHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { title } = req.body;
    const userId = req.user.id;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title required" });
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, user: req.user.id, isActive: true },
      { title: title.trim() },
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Failed to update habit" });
  }
};

// SOFT DELETE
export const deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const userId = req.user.id;

    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, user: userId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ message: "Habit deleted" });
  } catch (err) {
    console.log("cant del");

    res.status(500).json({ message: "Failed to delete habit" });
  }
};
export const getHabitCompletionGraph = async (req, res) => {
  const userId = req.user._id;

  const data = await HabitLog.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
      },
    },
    {
      $group: {
        _id: "$date", // YYYY-MM-DD
        completedCount: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.json(data);
};
