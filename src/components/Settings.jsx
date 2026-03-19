import React from 'react';

const COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Neon Green', value: '#39ff14' },
  { name: 'Yellow', value: '#fdfd01' },
  { name: 'Blue', value: '#0070ff' },
  { name: 'Orange', value: '#ec5b13' },
];

export default function Settings({ onClose, clockScale, setClockScale, themeColor, setThemeColor }) {
  const currentScalePercent = Math.round(clockScale * 100);

  const handleScaleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setClockScale(val / 100);
    localStorage.setItem("clockFontSize", val);
  };

  const handleColorChange = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--color-primary', color);
    localStorage.setItem("clockThemeColor", color);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-3xl mx-auto md:px-8 border-x border-slate-800 bg-black text-slate-100 pb-20 overflow-y-auto">
      {/* TopAppBar */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <button onClick={onClose} className="text-slate-100 flex h-12 w-12 shrink-0 items-center cursor-pointer hover:bg-slate-800 rounded-full justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-100 text-lg md:text-2xl font-bold leading-tight tracking-tight flex-1 px-2 text-center md:text-left">Clock Settings</h2>
        <button onClick={onClose} className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm md:text-base transition-transform active:scale-95 shadow-lg shadow-primary/20">
          Done
        </button>
      </div>
      
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 p-4">
        {/* Left Column: Preview & Time Format */}
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-1">Live Preview</h3>
            <div className="bg-white/5 rounded-2xl p-8 md:p-12 flex items-center justify-center border border-white/10 shadow-inner backdrop-blur-sm">
              <div 
                style={{ transform: `scale(${clockScale})`, transformOrigin: "center center" }}
                className="relative flex flex-col items-center justify-center transition-transform"
              >
                <div className="flip-card" style={{ width: '70px', height: '100px', fontSize: '60px' }}>
                  <div className="top"><span style={{ color: themeColor }}>1</span></div>
                  <div className="bottom"><span style={{ color: themeColor }}>1</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Time Format</h3>
            <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 p-1 border border-slate-800">
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-slate-800 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-400 text-sm font-semibold transition-all">
                <span className="truncate">12-Hour</span>
                <input defaultChecked className="invisible w-0" name="time-format" type="radio" value="12h"/>
              </label>
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-slate-800 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-400 text-sm font-semibold transition-all">
                <span className="truncate">24-Hour</span>
                <input className="invisible w-0" name="time-format" type="radio" value="24h"/>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Language, Typography & Theme */}
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h3 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Typography</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex w-full items-center justify-between mb-2">
                <p className="text-slate-100 text-sm font-medium">Digit Size</p>
                <p className="text-primary text-sm font-bold">{currentScalePercent}%</p>
              </div>
              <div className="flex h-6 w-full items-center gap-4">
                <input 
                  type="range" 
                  min="50" max="180" step="5" 
                  value={currentScalePercent} 
                  onChange={handleScaleChange}
                  className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: themeColor }}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Theme Color</h3>
            <div className="flex flex-wrap items-center gap-4">
              {COLORS.map(c => (
                <button 
                  key={c.value}
                  onClick={() => handleColorChange(c.value)}
                  className={`h-10 w-10 flex items-center justify-center rounded-full border-2 transition-transform hover:scale-110 
                    ${themeColor === c.value ? 'border-white scale-110' : 'border-slate-700'}`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {themeColor === c.value && (
                    <span className="material-symbols-outlined text-black text-base mix-blend-difference">check</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
