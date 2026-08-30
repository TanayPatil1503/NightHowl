import React from 'react';

export const PauseMenu = ({ onResume, onSettings, onHowToPlay, onMainMenu }) => (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md">
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#090b18]/95 shadow-[0_0_70px_rgba(34,211,238,0.18)]">
      <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 px-6 py-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300/70">The night waits</p>
        <h2 className="mt-2 text-3xl font-black tracking-[0.14em] text-white">PAUSED</h2>
        <p className="mt-2 text-sm text-white/55">Take a breath. Your run is safe.</p>
      </div>
      <div className="space-y-3 p-5">
        <PauseMenuButton onClick={onResume} primary>Resume <span className="ml-2 text-xs font-normal opacity-70">ESC</span></PauseMenuButton>
        <PauseMenuButton onClick={onSettings}>Settings</PauseMenuButton>
        <PauseMenuButton onClick={onHowToPlay}>How to Play</PauseMenuButton>
        <PauseMenuButton onClick={onMainMenu} danger>Main Menu</PauseMenuButton>
      </div>
    </div>
  </div>
);

const PauseMenuButton = ({ children, onClick, primary = false, danger = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-xl border px-5 py-3.5 text-sm font-bold uppercase tracking-[0.16em] transition focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${
      primary
        ? 'border-cyan-300/40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110'
        : danger
          ? 'border-red-400/20 bg-red-500/5 text-red-200 hover:border-red-400/45 hover:bg-red-500/10'
          : 'border-white/10 bg-white/[0.04] text-white/80 hover:border-purple-300/35 hover:bg-purple-500/10 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export default PauseMenu;
