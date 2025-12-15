import { useState, useEffect } from "react";
import habitApi from "../api/habit.api.js";
const formatDate = (date) => date.toISOString().split("T")[0];

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
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

  const weekDates = getLast7Days();
  const today = new Date();
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
    const startDate = formatDate(weekDates[0]);
    const endDate = formatDate(weekDates[6]);

    const res = await habitApi.get(
      `/logs/week?startDate=${startDate}&endDate=${endDate}`
    );

    // Transform logs → habits
    const habitsMap = {};

    res.data.forEach((log) => {
      const habitId = log.habit._id;

      if (!habitsMap[habitId]) {
        habitsMap[habitId] = {
          _id: habitId,
          title: log.habit.title,
          logs: [],
        };
      }

      habitsMap[habitId].logs.push({
        date: log.date,
        completed: log.completed,
      });
    });

    setHabits(Object.values(habitsMap));
  };

  fetchhabit();

  console.log(habits)
}, []);


  // ADD HABIT
  const add = async () => {
    if (!title.trim()) return;
console.log(title)
    const res = await habitApi.post("/c", { title });
    setHabits((prev) => [...prev, { ...res.data, logs: [] }]);

    setTitle("");
    setShowForm(false);
  };

  // TOGGLE HABIT FOR DATE
  const log = async (habitId, date) => {
    const dateKey = formatDate(date);

    await habitApi.post(`/${habitId}/toggle`, { date: dateKey });

    // Optimistic UI update
    setHabits((prev) =>
      prev.map((h) =>
        h._id === habitId ? { ...h, logs: toggleLog(h.logs, dateKey) } : h
      )
    );
  };

  return (
    <div className="habit-tracker-container bg-white text-black">
      {/* Header */}
      <div className="tracker-header flex items-center border-b-2 border-black pb-3 mb-2 text-sm font-bold">
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
            className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Create Habit */}
      {showForm && (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="New habit name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black px-2 py-1 text-sm flex-1"
          />
          <button onClick={()=>add()} className="bg-black text-white px-3 text-sm">
            Save
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="border border-black px-3 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Body */}
      <div className="tracker-body divide-y">
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
  className="habit-row flex items-center py-3 text-sm"
>
  <div className="flex-[2] pr-3 font-medium">{habit.title}</div>

  <div className="flex-[3] flex justify-between">
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
          />
        </div>
      );
    })}
  </div>

  {/* Progress bar */}
  <div className="flex-[1.2] pl-3 text-right text-xs font-bold flex flex-col items-end">
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
    <span className="mt-1 text-xs">{progress}%</span>
  </div>
</div>
);
        })}
      </div>
    </div>
  );
}
