import React, { useState } from 'react';

/* ================================================================
   GAME OVER SCREEN
================================================================ */

export const GameOverScreen = ({
  stats,
  onRetry,
  onUpgrades,
  onMenu,
}) => (
  <ResultScreen
    type="defeat"
    stats={stats}
    onRetry={onRetry}
    onUpgrades={onUpgrades}
    onMenu={onMenu}
  />
);

/* ================================================================
   VICTORY SCREEN
================================================================ */

export const VictoryScreen = ({
  stats,
  onRetry,
  onUpgrades,
  onMenu,
}) => (
  <ResultScreen
    type="victory"
    stats={stats}
    onRetry={onRetry}
    onUpgrades={onUpgrades}
    onMenu={onMenu}
  />
);

/* ================================================================
   SHARED RESULT SCREEN
================================================================ */

const ResultScreen = ({
  type,
  stats = {},
  onRetry,
  onUpgrades,
  onMenu,
}) => {
  const isVictory = type === 'victory';

  const [particles] = useState(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.45 + 0.1,
    }))
  );

  const score = stats.score ?? 0;
  const rank = getRank(score);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020107] text-white">

      {/* ==========================================================
          BACKGROUND
      ========================================================== */}

      <div
        className={`fixed inset-0 ${
          isVictory
            ? 'bg-[radial-gradient(ellipse_at_50%_25%,rgba(14,116,144,0.28),rgba(30,27,75,0.38)_38%,#020107_78%)]'
            : 'bg-[radial-gradient(ellipse_at_50%_25%,rgba(127,29,29,0.30),rgba(49,8,35,0.38)_38%,#020107_78%)]'
        }`}
      />

      {/* Grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:55px_55px]" />

      {/* Main aura */}
      <div
        className={`pointer-events-none fixed left-1/2 top-[12%] h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px] ${
          isVictory ? 'bg-cyan-500/10' : 'bg-red-600/10'
        }`}
      />

      {/* Bottom aura */}
      <div
        className={`pointer-events-none fixed -bottom-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[150px] ${
          isVictory ? 'bg-purple-600/10' : 'bg-red-900/15'
        }`}
      />

      {/* Particles */}
      <div className="pointer-events-none fixed inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`absolute rounded-full ${
              isVictory ? 'bg-cyan-200' : 'bg-red-300'
            }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `resultFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ==========================================================
          CONTENT
      ========================================================== */}

      <main className="relative z-10 flex min-h-screen items-center px-4 py-8 sm:px-6 lg:px-10">

        <div className="mx-auto w-full max-w-7xl">

          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* ====================================================
                LEFT — RESULT
            ==================================================== */}

            <section>

              {/* Header */}
              <div className="mb-6">

                <div className="mb-5 flex items-center gap-4">

                  <div
                    className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${
                      isVictory
                        ? 'border-cyan-400/30 bg-cyan-400/[0.08] shadow-[0_0_50px_rgba(34,211,238,0.12)]'
                        : 'border-red-500/30 bg-red-500/[0.08] shadow-[0_0_50px_rgba(239,68,68,0.12)]'
                    }`}
                  >
                    <div
                      className={`absolute inset-2 rounded-xl border ${
                        isVictory
                          ? 'border-cyan-300/10'
                          : 'border-red-300/10'
                      }`}
                    />

                    <span className="relative text-2xl">
                      {isVictory ? '☾' : '☠'}
                    </span>
                  </div>

                  <div>
                    <p
                      className={`text-[10px] font-black uppercase tracking-[0.35em] ${
                        isVictory
                          ? 'text-cyan-300/60'
                          : 'text-red-300/60'
                      }`}
                    >
                      {isVictory ? 'Night survived' : 'Run terminated'}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      {isVictory
                        ? 'The hunt has come to an end.'
                        : 'The darkness claimed another hunter.'}
                    </p>
                  </div>
                </div>

                <h1
                  className={`max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl xl:text-7xl ${
                    isVictory
                      ? 'bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-white via-red-300 to-purple-500 bg-clip-text text-transparent'
                  }`}
                >
                  {isVictory
                    ? 'THE MOON REMEMBERS'
                    : 'THE NIGHT HAS WON'}
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                  {isVictory
                    ? 'Your howl echoes through the darkness. Every crystal, every enemy, every second became part of the legend.'
                    : 'You were swallowed by the darkness. But every run makes the next hunt stronger.'}
                </p>
              </div>

              {/* ==================================================
                  SCORE CARD
              ================================================== */}

              <div
                className={`relative overflow-hidden rounded-3xl border ${
                  isVictory
                    ? 'border-cyan-400/15 bg-[#07151d]/70'
                    : 'border-red-500/15 bg-[#1a080e]/70'
                } shadow-2xl backdrop-blur-2xl`}
              >

                {/* Top accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] ${
                    isVictory
                      ? 'bg-gradient-to-r from-transparent via-cyan-300 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-red-400 to-transparent'
                  }`}
                />

                {/* Inner glow */}
                <div
                  className={`pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full blur-[100px] ${
                    isVictory ? 'bg-cyan-500/10' : 'bg-red-500/10'
                  }`}
                />

                <div className="relative p-5 sm:p-7">

                  {/* Score + rank */}
                  <div className="flex items-end justify-between gap-4">

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">
                        FINAL SCORE
                      </p>

                      <div
                        className={`mt-1 text-5xl font-black tracking-tight sm:text-7xl ${
                          isVictory
                            ? 'text-yellow-200 drop-shadow-[0_0_25px_rgba(253,224,71,0.20)]'
                            : 'text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.15)]'
                        }`}
                      >
                        {score.toLocaleString()}
                      </div>
                    </div>

                    {/* Rank */}
                    <div className="text-right">

                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25">
                        RANK
                      </p>

                      <div
                        className={`mt-1 text-6xl font-black leading-none ${
                          isVictory
                            ? 'text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]'
                            : 'text-red-300 drop-shadow-[0_0_25px_rgba(239,68,68,0.25)]'
                        }`}
                      >
                        {rank}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <RankProgress score={score} isVictory={isVictory} />

                  {/* Divider */}
                  <div className="my-6 h-px bg-white/[0.06]" />

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatBox
                      icon="⏱"
                      label="SURVIVAL"
                      value={`${stats.survivalTime ?? 0}s`}
                      color={isVictory ? 'cyan' : 'red'}
                    />

                    <StatBox
                      icon="🦴"
                      label="BONES"
                      value={stats.bonesCollected ?? 0}
                      color="purple"
                    />

                    <StatBox
                      icon="💎"
                      label="CRYSTALS"
                      value={stats.crystalsCollected ?? 0}
                      color="yellow"
                      highlight
                    />

                    <StatBox
                      icon="👾"
                      label="ENEMIES"
                      value={stats.enemiesDefeated ?? 0}
                      color="purple"
                    />

                    <StatBox
                      icon="🔥"
                      label="BEST COMBO"
                      value={stats.bestCombo ?? 0}
                      color="orange"
                    />

                    <StatBox
                      icon="✦"
                      label="NIGHT RANK"
                      value={rank}
                      color={isVictory ? 'cyan' : 'red'}
                      highlight
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================
                RIGHT — ACTION PANEL
            ==================================================== */}

            <aside>

              <div
                className={`relative overflow-hidden rounded-3xl border p-5 shadow-2xl backdrop-blur-2xl sm:p-6 ${
                  isVictory
                    ? 'border-cyan-400/15 bg-cyan-950/[0.12]'
                    : 'border-red-500/15 bg-red-950/[0.12]'
                }`}
              >

                <div
                  className={`absolute left-0 top-0 h-24 w-24 rounded-full blur-[70px] ${
                    isVictory ? 'bg-cyan-500/10' : 'bg-red-500/10'
                  }`}
                />

                <div className="relative">

                  <div className="mb-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25">
                      NIGHT OPTIONS
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-white/90">
                      What will you do next?
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-white/30">
                      Choose your next move, hunter.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">

                    <ScreenButton
                      onClick={onRetry}
                      variant="primary"
                      icon={isVictory ? '↻' : '▶'}
                    >
                      {isVictory ? 'PLAY AGAIN' : 'TRY AGAIN'}
                    </ScreenButton>

                    <ScreenButton
                      onClick={onUpgrades}
                      variant="secondary"
                      icon="✦"
                    >
                      UPGRADES
                    </ScreenButton>

                    <ScreenButton
                      onClick={onMenu}
                      variant="dark"
                      icon="⌂"
                    >
                      MAIN MENU
                    </ScreenButton>

                  </div>

                  {/* Tip */}
                  <div className="mt-6 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                    <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/20">
                      HUNTER'S TIP
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-white/35">
                      Spend your crystals wisely. A stronger build means a
                      longer night.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-white/10" />

                <p className="text-[8px] font-bold uppercase tracking-[0.45em] text-white/20">
                  {isVictory
                    ? 'THE MOON WATCHES'
                    : 'THE DARKNESS WAITS'}
                </p>

                <span className="h-px w-8 bg-white/10" />
              </div>
            </aside>

          </div>
        </div>
      </main>

      <style>{`
        @keyframes resultFloat {
          0%, 100% {
            transform: translateY(0) scale(0.7);
            opacity: 0.1;
          }

          50% {
            transform: translateY(-22px) scale(1.25);
            opacity: 0.8;
          }
        }

        @keyframes rankPulse {
          0%, 100% {
            opacity: 0.45;
          }

          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

/* ================================================================
   RANK PROGRESS
================================================================ */

const RankProgress = ({ score, isVictory }) => {
  const nextRank =
    score < 2500
      ? 2500
      : score < 5000
        ? 5000
        : score < 7500
          ? 7500
          : score < 10000
            ? 10000
            : 10000;

  const previousRank =
    score < 2500
      ? 0
      : score < 5000
        ? 2500
        : score < 7500
          ? 5000
          : score < 10000
            ? 7500
            : 10000;

  const progress =
    score >= 10000
      ? 100
      : Math.min(
          100,
          ((score - previousRank) / (nextRank - previousRank)) * 100
        );

  return (
    <div className="mt-5">

      <div className="mb-2 flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
          RANK PROGRESS
        </span>

        <span className="text-[9px] font-bold text-white/35">
          {score >= 10000 ? 'MAX RANK' : `${nextRank.toLocaleString()} NEXT`}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isVictory
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
              : 'bg-gradient-to-r from-red-500 to-purple-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/* ================================================================
   STAT BOX
================================================================ */

const StatBox = ({
  icon,
  label,
  value,
  color = 'cyan',
  highlight = false,
}) => {
  const colors = {
    cyan: {
      border: 'border-cyan-400/15',
      bg: 'bg-cyan-400/[0.035]',
      icon: 'bg-cyan-400/10 text-cyan-300',
      label: 'text-cyan-300/55',
      hover: 'hover:border-cyan-400/35',
    },

    red: {
      border: 'border-red-400/15',
      bg: 'bg-red-400/[0.035]',
      icon: 'bg-red-400/10 text-red-300',
      label: 'text-red-300/55',
      hover: 'hover:border-red-400/35',
    },

    purple: {
      border: 'border-purple-400/15',
      bg: 'bg-purple-400/[0.035]',
      icon: 'bg-purple-400/10 text-purple-300',
      label: 'text-purple-300/55',
      hover: 'hover:border-purple-400/35',
    },

    yellow: {
      border: 'border-yellow-400/15',
      bg: 'bg-yellow-400/[0.045]',
      icon: 'bg-yellow-400/10 text-yellow-300',
      label: 'text-yellow-300/55',
      hover: 'hover:border-yellow-400/35',
    },

    orange: {
      border: 'border-orange-400/15',
      bg: 'bg-orange-400/[0.035]',
      icon: 'bg-orange-400/10 text-orange-300',
      label: 'text-orange-300/55',
      hover: 'hover:border-orange-400/35',
    },
  };

  const theme = colors[color] || colors.cyan;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border
        ${theme.border}
        ${theme.bg}
        ${theme.hover}
        p-3.5
        transition-all duration-300
        hover:-translate-y-0.5
      `}
    >
      <div className="flex items-center gap-3">

        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl text-base
            ${theme.icon}
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`
              truncate text-[8px] font-black
              uppercase tracking-[0.18em]
              ${theme.label}
            `}
          >
            {label}
          </div>

          <div
            className={`
              mt-1 truncate text-xl font-black
              ${highlight ? 'text-yellow-200' : 'text-white/90'}
            `}
          >
            {value}
          </div>
        </div>

      </div>
    </div>
  );
};

/* ================================================================
   BUTTON
================================================================ */

export const ScreenButton = ({
  onClick,
  children,
  variant = 'primary',
  icon,
}) => {
  const variants = {
    primary: `
      border-cyan-300/30
      bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600
      text-white
      shadow-[0_10px_35px_rgba(6,182,212,0.18)]
      hover:shadow-[0_14px_40px_rgba(6,182,212,0.32)]
    `,

    secondary: `
      border-purple-400/15
      bg-white/[0.04]
      text-white/85
      hover:border-purple-400/40
      hover:bg-purple-500/10
    `,

    dark: `
      border-white/[0.08]
      bg-black/25
      text-white/55
      hover:border-white/20
      hover:bg-white/[0.05]
      hover:text-white
    `,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden
        rounded-2xl border px-5 py-4
        font-black text-xs uppercase tracking-[0.18em]
        transition-all duration-300
        hover:-translate-y-0.5
        active:translate-y-0
        focus:outline-none
        focus:ring-2 focus:ring-cyan-400/30
        ${variants[variant]}
      `}
    >
      {/* Shine */}
      <span
        className="
          pointer-events-none absolute inset-y-0 -left-full
          w-1/2 skew-x-[-20deg]
          bg-gradient-to-r
          from-transparent via-white/20 to-transparent
          transition-all duration-700
          group-hover:left-[130%]
        "
      />

      <span className="relative flex items-center justify-center gap-3">

        {icon && (
          <span
            className="
              flex h-7 w-7 items-center justify-center
              rounded-lg bg-white/10
              text-sm
              transition-transform duration-300
              group-hover:scale-110
            "
          >
            {icon}
          </span>
        )}

        <span>{children}</span>

        <span
          className="
            absolute right-1
            translate-x-2
            text-lg opacity-0
            transition-all duration-300
            group-hover:translate-x-0
            group-hover:opacity-60
          "
        >
          →
        </span>
      </span>
    </button>
  );
};

/* ================================================================
   SCORE RANK
================================================================ */

const getRank = (score = 0) => {
  if (score >= 10000) return 'S';
  if (score >= 7500) return 'A';
  if (score >= 5000) return 'B';
  if (score >= 2500) return 'C';
  return 'D';
};

export default GameOverScreen;
