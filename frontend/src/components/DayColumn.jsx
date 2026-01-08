import React, { useEffect, useState, useMemo } from "react";
import todoApi from "../api/todo.api.js";
import { Userapi } from "../api/User.api.js";

const DayColumn = ({ date, dayName }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  // 1. Load tasks for the day
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await todoApi.post("/day", { date });
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [date]);

  // 2. Derived stats
  const stats = useMemo(() => {
    const safeTasks = tasks.filter(Boolean);
    const total = safeTasks.length;
    const completed = safeTasks.filter((t) => t.completed).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, progress };
  }, [tasks]);

  // 3. Derived XP
  const XP = stats.completed * 10;

  // 4. Toggle task completion
  const toggleTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      const isCompleting = !task.completed;

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        )
      );

      await todoApi.put(`/task/${taskId}`, { date });

      // Add/Remove XP
      if (isCompleting) {
        await Userapi.put("/auth/addXp");
      } else {
        await Userapi.put("/auth/removeXp");
      }
    } catch (err) {
      console.error("Toggle Failed", err);
    }
  };

  // 5. Add task
  const handleAddTask = async (e) => {
    if (e.key === "Enter" && title.trim()) {
      try {
        const res = await todoApi.post("/task", { date, title });
        if (res.data.task) {
          setTasks((prev) => [...prev, res.data.task]);
        }
        setTitle("");
        setShowInput(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-w-[300px] bg-white/30 backdrop-blur-md border border-gray-300 shadow-md rounded-md flex flex-col">
      {/* Header */}
      <div className="bg-black/60 text-white p-4 text-center rounded-t-md">
        <h2 className="text-xl font-bold tracking-tight">{dayName}</h2>
      </div>

      {/* Tasks */}
      <div className="p-4 flex-1 space-y-3 min-h-[300px]">
        {!loading &&
          tasks.map(
            (task) =>
              task && (
                <div
                  key={task._id}
                  onClick={() => toggleTask(task._id)}
                  className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition ${
                    task.completed
                      ? "bg-green-100 line-through text-gray-500"
                      : "bg-white/70 hover:bg-white/90"
                  }`}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center border rounded ${
                      task.completed ? "bg-green-400" : "bg-white border-gray-400"
                    }`}
                  >
                    {task.completed && "✓"}
                  </div>
                  <span className="flex-1 text-lg font-medium">{task.title}</span>
                </div>
              )
          )}

        <button
          onClick={() => setShowInput(true)}
          className="w-full py-2 border border-dashed border-gray-400 rounded font-bold text-sm hover:border-black transition"
        >
          + ADD NEW QUEST
        </button>

        {showInput && (
          <input
            autoFocus
            onKeyDown={handleAddTask}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full border border-gray-400 p-2 rounded mt-2 outline-none"
            placeholder="TYPE QUEST..."
          />
        )}
      </div>

      {/* XP / Progress */}
      <div className="bg-gray-100/50 backdrop-blur-sm p-3 flex justify-between items-center text-sm font-bold rounded-b-md">
        <span>XP: {XP}</span>
        <div className="flex-1 ml-2 h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <span className="ml-2">{stats.progress}%</span>
      </div>
    </div>
  );
};

export default DayColumn;
