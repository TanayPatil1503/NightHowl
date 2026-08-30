import React from 'react';
import { getNightPhaseName } from '../game/gameState';

const StatBar = ({
  icon,
  label,
  value,
  max,
  colorFrom,
  colorTo,
  glow,
  danger,
}) => {
  const percent =
    max > 0
      ? Math.max(0, Math.min(100, (value / max) * 100))
      : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg leading-none ${
              danger ? 'animate-pulse' : ''
            }`}
          >
            {icon}
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">
            {label}
          </span>
        </div>

        <span className="text-xs font-bold tabular-nums text-white/90">
          {Math.floor(value)}
          <span className="text-white/30"> / {Math.floor(max)}</span>
        </span>
      </div>

      <div
        className="relative h-2.5 overflow-hidden rounded-full border border-white/10 bg-black/50"
        style={
          glow
            ? {
                boxShadow: `0 0 12px ${glow}`,
              }
            : undefined
        }
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          }}
        />

        {danger && (
          <div className="absolute inset-0 rounded-full bg-red-500/25 animate-pulse" />
        )}
      </div>
    </div>
  );
};

const HudPanel = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-black/40 shadow-lg shadow-black/30 backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="mb-3 flex items-center gap-2">
    <div className="h-px flex-1 bg-white/10" />
    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
      {children}
    </span>
    <div className="h-px flex-1 bg-white/10" />
  </div>
);

export const GameHUD = ({ gameState }) => {
  const nightProgress =
    (gameState.nightTimer / gameState.nightDuration) * 100;

  const healthPercent =
    (gameState.player.health / gameState.player.maxHealth) * 100;

  const howlPercent =
    (gameState.player.howlEnergy /
      gameState.player.maxHowlEnergy) *
    100;

  const howlReady = howlPercent >= 100;
  const isLowHealth = healthPercent <= 25;

  const phaseName = getNightPhaseName(
    gameState.nightPhase
  );

  const remainingSeconds = Math.max(
    0,
    Math.ceil(
      (gameState.nightDuration -
        gameState.nightTimer) /
        1000
    )
  );

  return (
    <aside className="game-hud w-full select-none m-2 p-2 font-sans text-white lg:w-80 xl:w-96">
      <div
  className="flex max-h-[calc(100vh-3rem)] flex-col gap-3  overflow-y-auto"
  style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }}
>



        {/* Header */}
        <HudPanel className="p-5">
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-cyan-300/60">
              Night Howl
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
              SURVIVE THE NIGHT
            </h2>

            <p className="mt-1 text-[11px] text-white/35">
              The forest waits for dawn.
            </p>
          </div>
        </HudPanel>

        {/* Player Stats */}
        <HudPanel className="p-4">
          <SectionTitle>Player</SectionTitle>

          <div className="space-y-2.5">
            <StatBar
              icon="🐺"
              label="Health"
              value={gameState.player.health}
              max={gameState.player.maxHealth}
              colorFrom="#22c55e"
              colorTo="#4ade80"
              glow={
                isLowHealth
                  ? 'rgba(239,68,68,0.6)'
                  : 'rgba(34,197,94,0.35)'
              }
              danger={isLowHealth}
            />

            <StatBar
              icon="⚡"
              label="Stamina"
              value={gameState.player.stamina}
              max={gameState.player.maxStamina}
              colorFrom="#eab308"
              colorTo="#fde047"
              glow="rgba(234,179,8,0.3)"
            />
          </div>
        </HudPanel>

        {/* Night Progress */}
        <HudPanel className="p-4">
          <SectionTitle>Night Progress</SectionTitle>

          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌙</span>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {phaseName}
                </div>

                <div className="text-[9px] uppercase tracking-wider text-white/35">
                  Current Phase
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold tabular-nums text-white/80">
                {remainingSeconds}s
              </div>

              <div className="text-[8px] uppercase tracking-wider text-white/30">
                Until Dawn
              </div>
            </div>
          </div>

          <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-black/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(
                  100,
                  nightProgress
                )}%`,
                boxShadow:
                  '0 0 12px rgba(56,189,248,0.65)',
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[8px] font-bold uppercase tracking-widest text-white/30">
            <span>Night</span>
            <span>
              {Math.floor(nightProgress)}%
            </span>
            <span>Dawn</span>
          </div>
        </HudPanel>

        {/* Score */}
        <HudPanel className="p-4">
          <SectionTitle>Run Stats</SectionTitle>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-yellow-400/10 bg-yellow-400/[0.04] p-3">
              <div className="text-[9px] font-bold uppercase tracking-wider text-yellow-300/60">
                Score
              </div>

              <div className="mt-1 text-2xl font-black tabular-nums text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.35)]">
                {gameState.score.toLocaleString()}
              </div>
            </div>

            <div className="rounded-xl border border-purple-400/10 bg-purple-400/[0.04] p-3">
              <div className="text-[9px] font-bold uppercase tracking-wider text-purple-300/60">
                Survival
              </div>

              <div className="mt-1 text-2xl font-black tabular-nums text-purple-300">
                {gameState.survivalTime}s
              </div>
            </div>
          </div>

          {/* Collectibles */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-sm">🦴</span>

              <div className="text-right">
                <div className="text-[8px] uppercase tracking-wider text-white/30">
                  Bones
                </div>

                <div className="text-sm font-bold tabular-nums text-white/80">
                  {gameState.bonesCollected}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-2">
              <span className="text-sm">💎</span>

              <div className="text-right">
                <div className="text-[8px] uppercase tracking-wider text-cyan-300/40">
                  Crystals
                </div>

                <div className="text-sm font-bold tabular-nums text-cyan-200">
                  {gameState.moonCrystalsCollected}
                </div>
              </div>
            </div>
          </div>

          {/* Combo */}
          {gameState.combo > 0 && (
            <div className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 py-2 text-xs font-black uppercase tracking-wider text-red-300 animate-pulse">
              🔥 COMBO ×{gameState.combo}
            </div>
          )}
        </HudPanel>

        {/* Howl */}
        <HudPanel
          className={`p-4 m-2 transition-shadow duration-300 ${
            howlReady
              ? 'border-purple-400/30 ring-1 ring-purple-400/40 shadow-purple-500/30'
              : ''
          }`}
        >
          <SectionTitle>Special Ability</SectionTitle>

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌕</span>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Howl
                </div>

                <div className="text-[9px] text-white/30">
                  Shockwave Ability
                </div>
              </div>
            </div>

            <kbd className="rounded-lg border border-purple-300/20 bg-purple-400/10 px-2 py-1 font-mono text-[10px] text-purple-200">
              SPACE
            </kbd>
          </div>

          <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-black/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(
                  100,
                  howlPercent
                )}%`,
                boxShadow: howlReady
                  ? '0 0 14px rgba(217,70,239,0.75)'
                  : 'none',
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[8px] font-bold uppercase tracking-widest">
            <span className="text-white/30">
              Energy
            </span>

            <span
              className={
                howlReady
                  ? 'text-purple-200 animate-pulse'
                  : 'text-white/40'
              }
            >
              {howlReady
                ? 'READY'
                : `${Math.floor(howlPercent)}%`}
            </span>
          </div>
        </HudPanel>

        {/* Controls */}
        <HudPanel className="p-4">
          <SectionTitle>Controls</SectionTitle>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/45">
                Move
              </span>

              <kbd className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-white/65">
                WASD / ARROWS
              </kbd>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/45">
                Dash
              </span>

              <kbd className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-white/65">
                SHIFT
              </kbd>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/45">
                Howl
              </span>

              <kbd className="rounded-md border border-purple-300/10 bg-purple-400/[0.06] px-2 py-1 font-mono text-[9px] text-purple-200/70">
                SPACE
              </kbd>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/45">
                Pause
              </span>

              <kbd className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-white/65">
                ESC
              </kbd>
            </div>
          </div>
        </HudPanel>

      </div>

      {/* Low Health Warning */}
      {isLowHealth && (
        <div className="pointer-events-none fixed inset-0 z-50 rounded-xl shadow-[inset_0_0_120px_30px_rgba(239,68,68,0.25)] animate-pulse" />
      )}
    </aside>
  );
};

export default GameHUD;
