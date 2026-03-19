import React, { useEffect, useState } from 'react';
import FlipCard from './FlipCard';
import Settings from './Settings';

export default function FlipClock() {
  const [time, setTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [clockScale, setClockScale] = useState(1);
  const [themeColor, setThemeColor] = useState('#ec5b13');

  useEffect(() => {
    const savedSize = localStorage.getItem("clockFontSize") || 100;
    setClockScale(savedSize / 100);
    
    const savedTheme = localStorage.getItem("clockThemeColor") || '#ec5b13';
    setThemeColor(savedTheme);
    document.documentElement.style.setProperty('--color-primary', savedTheme);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  if (showSettings) {
    return (
      <Settings 
        onClose={() => setShowSettings(false)}
        clockScale={clockScale}
        setClockScale={setClockScale}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
      />
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Dynamic Ambient Glow */}
      <div className="ambient-glow transition-all duration-1000 ease-in-out"></div>
      
      <button 
        aria-label="Settings" 
        onClick={() => setShowSettings(true)} 
        className="absolute top-6 right-6 text-white opacity-40 hover:opacity-100 transition-all duration-300 z-50 p-2 rounded-full hover:bg-white/10 backdrop-blur-md">
        <span className="material-symbols-outlined text-3xl">settings</span>
      </button>

      <section 
        className="clock-container flex flex-col sm:flex-row items-center justify-center sm:gap-6 gap-4 z-10"
        style={{ transform: `scale(${clockScale})`, transformOrigin: "center center" }}
      >
        <div className="flex sm:gap-4 gap-3">
          <FlipCard digit={hours[0]} themeColor={themeColor} />
          <FlipCard digit={hours[1]} themeColor={themeColor} />
        </div>
        
        <div className="flex flex-row sm:flex-col gap-5 sm:gap-8 my-3 sm:my-0 mx-2 sm:mx-4 opacity-90 animate-pulse-slow">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}` }}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}` }}></div>
        </div>
        
        <div className="flex sm:gap-4 gap-3">
          <FlipCard digit={minutes[0]} themeColor={themeColor} />
          <FlipCard digit={minutes[1]} themeColor={themeColor} />
        </div>
        
        <div className="flex flex-row sm:flex-col gap-5 sm:gap-8 my-3 sm:my-0 mx-2 sm:mx-4 opacity-50">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/40"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/40"></div>
        </div>

        <div className="flex sm:gap-4 gap-3">
          <FlipCard digit={seconds[0]} themeColor={themeColor} />
          <FlipCard digit={seconds[1]} themeColor={themeColor} />
        </div>
      </section>
    </main>
  );
}
