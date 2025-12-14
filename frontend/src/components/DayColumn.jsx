// DayColumn.jsx
import React from 'react';
// Import a charting component (e.g., from recharts) for the Donut/Pie chart
// import { PieChart, Pie, Cell } from 'recharts'; 

const DayColumn = ({ day, date, progress, tasks }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const notCompletedCount = tasks.length - completedCount;

  // Placeholder for the Donut Chart rendering
  // You would replace this with actual chart library code
  const DonutChartPlaceholder = () => (
    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: `conic-gradient(#5cb85c 0 ${progress}%, #d9edf7 ${progress}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto' }}>
      <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', textAlign: 'center', lineHeight: '80px', fontWeight: 'bold' }}>
        {progress}%
      </div>
    </div>
  );

  return (
    <div className="day-column" style={{ flex: 1, padding: '10px', borderRight: '1px solid #eee' }}>
      <div className="day-header" style={{ backgroundColor: '#5cb85c', color: 'white', padding: '10px', textAlign: 'center', borderRadius: '5px 5px 0 0' }}>
        <div className="day-name" style={{ fontWeight: 'bold' }}>{day}</div>
        <div className="day-date" style={{ fontSize: '0.8em' }}>{date}</div>
      </div>

      <div className="progress-chart">
        <DonutChartPlaceholder />
      </div>

      <div className="tasks-section">
        <div className="tasks-title" style={{ backgroundColor: '#5cb85c', color: 'white', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>Tasks</div>
        <ul className="task-list" style={{ listStyle: 'none', padding: 0, margin: '5px 0' }}>
          {tasks.map(task => (
            <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px dotted #eee' }}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : '#333' }}>
                {task.name}
              </span>
              <input type="checkbox" checked={task.completed} readOnly />
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-footer" style={{ marginTop: '10px', padding: '10px 0', borderTop: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Completed</span>
          <span style={{ fontWeight: 'bold', color: '#5cb85c' }}>{completedCount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Not Completed</span>
          <span style={{ fontWeight: 'bold', color: '#d9534f' }}>{notCompletedCount}</span>
        </div>
      </div>
    </div>
  );
};

export default DayColumn;