import React, { useEffect, useState } from "react";
import { loadSaveData, saveSettings } from "../game/saveSystem";
import { audioManager } from "../game/audioSystem";
import { ScreenButton } from "./GameOverScreen";

export const SettingsScreen = ({ onBack }) => {
  const [saveData, setSaveData] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [savedMessage, setSavedMessage] = useState(false);

  const [particles] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
    })),
  );

  useEffect(() => {
    const data = loadSaveData();

    setSaveData(data);
    setAudioEnabled(data.settings.audioEnabled);
    setMasterVolume(data.settings.masterVolume);

    audioManager.setEnabled(data.settings.audioEnabled);
    audioManager.setMasterVolume(data.settings.masterVolume);
  }, []);

  const showSaved = () => {
    setSavedMessage(true);

    window.clearTimeout(showSaved.timeout);

    showSaved.timeout = window.setTimeout(() => {
      setSavedMessage(false);
    }, 1400);
  };

  const handleAudioToggle = () => {
    const newValue = !audioEnabled;

    setAudioEnabled(newValue);

    audioManager.setEnabled(newValue);

    saveSettings({
      audioEnabled: newValue,
      masterVolume,
    });

    showSaved();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);

    setMasterVolume(newVolume);

    audioManager.setMasterVolume(newVolume);

    saveSettings({
      audioEnabled,
      masterVolume: newVolume,
    });

    showSaved();
  };

  const setVolume = (volume) => {
    setMasterVolume(volume);

    audioManager.setMasterVolume(volume);

    saveSettings({
      audioEnabled,
      masterVolume: volume,
    });

    showSaved();
  };

  if (!saveData) return null;

  const volumePercent = Math.round(masterVolume * 100);

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#03020a] text-white">

      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,#24144f_0%,#0d0920_42%,#030208_100%)]" />

      <div className="pointer-events-none fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -bottom-52 -right-52 h-[650px] w-[650px] rounded-full bg-purple-700/[0.09] blur-[160px]" />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* =========================================================
          PARTICLES
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-cyan-100"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.18,
              animation: `settingsTwinkle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          TOP BAR
      ========================================================= */}

      {/* <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#05030d]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">

          <button
            type="button"
            onClick={onBack}
            className="
              group flex items-center gap-2 rounded-xl
              border border-white/[0.07]
              bg-white/[0.03]
              px-3 py-2
              text-[9px] font-bold uppercase tracking-[0.2em]
              text-white/50
              transition-all duration-200
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.05]
              hover:text-white/80
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-400/60
            "
          >
            <span className="text-base transition-transform group-hover:-translate-x-1">
              ←
            </span>

            BACK
          </button>

          <div className="text-center">
            <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-cyan-300/40">
              NIGHT HOWL
            </div>

            <div className="mt-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/65">
              Game Settings
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`
                h-1.5 w-1.5 rounded-full
                ${audioEnabled ? "animate-pulse bg-green-400/70" : "bg-white/20"}
              `}
            />

            <span className="hidden text-[8px] font-bold uppercase tracking-[0.25em] text-white/20 sm:block">
              {audioEnabled ? "Audio Active" : "Muted"}
            </span>
          </div>
        </div>
      </header> */}

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">

        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="mb-8 text-center">

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/40" />

            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-cyan-300/40">
              Configure your hunt
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>

          <h1 className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-4xl font-black uppercase tracking-[0.08em] text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.25)] sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/20">
            Make the night yours
          </p>
        </section>

        {/* =======================================================
            SETTINGS PANEL
        ======================================================= */}

        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-black/30 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

          {/* Top glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          {/* Corner glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/[0.08] blur-3xl" />

          <div className="relative p-5 sm:p-8">

            {/* =================================================
                AUDIO HEADER
            ================================================= */}

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] text-xl shadow-[0_0_30px_rgba(34,211,238,0.06)]">
                🔊
              </div>

              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-300/40">
                  Sound system
                </div>

                <h2 className="mt-1 text-base font-black uppercase tracking-[0.15em] text-white/80">
                  Audio
                </h2>
              </div>

            </div>

            {/* =================================================
                MASTER SWITCH
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 sm:p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/75">
                    Game Audio
                  </h3>

                  <p className="mt-1.5 max-w-sm text-[9px] leading-5 text-white/30">
                    Enable music, effects, ambience, and other sounds.
                  </p>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={audioEnabled}
                  aria-label="Toggle game audio"
                  onClick={handleAudioToggle}
                  className={`
                    relative h-8 w-16 shrink-0 rounded-full
                    border p-1
                    transition-all duration-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-cyan-400/60
                    ${
                      audioEnabled
                        ? "border-cyan-300/30 bg-cyan-400/15 shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/[0.04]"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-6 w-6 items-center justify-center rounded-full
                      text-[9px] shadow-lg
                      transition-all duration-300
                      ${
                        audioEnabled
                          ? "translate-x-8 bg-cyan-300 text-slate-950"
                          : "translate-x-0 bg-white/30 text-white/50"
                      }
                    `}
                  >
                    {audioEnabled ? "✓" : "×"}
                  </span>
                </button>

              </div>

              {/* Status */}
              <div className="mt-4 flex items-center gap-2">

                <span
                  className={`
                    h-1.5 w-1.5 rounded-full
                    ${
                      audioEnabled
                        ? "animate-pulse bg-green-400"
                        : "bg-white/20"
                    }
                  `}
                />

                <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
                  {audioEnabled
                    ? "Sound is enabled"
                    : "All game audio is muted"}
                </span>

              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

            {/* =================================================
                MASTER VOLUME
            ================================================= */}

            <div>

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-purple-300/40">
                    Output level
                  </div>

                  <h2 className="mt-1 text-base font-black uppercase tracking-[0.15em] text-white/80">
                    Master Volume
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black tabular-nums text-yellow-200">
                    {volumePercent}
                    <span className="text-sm text-yellow-200/40">%</span>
                  </div>
                </div>

              </div>

              {/* Visual volume meter */}
              <div className="mb-4 flex h-10 items-end gap-1 rounded-xl border border-white/[0.05] bg-black/30 px-3 py-2">

                {Array.from({ length: 32 }, (_, index) => {
                  const threshold = (index + 1) / 32;
                  const active = masterVolume >= threshold;

                  return (
                    <div
                      key={index}
                      className={`
                        flex-1 rounded-sm
                        transition-all duration-200
                        ${
                          active
                            ? threshold > 0.8
                              ? "bg-red-400/80"
                              : threshold > 0.6
                                ? "bg-yellow-300/80"
                                : "bg-cyan-300/80"
                            : "bg-white/[0.05]"
                        }
                      `}
                      style={{
                        height: `${25 + (index % 4) * 18}%`,
                      }}
                    />
                  );
                })}

              </div>

              {/* Range */}
              <div className="relative">

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={masterVolume}
                  onChange={handleVolumeChange}
                  aria-label="Master volume"
                  className="
                    volume-slider
                    relative z-10
                    h-2 w-full
                    cursor-pointer appearance-none
                    rounded-full bg-transparent
                    focus:outline-none
                  "
                  style={{
                    background: `linear-gradient(
                      to right,
                      rgb(34 211 238 / 0.8) 0%,
                      rgb(59 130 246 / 0.8) ${volumePercent}%,
                      rgb(255 255 255 / 0.07) ${volumePercent}%,
                      rgb(255 255 255 / 0.07) 100%
                    )`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-[7px] font-bold uppercase tracking-[0.2em] text-white/15">
                <span>Mute</span>
                <span>Quiet</span>
                <span>Normal</span>
                <span>Loud</span>
                <span>Max</span>
              </div>

              {/* =================================================
                  QUICK PRESETS
              ================================================= */}

              <div className="mt-6">

                <div className="mb-3 text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
                  Quick presets
                </div>

                <div className="grid grid-cols-4 gap-2">

                  <VolumePreset
                    label="25%"
                    value={0.25}
                    active={masterVolume === 0.25}
                    onClick={() => setVolume(0.25)}
                  />

                  <VolumePreset
                    label="50%"
                    value={0.5}
                    active={masterVolume === 0.5}
                    onClick={() => setVolume(0.5)}
                  />

                  <VolumePreset
                    label="75%"
                    value={0.75}
                    active={masterVolume === 0.75}
                    onClick={() => setVolume(0.75)}
                  />

                  <VolumePreset
                    label="100%"
                    value={1}
                    active={masterVolume === 1}
                    onClick={() => setVolume(1)}
                  />

                </div>
              </div>

            </div>

            {/* =================================================
                SAVE STATUS
            ================================================= */}

            <div className="mt-7 flex items-center justify-center gap-2">

              <span
                className={`
                  h-1.5 w-1.5 rounded-full transition-all
                  ${
                    savedMessage
                      ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                      : "bg-white/10"
                  }
                `}
              />

              <span
                className={`
                  text-[7px] font-bold uppercase tracking-[0.3em]
                  transition-colors duration-300
                  ${
                    savedMessage
                      ? "text-green-300/70"
                      : "text-white/15"
                  }
                `}
              >
                {savedMessage ? "Settings saved" : "Settings save automatically"}
              </span>

            </div>

          </div>
        </section>

        {/* =======================================================
            BACK BUTTON
        ======================================================= */}

        <div className="mt-8 flex flex-col items-center gap-4">

          <ScreenButton onClick={onBack} variant="primary">
            ← BACK TO MENU
          </ScreenButton>

          <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.3em] text-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/50" />
            The forest is waiting
          </div>

        </div>

      </div>

      {/* =========================================================
          RANGE SLIDER CSS
      ========================================================= */}

      <style>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: rgb(165 243 252);
          border: 3px solid rgb(8 47 73);
          box-shadow:
            0 0 0 2px rgb(34 211 238 / 0.35),
            0 0 20px rgb(34 211 238 / 0.45);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .volume-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: rgb(165 243 252);
          border: 3px solid rgb(8 47 73);
          box-shadow:
            0 0 0 2px rgb(34 211 238 / 0.35),
            0 0 20px rgb(34 211 238 / 0.45);
          cursor: pointer;
        }

        @keyframes settingsTwinkle {
          0%, 100% {
            opacity: 0.06;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.5;
            transform: scale(1.25);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

/* ===============================================================
   VOLUME PRESET
================================================================ */

const VolumePreset = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-xl border py-2.5
        text-[8px] font-black uppercase tracking-[0.15em]
        transition-all duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-400/50
        ${
          active
            ? "border-cyan-300/30 bg-cyan-400/[0.08] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
            : "border-white/[0.06] bg-white/[0.02] text-white/30 hover:border-white/10 hover:bg-white/[0.04] hover:text-white/60"
        }
      `}
    >
      {label}
    </button>
  );
};

export default SettingsScreen;
