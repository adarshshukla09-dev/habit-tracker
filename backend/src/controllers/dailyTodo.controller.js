import DailyTodo from "../models/dailyTodo.js";

const userId = "64b000000000000000000001";

// CREATE / GET DAY
export const getOrCreateDay = async (req, res) => {
  try {
    const { date } = req.body;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    let day = await DailyTodo.findOne({ user: userId, date: d });

    if (!day) {
      day = await DailyTodo.create({
        user: userId,
        date: d,
        tasks: [],
      });
    }

    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TASK
export const addTask = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { title } = req.body;

    const day = await DailyTodo.findOne({ _id: dayId, user: userId });
    if (!day) return res.status(404).json({ message: "Day not found" });

    day.tasks.push({ title });
    await day.save();

    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE TASK
export const toggleTask = async (req, res) => {
  try {
    const { dayId, taskIndex } = req.params;

    const day = await DailyTodo.findOne({ _id: dayId, user: userId });
    day.tasks[taskIndex].completed = !day.tasks[taskIndex].completed;

    await day.save();
    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { dayId, taskIndex } = req.params;

    const day = await DailyTodo.findOne({ _id: dayId, user: userId });
    day.tasks.splice(taskIndex, 1);

    await day.save();
    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
