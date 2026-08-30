import React, { useEffect, useState } from "react";
import { loadSaveData } from "../game/saveSystem";

export const MainMenu = ({
  onPlayClick,
  onHowToPlayClick,
  onUpgradesClick,
  onSettingsClick,
}) => {
  const [saveData, setSaveData] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Stable particles
  const [particles] = useState(() =>
    Array.from({ length: 36 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    })),
  );

  useEffect(() => {
    setSaveData(loadSaveData());
  }, []);

  const hasProgress = saveData && (
    Number(saveData.highScore) > 0 ||
    Number(saveData.totalCrystals) > 0
  );

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#03020a] text-white">
      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,#21164d_0%,#0d0a20_38%,#030208_100%)]" />

      <div className="pointer-events-none absolute -left-48 -top-48 h-[650px] w-[650px] rounded-full bg-cyan-600/[0.08] blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-52 -right-52 h-[700px] w-[700px] rounded-full bg-purple-700/[0.10] blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[2px] w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-xl" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.65)_100%)]" />

      {/* =========================================================
          STARS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-cyan-100"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.25,
              animation: `nightHowlTwinkle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          TOP BAR
      ========================================================= */}

      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-white/25">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          NIGHT HOWL
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.25em] text-white/25 backdrop-blur-xl">
          <span className="text-cyan-400/60">●</span>
          The forest is awake
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 flex h-full min-h-screen items-center justify-center overflow-y-auto px-4 py-20 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_390px] lg:gap-20">

            {/* =====================================================
                BRANDING
            ===================================================== */}

            <section className="flex flex-col items-center text-center lg:items-start lg:text-left">

              {/* Moon */}
              <div className="relative mb-8 h-28 w-28 sm:h-36 sm:w-36">
                {/* Orbital rings */}
                <div className="absolute -inset-7 rounded-full border border-cyan-300/[0.07]" />
                <div className="absolute -inset-12 rounded-full border border-purple-400/[0.05]" />

                {/* Glow */}
                <div className="absolute -inset-8 rounded-full bg-amber-300/10 blur-3xl" />

                {/* Moon */}
                <div className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-white via-yellow-100 to-amber-400 shadow-[0_0_70px_rgba(251,191,36,0.55)]">

                  {/* Craters */}
                  <div className="absolute left-[18%] top-[24%] h-7 w-7 rounded-full bg-amber-700/10 blur-[1px]" />
                  <div className="absolute right-[20%] top-[37%] h-5 w-5 rounded-full bg-amber-700/15" />
                  <div className="absolute left-[42%] bottom-[19%] h-8 w-8 rounded-full bg-amber-700/10" />
                  <div className="absolute right-[28%] bottom-[27%] h-3 w-3 rounded-full bg-amber-800/15" />
                  <div className="absolute left-[28%] bottom-[35%] h-3 w-3 rounded-full bg-amber-800/10" />

                  {/* Highlight */}
                  <div className="absolute left-2 top-2 h-1/2 w-1/2 rounded-full bg-white/40 blur-lg" />
                </div>
              </div>

              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-cyan-400/40" />

                <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-cyan-300/50">
                  A survival experience
                </p>

                <span className="h-px w-8 bg-cyan-400/40 lg:hidden" />
              </div>

              {/* Title */}
              <div className="select-none">
                <h1 className="bg-gradient-to-r from-cyan-100 via-blue-400 to-purple-500 bg-clip-text text-[4.5rem] font-black leading-[0.75] tracking-[0.10em] text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.30)] sm:text-8xl">
                  NIGHT
                </h1>

                <h1 className="mt-4 bg-gradient-to-r from-purple-300 via-violet-500 to-cyan-300 bg-clip-text text-[4.5rem] font-black leading-[0.75] tracking-[0.10em] text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.30)] sm:text-8xl">
                  HOWL
                </h1>
              </div>

              {/* Tagline */}
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />

                <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-100/60 sm:text-sm">
                  The night is listening
                </p>

                <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
              </div>

              {/* Save stats */}
              {saveData && (
                <div className="mt-9 w-full max-w-xl">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                      Your journey
                    </span>

                    {hasProgress && (
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-400/40">
                        Progress saved
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <StatCard
                      icon="🏆"
                      label="BEST RUN"
                      value={saveData.highScore ?? 0}
                      color="cyan"
                    />

                    <StatCard
                      icon="✦"
                      label="CRYSTALS"
                      value={saveData.totalCrystals ?? 0}
                      color="purple"
                    />
                  </div>
                </div>
              )}

              {/* Lore */}
              <p className="mt-7 max-w-lg text-xs leading-6 text-white/25 sm:text-sm">
                Enter the forest.
                <span className="text-white/40"> Follow the moonlight.</span>
                <br className="hidden sm:block" />
                Survive the night and let the darkness hear your howl.
              </p>
            </section>

            {/* =====================================================
                MENU
            ===================================================== */}

            <section className="w-full">

              {/* Panel */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#090711]/75 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6">

                {/* Top line */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

                {/* Ambient panel glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/[0.08] blur-3xl" />

                {/* Header */}
                <div className="relative mb-5 px-1">
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-lg text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
                      ☾
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-cyan-300/40">
                        Main Menu
                      </p>

                      <h2 className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-white/85">
                        Enter the night
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent" />
                </div>

                {/* Buttons */}
                <div className="relative flex flex-col gap-2.5">

                  <MenuButton
                    onClick={onPlayClick}
                    isHovered={hoveredButton === "play"}
                    onHover={() => setHoveredButton("play")}
                    onLeave={() => setHoveredButton(null)}
                    variant="primary"
                    icon="▶"
                    description="Begin a new night"
                  >
                    PLAY NIGHT
                  </MenuButton>

                  <MenuButton
                    onClick={onHowToPlayClick}
                    isHovered={hoveredButton === "how"}
                    onHover={() => setHoveredButton("how")}
                    onLeave={() => setHoveredButton(null)}
                    variant="secondary"
                    icon="?"
                    description="Learn how to survive"
                  >
                    HOW TO PLAY
                  </MenuButton>

                  <MenuButton
                    onClick={onUpgradesClick}
                    isHovered={hoveredButton === "upgrades"}
                    onHover={() => setHoveredButton("upgrades")}
                    onLeave={() => setHoveredButton(null)}
                    variant="secondary"
                    icon="✦"
                    description="Improve your abilities"
                  >
                    UPGRADES
                  </MenuButton>

                  <MenuButton
                    onClick={onSettingsClick}
                    isHovered={hoveredButton === "settings"}
                    onHover={() => setHoveredButton("settings")}
                    onLeave={() => setHoveredButton(null)}
                    variant="secondary"
                    icon="⚙"
                    description="Game preferences"
                  >
                    SETTINGS
                  </MenuButton>
                </div>

                {/* Footer */}
                <div className="relative mt-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/[0.05]" />

                  <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/15">
                    Choose your fate
                  </span>

                  <span className="h-px flex-1 bg-white/[0.05]" />
                </div>
              </div>

              {/* Status */}
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400/60" />
                </span>

                <span className="text-[8px] font-medium uppercase tracking-[0.35em] text-white/20">
                  Something is watching
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes nightHowlTwinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.35);
          }
        }

        @keyframes menuFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes moonGlow {
          0%, 100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.08);
          }
        }

        .menu-logo {
          animation: menuFloat 5s ease-in-out infinite;
        }

        .menu-logo > div > div:last-child {
          animation: moonGlow 4s ease-in-out infinite;
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
   STAT CARD
================================================================ */

const StatCard = ({ icon, label, value, color }) => {
  const isCyan = color === "cyan";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        border bg-black/25 px-4 py-3.5
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        ${
          isCyan
            ? "border-cyan-400/15 hover:border-cyan-400/35 hover:bg-cyan-400/[0.035]"
            : "border-purple-400/15 hover:border-purple-400/35 hover:bg-purple-400/[0.035]"
        }
      `}
    >
      {/* Hover glow */}
      <div
        className={`
          pointer-events-none absolute inset-0 opacity-0
          transition-opacity duration-300 group-hover:opacity-100
          ${
            isCyan
              ? "bg-gradient-to-br from-cyan-500/[0.07] to-transparent"
              : "bg-gradient-to-br from-purple-500/[0.07] to-transparent"
          }
        `}
      />

      <div className="relative flex items-center gap-3">
        <div
          className={`
            flex h-9 w-9 items-center justify-center
            rounded-xl text-base
            ${
              isCyan
                ? "bg-cyan-400/[0.07] text-cyan-300"
                : "bg-purple-400/[0.07] text-purple-300"
            }
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`
              text-[8px] font-bold tracking-[0.2em]
              ${isCyan ? "text-cyan-400/70" : "text-purple-400/70"}
            `}
          >
            {label}
          </div>

          <div className="mt-0.5 text-lg font-black tabular-nums text-yellow-100/90">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   MENU BUTTON
================================================================ */

const MenuButton = ({
  onClick,
  isHovered,
  onHover,
  onLeave,
  children,
  variant = "primary",
  icon,
  description,
}) => {
  const primary = variant === "primary";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`
        group relative w-full overflow-hidden rounded-2xl
        border px-4 py-3.5 sm:px-5
        text-left
        transition-all duration-300
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-cyan-400/60
        active:scale-[0.985]

        ${
          primary
            ? `
              border-cyan-300/30
              bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600
              text-white
              shadow-[0_10px_35px_rgba(6,182,212,0.18)]
              hover:shadow-[0_14px_45px_rgba(6,182,212,0.30)]
            `
            : `
              border-white/[0.07]
              bg-white/[0.035]
              text-white/80
              backdrop-blur-xl
              hover:border-purple-400/30
              hover:bg-purple-500/[0.055]
            `
        }

        ${isHovered ? "-translate-y-0.5" : ""}
      `}
    >
      {/* Moving shine */}
      <span
        className={`
          pointer-events-none absolute inset-y-0 -left-[80%] w-1/2
          skew-x-[-20deg]
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-all duration-700
          ${isHovered ? "left-[140%]" : ""}
        `}
      />

      {/* Hover background */}
      <span
        className={`
          pointer-events-none absolute inset-0
          bg-gradient-to-r from-cyan-400/0 via-white/[0.06] to-purple-400/10
          opacity-0 transition-opacity duration-300
          ${isHovered ? "opacity-100" : ""}
        `}
      />

      <span className="relative flex items-center gap-3.5">

        {/* Icon */}
        <span
          className={`
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl text-sm
            transition-all duration-300
            ${
              primary
                ? "bg-white/15 text-white"
                : "border border-purple-400/10 bg-purple-500/[0.08] text-purple-300"
            }
            ${isHovered ? "scale-110 rotate-3" : ""}
          `}
        >
          {icon}
        </span>

        {/* Text */}
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-black tracking-[0.18em]">
            {children}
          </span>

          <span
            className={`
              mt-0.5 block text-[8px] font-medium tracking-[0.05em]
              transition-colors duration-300
              ${
                primary
                  ? "text-white/50"
                  : "text-white/25 group-hover:text-white/40"
              }
            `}
          >
            {description}
          </span>
        </span>

        {/* Arrow */}
        <span
          className={`
            flex h-7 w-7 shrink-0 items-center justify-center
            rounded-full
            text-base
            transition-all duration-300
            ${
              primary
                ? "bg-white/10 text-white/70"
                : "bg-white/[0.035] text-white/20"
            }
            ${
              isHovered
                ? "translate-x-0 bg-white/10 text-white/80"
                : "translate-x-1"
            }
          `}
        >
          →
        </span>
      </span>
    </button>
  );
};

export default MainMenu;
