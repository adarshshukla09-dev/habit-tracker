import { useState, useEffect } from "react";
import habitApi from "../api/habit.api.js";
import HabitGraph from "./HabitGraph.jsx";
const formatDate = (date) => date.toISOString().split("T")[0];

const getLastNDays = (n) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  return days;
};

const toggleLog = (logs = [], date) => {
  const existing = logs.find((l) => l.date === date);
  if (existing) {
    return logs.map((l) =>
      l.date === date ? { ...l, completed: !l.completed } : l
    );
  }
  return [...logs, { date, completed: true }];
};

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [graph, setGraph] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [graphRange, setGraphRange] = useState(31);

  const weekDates = getLastNDays(7); // table view
  const graphDates = getLastNDays(graphRange); // graph view
  const today = new Date();

  const graphData = graphDates.map((date) => {
    const dateKey = formatDate(date);
    let count = 0;

    habits.forEach((habit) => {
      habit.logs?.forEach((log) => {
        if (log.date === dateKey && log.completed) {
          count++;
        }
      });
    });

    return {
      date: dateKey,
      count,
    };
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthString = monthNames[today.getMonth()];

  useEffect(() => {
    const fetchhabit = async () => {
      const graphDates = getLastNDays(31);

      const startDate = formatDate(graphDates[0]);
      const endDate = formatDate(graphDates[30]);

      // ✅ NEW: fetch all habits
      const habitsRes = await habitApi.get("/");

      // existing logs fetch
      const res = await habitApi.get(
        `/logs/week?startDate=${startDate}&endDate=${endDate}`
      );

      const habitsMap = {};

      // initialize all habits (even without logs)
      habitsRes.data.map((habit) => {
        habitsMap[habit._id] = {
          _id: habit._id,
          title: habit.title,
          logs: [],
        };
      });

      res.data.forEach((log) => {
        if (!log.habit) return; // 🔑 guard

        const habitId = log.habit._id;
        if (habitsMap[habitId]) {
          habitsMap[habitId].logs.push({
            date: log.date,
            completed: log.completed,
          });
        }
      });

      setHabits(Object.values(habitsMap));
    };

    fetchhabit();
  }, []);

  const startEdit = (habit) => {
    setEditingId(habit._id);
    setEditTitle(habit.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = async (habitId) => {
    if (!editTitle.trim()) return;

    const res = await habitApi.put(`/${habitId}`, {
      title: editTitle,
    });

    setHabits((prev) =>
      prev.map((h) => (h._id === habitId ? { ...h, title: res.data.title } : h))
    );

    cancelEdit();
  };

  const removeHabit = async (habitId) => {
    await habitApi.delete(`/${habitId}`);
    setHabits((prev) => prev.filter((h) => h._id !== habitId));
  };

  const add = async () => {
    if (!title.trim()) return;
    const res = await habitApi.post("/c", { title });
    setHabits((prev) => [...prev, { ...res.data, logs: [] }]);
    setTitle("");
    setShowForm(false);
  };

  const log = async (habitId, date) => {
    const dateKey = formatDate(date);
    await habitApi.post(`/${habitId}/toggle`, { date: dateKey });
    setHabits((prev) =>
      prev.map((h) =>
        h._id === habitId ? { ...h, logs: toggleLog(h.logs, dateKey) } : h
      )
    );
  };

  return (
    <div className="habit-tracker-container p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-lg text-black font-sans">
      {/* Header */}
        <h2 className="text-2xl text-center font-bold mb-3 border-b pb-1">
        Habit-Tracker
        </h2>
      <div className="tracker-header flex items-center border-b border-black/20 pb-3 mb-3 text-sm font-bold">
        <div className="flex-[2] pr-3">{monthString}</div>

        <div className="flex-[3] flex justify-between text-xs">
          {weekDates.map((date) => (
            <span key={formatDate(date)} className="flex-1 text-center">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
              <br />
              {date.getDate()}
            </span>
          ))}
        </div>

        <div className="flex-[1.2] pl-3 text-right flex justify-end gap-2">
          <span>PROG</span>
          <button
            onClick={() => setShowForm(true)}
            className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white transition"
          >
            + Add
          </button>
          <button
            onClick={() => setGraph((g) => !g)}
            className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white transition"
          >
            Graph
          </button>
        </div>
      </div>

      {/* Create Habit */}
      {showForm && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="New habit name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black px-2 py-1 text-sm flex-1 rounded"
          />
          <button
            onClick={add}
            className="bg-black text-white px-3 text-sm rounded"
          >
            Save
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="border border-black px-3 text-sm rounded"
          >
            Cancel
          </button>
        </div>
      )}
      {/* Body */}
      <div className="tracker-body flex flex-col gap-2">
        {habits.map((habit) => {
          const completedCount =
            habit.logs?.filter((l) =>
              weekDates.some((d) => formatDate(d) === l.date && l.completed)
            ).length || 0;
          const progress = Math.round(
            (completedCount / weekDates.length) * 100
          );

          return (
            <div
              key={habit._id}
              className="habit-row grid grid-cols-[2fr_3fr_1.2fr] items-center gap-3 p-2 bg-white/40 backdrop-blur-md rounded-lg shadow-sm"
            >
              {/* Column 1: Title + Actions */}
              <div className="flex items-center gap-2">
                {editingId === habit._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border focus border-black px-1 text-sm rounded flex-1"
                    />
                    <button
                      onClick={() => saveEdit(habit._id)}
                      className="text-xs border px-1 hover:bg-black hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-xs border px-1"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="font-medium flex-1">{habit.title}</span>
                    <button
                      onClick={() => startEdit(habit)}
                      className="text-xs border px-1 hover:bg-black hover:text-white"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeHabit(habit._id)}
                      className="text-xs border px-1 hover:bg-red-600 hover:text-white"
                    >
                      🗑
                    </button>
                  </>
                )}
              </div>

              {/* Column 2: Checkboxes */}
              <div className="flex justify-between">
                {weekDates.map((date) => {
                  const dateKey = formatDate(date);
                  const completed = habit.logs?.some(
                    (l) => l.date === dateKey && l.completed
                  );
                  return (
                    <div key={dateKey} className="flex-1 text-center">
                      <input
                        type="checkbox"
                        checked={!!completed}
                        onChange={() => log(habit._id, date)}
                        className="w-4 h-4 cursor-pointer accent-green-500"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Progress */}
              <div className="flex flex-col items-end gap-1">
                <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold">{progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
      {graph && <HabitGraph data={graphData} setGraphRange={setGraphRange} />}
    </div>
  );
}
