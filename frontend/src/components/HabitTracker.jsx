// HabitTracker.jsx
import React from 'react';
import { habitsData } from './data'; // Assume data.js is available

const HabitTracker = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="habit-tracker-container" style={{ 
      flex: '0 0 350px', 
      padding: '10px 15px', 
      backgroundColor: '#f9f9f9', 
      border: '1px solid #ccc',
      borderRadius: '0 5px 5px 0',
      marginLeft: '-1px' // Slight overlap for cleaner look
    }}>
      <div className="tracker-header" style={{ display: 'flex', borderBottom: '2px solid #5cb85c', paddingBottom: '5px', marginBottom: '5px' }}>
        
        {/* Habit Column Header */}
        <div style={{ flex: '2', fontWeight: 'bold', paddingRight: '10px', color: '#333' }}>Habit</div>
        
        {/* Day Checkbox Headers */}
        <div style={{ flex: '3', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9em' }}>
          {days.map(day => (
            <span key={day} style={{ flex: 1, textAlign: 'center' }}>{day}</span>
          ))}
        </div>
        
        {/* Progress Header */}
        <div style={{ flex: '1.2', fontWeight: 'bold', textAlign: 'right', paddingLeft: '10px', color: '#333' }}>Progress</div>
      </div>

      <div className="tracker-body">
        {habitsData.map((habit, index) => (
          <div 
            key={index} 
            className="habit-row" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px 0', 
              borderBottom: '1px dotted #ccc',
              fontSize: '0.9em'
            }}
          >
            {/* Habit Name */}
            <div style={{ flex: '2', paddingRight: '10px', lineHeight: '1.2' }}>{habit.name}</div>
            
            {/* Day Checkboxes */}
            <div style={{ flex: '3', display: 'flex', justifyContent: 'space-between' }}>
              {days.map(dayKey => {
                // Key conversion: Sun -> sun, Mon -> mon (based on mock data structure)
                const dataKey = dayKey.toLowerCase(); 
                return (
                  <div key={dayKey} style={{ flex: 1, textAlign: 'center' }}>
                    {/* Render a simple checked/unchecked box */}
                    <input type="checkbox" checked={habit[dataKey]} readOnly style={{ accentColor: '#5cb85c' }} />
                  </div>
                );
              })}
            </div>

            {/* Progress Bar & Percentage */}
            <div style={{ flex: '1.2', paddingLeft: '10px', textAlign: 'right' }}>
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#eee', borderRadius: '4px', height: '10px', marginBottom: '2px' }}>
                {/* Progress Fill */}
                <div 
                  style={{ 
                    width: `${habit.progress}%`, 
                    backgroundColor: '#5cb85c', 
                    height: '100%', 
                    borderRadius: '4px', 
                    transition: 'width 0.5s' 
                  }}
                />
              </div>
              <span style={{ fontSize: '0.8em', fontWeight: 'bold', color: '#5cb85c' }}>{habit.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;