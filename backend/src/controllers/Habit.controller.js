import Habit from "../models/Habit.js";

const userId = "64b000000000000000000000001";

// CREATE
export const createHabit = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const habit = await Habit.create({
      title,
      // user: userId,
    });

    res.status(201).json(habit);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      // user: userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateHabits = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { title } = req.body;

    await Habit.findOneAndUpdate(
      {
        _id: habitId,
        //  user: userId
      },
      { title }
    );

    res.json({ message: "Habit updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SOFT DELETE
export const deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    await Habit.findOneAndUpdate(
      { _id: habitId, user: userId },
      { isActive: false }
    );

    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
