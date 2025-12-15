import React from 'react';

const DayColumn = ({
  day,
  date,
  progress,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const notCompletedCount = tasks.length - completedCount;

  const DonutChart = () => (
    <div className="relative w-24 h-24 mx-auto my-4">
      <div
        className="absolute inset-0 rounded-full border-4 border-black"
        style={{
          background: `conic-gradient(#000 0 ${progress}%, #e5e5e5 ${progress}% 100%)`,
        }}
      />
      <div className="absolute inset-1 rounded-full bg-white shadow-inner flex items-center justify-center font-bold text-lg">
        {progress}%
      </div>
    </div>
  );

  return (
    <div className="
      day-column flex-1 min-w-0
      bg-white rounded-xl
      border-2 border-black
      shadow-md
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-200
    ">
      {/* Header */}
      <div className="bg-black text-white rounded-t-xl p-3 text-center">
        <div className="text-xs tracking-widest opacity-80">DAY</div>
        <div className="text-xl font-extrabold">{day.toUpperCase()}</div>
        <div className="text-xs opacity-70">{date}</div>
      </div>

      {/* Progress */}
      <div className="px-3">
        <DonutChart />

        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 text-xs font-bold border border-black rounded-full">
            LEVEL {Math.floor(progress / 10) + 1}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2 px-3 mb-2">
        <button
          onClick={() => onAddTask?.(day)}
          className="
            px-2 py-1 text-xs font-bold
            border border-black rounded
            hover:bg-black hover:text-white
            transition
          "
        >
          ➕ ADD
        </button>

        <button
          onClick={() => onEditTask?.(day)}
          className="
            px-2 py-1 text-xs font-bold
            border border-black rounded
            hover:bg-black hover:text-white
            transition
          "
        >
          ✏️ EDIT
        </button>

        <button
          onClick={() => onDeleteTask?.(day)}
          className="
            px-2 py-1 text-xs font-bold text-red-600
            border border-red-600 rounded
            hover:bg-red-600 hover:text-white
            transition
          "
        >
          🗑 DELETE
        </button>
      </div>

      {/* Tasks */}
      <div className="px-3">
        <div className="bg-black text-white text-xs font-bold py-1.5 text-center rounded-md mb-2">
          QUESTS ({tasks.length})
        </div>

        <ul className="space-y-1.5">
          {tasks.map(task => (
            <li
              key={task.id}
              className="
                flex items-center justify-between
                text-sm px-2 py-1.5
                border border-gray-300
                rounded-md bg-gray-50
              "
            >
              <span className={`flex items-center gap-1 ${
                task.completed ? 'line-through text-gray-500' : 'font-medium'
              }`}>
                {task.completed ? '✅' : '⬜'}
                {task.name}
              </span>

              <button
                onClick={() => onEditTask?.(day, task)}
                className="text-xs underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer / XP */}
      <div className="mt-3 bg-gray-100 rounded-b-xl border-t-2 border-black px-3 py-2 text-xs">
        <div className="flex justify-between">
          <span>XP GAINED</span>
          <span className="font-bold">{completedCount * 10}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>XP LOST</span>
          <span className="font-bold">{notCompletedCount * 5}</span>
        </div>
      </div>
    </div>
  );
};

export default DayColumn;
