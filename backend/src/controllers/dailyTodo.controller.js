import DailyTodo from "../models/dailyTodo.js";

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getOrCreateDay = async (req, res) => {
  try {
    const { date } = req.body;
    const d = normalizeDate(date);
    let day = await DailyTodo.findOne({ user: req.user.id, date: d });

    if (!day) {
      day = await DailyTodo.create({ user: req.user.id, date: d, tasks: [] });
    }
    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { date, title } = req.body;
    const day = await DailyTodo.findOne({
      user: req.user.id,
      date: normalizeDate(date),
    });
    day.tasks.push({ title });
    await day.save();
    // Return the specific new task for the frontend
    res.json({ task: day.tasks[day.tasks.length - 1] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { taskIndex } = req.params; // This is actually the ID from the URL
    const { date } = req.body;
    const d = normalizeDate(date);
    const userId = req.user.id;

    const day = await DailyTodo.findOne({ user: userId, date: d });
    if (!day) return res.status(404).json({ message: "Day not found" });

    // Use .id() to find by MongoDB _id instead of array index
    const task = day.tasks.id(taskIndex);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await day.save();

    res.json(day);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskIndex } = req.params; // This is the ID
    const { date } = req.body;
    const d = normalizeDate(date);
    const userId = req.user.id;

    const day = await DailyTodo.findOne({ user: userId, date: d });
    if (!day) return res.status(404).json({ message: "Day not found" });

    // Mongoose way to remove a subdocument by ID
    day.tasks.pull({ _id: taskIndex });
    await day.save();

    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDays = async (req, res) => {
  try {
    const userId = req.user.id;
    // Finds all days and sorts them by date (oldest first)
    const days = await DailyTodo.find({ user: userId }).sort({ date: 1 });

    res.json(days);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: err.message });
  }
};
