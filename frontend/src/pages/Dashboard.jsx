// Dashboard.jsx
import React from 'react';
import DayColumn from '../components/DayColumn.jsx';
import { tasksData, overallData, habitsData } from '../components/data.jsx';
import HabitTracker from "../components/HabitTracker.jsx"
// You would also import components for Header and HabitTracker

// Placeholder component for the Habit Tracker (Right Column)

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>

      {/* --- Top Section: Quote, Overall Progress, Habit Tracker Title --- */}
      <div className="top-section" style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        
        {/* Left Side: Quote & Start Date */}
        <div style={{ flex: '1', padding: '20px', backgroundColor: '#e8f5e9' }}>
            <h1 style={{ margin: 0, fontSize: '1.5em' }}>Inspiration comes only during work</h1>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Start of the week: <span style={{ backgroundColor: 'white', padding: '2px 5px', borderRadius: '3px' }}>02.11.2025</span></p>
        </div>

        {/* Middle Section: Overall Progress Bar & Charts */}
        <div style={{ flex: '2', padding: '10px', textAlign: 'center' }}>
            <h3 style={{ marginTop: '0' }}>Overall Progress</h3>
            {/* Placeholder for the Bar Chart and Donut Chart */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ width: '60%' /* Placeholder for Bar Chart */ }}>Bar Chart Here</div> 
                <div style={{ width: '40%' /* Placeholder for Donut Chart */ }}>
                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#5cb85c' }}>{overallData.progressPercentage}%</div>
                    <div>{overallData.tasksCompleted} / {overallData.tasksTotal} Completed</div>
                </div>
            </div>
        </div>

        {/* Right Side: Habit Tracker Header */}
       
      </div>
      
      {/* --- Main Content: Weekly Summary and Habit Tracker --- */}
      <div className="main-content" style={{ display: 'flex' }}>
        
        {/* Weekly Summary (7 Columns) */}
        <div className="weekly-summary" style={{ display: 'flex', flex: 1, padding: '10px 0' }}>
          {tasksData.map((dayData) => (
            <DayColumn
              key={dayData.day}
              day={dayData.day}
              date={dayData.date}
              progress={dayData.progress}
              tasks={dayData.tasks}
            />
          ))}
        </div>

        {/* Habit Tracker Sidebar */}
      
      </div>
      <div className="">
       <div style={{ flex: '0 0 300px', padding: '20px', backgroundColor: '#5cb85c', color: 'white', textAlign: 'center', borderRadius: '0 5px 0 0' }}>
            <h3 style={{ margin: 0 }}>Habit Tracker</h3>
        </div>
        <HabitTracker habits={habitsData} /></div>
    </div>
  );
};

export default Dashboard;