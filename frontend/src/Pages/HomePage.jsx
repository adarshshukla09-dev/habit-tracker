import React, { useMemo } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useAuth} from "../Context/UserContext.jsx"
const LandingPage = () => {
  // Memoize stars so they don't jitter on re-renders
  const stars = useMemo(() => 
    [...Array(100)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    })), []
  );
const { user, logout } = useAuth(); // Destructure user and logout
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* Revolving Stars Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-slow-spin absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-40">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
              }}
            />
          ))}
        </div>
      </div>

     {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-black rotate-45" />
          </div>
          Habitify
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {user ? (
            /* Shown only if user is logged in */
            <div className="flex items-center gap-4">
              <Link 
                to="/DashBoard" 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
            
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all border border-white/10"
              >
              
                Logout
              </button>
            </div>
          ) : (
            /* Shown only if user is NOT logged in */
            <>
              <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        {/* Subtle Decorative Background Rings */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full -z-10" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.07] rounded-full -z-10" />

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
          Build Your Habit, <br />
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Master Your Day
          </span>
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
          Harness the power of the web to track, achieve, and maintain your goals with precision and ease.
        </p>

        <Link to="/DashBoard">
          <button className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-xl shadow-indigo-500/20 active:scale-95">
            Start Building Habits
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Dashboard Preview Section */}
        <div className="mt-24 w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-900/40 p-3 backdrop-blur-xl shadow-2xl relative">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10" />
          
          <div className="w-full rounded-xl bg-black/40 overflow-hidden border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-8">
              
              {/* Card 1: Progress */}
              <div className="bg-zinc-900/60 p-6 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Analytics</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Consistency</span>
                    <span className="text-indigo-400">88%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[88%] rounded-full group-hover:bg-indigo-400 transition-all duration-1000" />
                  </div>
                </div>
              </div>

              {/* Card 2: Habits */}
              <div className="bg-zinc-900/60 p-6 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <CheckCircle size={18} />
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Checklist</h3>
                </div>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-3 line-through opacity-40"><CheckCircle size={14} className="text-emerald-500" /> Morning Workout</li>
                  <li className="flex items-center gap-3"><div className="w-[14px] h-[14px] border border-zinc-700 rounded-full" /> Read 20 Pages</li>
                  <li className="flex items-center gap-3"><div className="w-[14px] h-[14px] border border-zinc-700 rounded-full" /> Meditation</li>
                </ul>
              </div>

              {/* Card 3: Quote */}
              <div className="bg-zinc-900/60 p-6 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all text-left flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <Quote size={18} />
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Daily Focus</h3>
                </div>
                <div>
                  <p className="text-sm text-zinc-300 leading-relaxed italic mb-2">
                    "Success is the sum of small efforts, repeated day in and day out."
                  </p>
                  <span className="text-[10px] text-zinc-600">— ROBERT COLLIER</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;