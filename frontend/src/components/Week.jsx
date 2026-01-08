import React, { useEffect, useState, useMemo } from 'react';
import DayColumn from './DayColumn.jsx';
import todoApi from "../api/todo.api";

// Helper to get normalized date strings
const getYYYYMMDD = (date) => date.toISOString().split("T")[0];

function Week() {
  const [savedDays, setSavedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDays = async () => {
    try {
      setLoading(true);
      const res = await todoApi.get("/all");
      setSavedDays(res.data);
    } catch (err) {
      console.error("Error loading history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);

  // GENERATE FULL WEEK SLOTS (Today + next 6 days)
  const weekSlots = useMemo(() => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
       <div className="animate-bounce text-4xl mb-4">⚔️</div>
       <div className="font-black text-xl tracking-tighter uppercase italic">Syncing Quest Logs...</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Week Progress Header */}
       <h2 className="text-2xl font-bold mb-3 border-b pb-1">
          Todos
        </h2>
      <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_black] flex justify-between items-center">
        <div>
          <h2 className="font-black text-2xl uppercase italic leading-none">Weekly Campaign</h2>
          <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Active Quests: {weekSlots.length}</p>
        </div>
        <div className="text-right">
            <span className="text-[10px] font-black block">WORLD RANK</span>
            <span className="bg-black text-white px-2 py-0.5 rounded font-bold text-sm">NOVICE ADVENTURER</span>
        </div>
      </div>

      {/* The Scrollable Quest Board */}
      <div className="weekly-summary flex snap-x snap-mandatory w-full gap-6 overflow-x-auto pb-10 scrollbar-hide cursor-grab active:cursor-grabbing">
        {weekSlots.map((slotDate) => {
          const dateString = getYYYYMMDD(slotDate);
          const dayName = slotDate.toLocaleDateString('en-US', { weekday: 'long' });
          
          // Find if we have tasks saved for this specific date
          const existingData = savedDays.find(d => 
            getYYYYMMDD(new Date(d.date)) === dateString
          );

          return (
            <div key={dateString} className="snap-center">
              <DayColumn 
                date={slotDate} // Always pass the date object
                dayName={dayName}
                // If it exists, DayColumn will fetch it via the /day route inside its useEffect
              />
            </div>
          );
        })}
      </div>

      {/* Decorative Legend */}
      <div className="flex justify-center gap-4 text-[10px] font-black opacity-40 uppercase">
        <span>⬅️ Swipe to view Future Quests</span>
        <span>•</span>
        <span>Tap Quest to Complete ⚔️</span>
      </div>
    </div>
  );
}

export default Week;