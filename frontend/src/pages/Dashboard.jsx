import React, { useEffect, useState } from "react";
import Week from "../components/Week.jsx";
import HabitTracker from "../components/HabitTracker.jsx";
import { useAuth } from "../Context/UserContext.jsx";
import { Userapi } from "../api/User.api.jsx";

// XP helpers
const getLevel = (xp) => Math.floor(xp / 100) + 1;
const getXpProgress = (xp) => xp % 100;
const getNextLevelXp = (xp) => 100 - (xp % 100);

export default function Dashboard() {
  const { user } = useAuth();
  const [XP, setXP] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchXp = async () => {
      try {
        const res = await Userapi.get("/auth/getXp");
        setXP(res.data.XP);
      } catch (error) {
        console.error(error);
      }
    };

    fetchXp();
  }, [user]);

  const statusText =
    XP >= 300
      ? "UNSTOPPABLE ⚔️"
      : XP >= 150
      ? "ON A ROLL 🔥"
      : "JUST GETTING STARTED 🌱";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/t.jpg')" }}
    >
      {/* Optional overlay */}
      <div className="min-h-screen bg-black/20">
        <div className="p-6 w-full max-w-7xl mx-auto font-mono">

          {/* ================= PLAYER HEADER ================= */}
          <div className="bg-white/30 backdrop-blur-md border-4 border-black p-6 mb-10 shadow-[8px_8px_0px_black] flex flex-col md:flex-row justify-between gap-6">

            {/* Player Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border-4 border-black rounded-full bg-yellow-400 flex items-center justify-center text-xl font-black">
                {user?.name?.[0]}
              </div>

              <div>
                <h1 className="text-3xl font-black italic uppercase leading-none">
                  {user?.name}
                </h1>
                <p className="text-xs font-black uppercase mt-1">
                  Level {getLevel(XP)} Adventurer
                </p>
                <p className="text-xs font-bold uppercase mt-1">
                  Status: {statusText}
                </p>
              </div>
            </div>

            {/* XP Stats */}
            <div className="text-right min-w-[180px]">
              <p className="text-xs font-black uppercase">Total XP</p>
              <div className="text-4xl font-black leading-none">{XP}</div>

              <div className="mt-3">
                <div className="w-full h-2 border-2 border-black bg-white">
                  <div
                    className="h-full bg-green-400 transition-[width] duration-300"
                    style={{ width: `${getXpProgress(XP)}%` }}
                  />
                </div>
                <p className="text-[10px] font-black uppercase mt-1">
                  {getNextLevelXp(XP)} XP to next level
                </p>
              </div>
            </div>
          </div>

          {/* ================= WEEK VIEW ================= */}
          <section className="mb-14 bg-white/30 backdrop-blur-md p-4 rounded shadow">
            <Week />
          </section>

          {/* ================= HABITS ================= */}
      <section className="bg-white/30 backdrop-blur-md border-4 border-black p-6 shadow-[10px_10px_0px_black]">
  <HabitTracker />
</section>

        </div>
      </div>
    </div>
  );
}
