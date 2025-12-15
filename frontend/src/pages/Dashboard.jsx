// Dashboard.jsx
import React from 'react';
import DayColumn from '../components/DayColumn.jsx';
// Ensure these imports are still correct
import { tasksData, overallData, habitsData } from '../components/data.jsx'; 
import HabitTracker from "../components/HabitTracker.jsx"

const MINECRAFT_FONT_CLASS = 'font-mono tracking-wider';
const BORDER_COLOR_CLASS = 'border-black';
const BACKGROUND_LIGHT_CLASS = 'bg-white';
const BACKGROUND_DARK_CLASS = 'bg-gray-300'; // Mapping #CCCCCC

const Dashboard = () => {
  return (
    <div 
      className={`dashboard-container p-3 ${MINECRAFT_FONT_CLASS} max-w-[1400px] mx-auto my-8 border-4 ${BORDER_COLOR_CLASS} ${BACKGROUND_LIGHT_CLASS}`}
    >

      {/* --- Top Section: Quote, Overall Progress --- */}
      <div className={`top-section flex border-b-4 ${BORDER_COLOR_CLASS}`}>
        
        {/* Left Side: Quote & Start Date */}
        <div className={`flex-1 p-5 ${BACKGROUND_DARK_CLASS} border-r-4 ${BORDER_COLOR_CLASS}`}>
            <h1 className="m-0 text-xl font-bold text-black">"Inspiration comes only during work"</h1>
            <p className="mt-2 font-bold text-sm">
              Week Start: <span className={`${BACKGROUND_LIGHT_CLASS} px-1 py-0.5 border-2 ${BORDER_COLOR_CLASS}`}>02.11.2025</span>
            </p>
        </div>

        {/* Middle Section: Overall Progress Bar & Charts (Takes up remaining horizontal space) */}
        <div className="flex-2 p-4 text-center flex-grow">
            <h3 className="mt-0 mb-2 text-lg font-bold text-black">OVERALL PROGRESS</h3>
            <div className={`flex justify-around items-center border-2 ${BORDER_COLOR_CLASS} p-2`}>
                <div className="w-[60%] border-r border-gray-500 pr-2">
                  Placeholder: Weekly Bar Chart
                </div> 
                <div className="w-[40%]">
                    <div className="text-4xl font-extrabold text-black leading-none">
                      {overallData.progressPercentage}%
                    </div>
                    <div className="text-xs mt-1">{overallData.tasksCompleted} / {overallData.tasksTotal} Completed</div>
                </div>
            </div>
        </div>
      </div>
      
      {/* --- Main Content: Weekly Summary (Now takes full width) --- */}
      <div className="main-content m-2 flex">
        
        {/* Weekly Summary (7 Columns) - Takes full width now */}
        <div className="weekly-summary flex w-full gap-4 px-4">
  {tasksData.map((dayData) => (
    <DayColumn
      key={dayData.day}
      day={dayData.day}
      date={dayData.date}
      progress={dayData.progress}
      tasks={dayData.tasks}
      className="rounded-lg"
      isLast={dayData.day === tasksData[tasksData.length - 1].day}
    />
  ))}
</div>
</div>


      {/* --- Habit Tracker (New Bottom Section) --- */}
     <div
  className={`
    habit-tracker-wrapper 
    w-9/10 my-4 m-auto
    rounded-lg overflow-hidden 
    border-4 ${BORDER_COLOR_CLASS}
    shadow-md
  `}
>
  {/* Header */}
  <div
    className={`
      px-6 py-4 
      text-center 
      ${BACKGROUND_DARK_CLASS} 
      border-b-4 ${BORDER_COLOR_CLASS}
    `}
  >
    <h3 className="text-lg font-bold tracking-wide text-black">
      Habit Tracker Summary
    </h3>
    <p className="mt-1 text-sm text-black/70">
      Track your daily progress at a glance
    </p>
  </div>

  {/* Content */}
  <div className="p-6 bg-white">
    <HabitTracker habits={habitsData} />
  </div>
</div>
      </div>

    
  );
};

export default Dashboard;