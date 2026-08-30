import React, { useEffect, useState } from "react";
import {
  loadSaveData,
  upgradeItem,
  getUpgradeCost,
} from "../game/saveSystem";
import { ScreenButton } from "./GameOverScreen";

export const UpgradesScreen = ({ onBack }) => {
  const [saveData, setSaveData] = useState(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);

  // Stable atmospheric particles
  const [particles] = useState(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
    })),
  );

  useEffect(() => {
    setSaveData(loadSaveData());
  }, []);

  const handleUpgrade = (upgradeName) => {
    if (upgradeItem(upgradeName)) {
      setSaveData(loadSaveData());
      setSelectedUpgrade(upgradeName);

      // Remove selection after the upgrade animation
      setTimeout(() => {
        setSelectedUpgrade(null);
      }, 600);
    }
  };

  if (!saveData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#03020a] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Loading your journey...
          </span>
        </div>
      </div>
    );
  }

  const upgrades = Object.entries(saveData.upgradeLevels);

  const totalLevels = upgrades.reduce(
    (sum, [, upgrade]) => sum + upgrade.level,
    0,
  );

  const totalMaxLevels = upgrades.reduce(
    (sum, [, upgrade]) => sum + upgrade.maxLevel,
    0,
  );

  const overallProgress =
    totalMaxLevels > 0 ? (totalLevels / totalMaxLevels) * 100 : 0;

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#03020a] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_15%,#24144f_0%,#0d0920_40%,#030208_100%)]" />

      <div className="pointer-events-none fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -bottom-52 -right-52 h-[650px] w-[650px] rounded-full bg-purple-700/[0.10] blur-[160px]" />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

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
              animation: `upgradeTwinkle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          TOP NAV
      ========================================================= */}

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#05030d]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={onBack}
            className="
              group flex items-center gap-2
              rounded-xl border border-white/[0.07]
              bg-white/[0.03] px-3 py-2
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

          <div className="absolute left-1/2 hidden -translate-x-1/2 text-center sm:block">
            <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-cyan-300/40">
              NIGHT HOWL
            </div>

            <div className="mt-0.5 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
              Moon Forge
            </div>
          </div>

          {/* Crystal balance */}
          <div className="flex items-center gap-2 rounded-2xl border border-purple-400/20 bg-purple-500/[0.06] px-3 py-2 shadow-[0_0_25px_rgba(168,85,247,0.08)]">
            <span className="text-base">💎</span>

            <div>
              <div className="text-[7px] font-bold uppercase tracking-[0.2em] text-purple-300/50">
                Crystals
              </div>

              <div className="text-sm font-black tabular-nums text-yellow-200">
                {saveData.totalCrystals}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Header */}
        <section className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/40" />

            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-cyan-300/40">
              Permanent progression
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>

          <h1 className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-4xl font-black uppercase tracking-[0.08em] text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.25)] sm:text-5xl lg:text-6xl">
            Moon Forge
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/30 sm:text-sm">
            Shape yourself for the darkness.
            <br />
            Every upgrade makes the next night easier to survive.
          </p>
        </section>

        {/* =======================================================
            PROGRESS OVERVIEW
        ======================================================= */}

        <section className="mx-auto mb-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 p-4 backdrop-blur-xl sm:p-5">

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/[0.025] via-transparent to-purple-500/[0.04]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">
                  Hunter progression
                </div>

                <div className="mt-1 text-sm font-bold text-white/70">
                  {totalLevels}
                  <span className="text-white/25"> / </span>
                  {totalMaxLevels}
                  <span className="ml-2 text-[9px] font-medium uppercase tracking-[0.15em] text-white/25">
                    levels mastered
                  </span>
                </div>
              </div>

              <div className="w-full sm:max-w-xs">
                <div className="mb-1.5 flex justify-between">
                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/20">
                    Overall mastery
                  </span>

                  <span className="text-[8px] font-bold text-cyan-300/60">
                    {Math.round(overallProgress)}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all duration-700"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            UPGRADE GRID
        ======================================================= */}

        <section className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {upgrades.map(([key, upgrade], index) => (
            <UpgradeCard
              key={key}
              name={upgrade.name}
              description={upgrade.description}
              level={upgrade.level}
              maxLevel={upgrade.maxLevel}
              cost={getUpgradeCost(key)}
              crystals={saveData.totalCrystals}
              selected={selectedUpgrade === key}
              index={index}
              onUpgrade={() => handleUpgrade(key)}
            />
          ))}
        </section>

        {/* =======================================================
            BOTTOM NAV
        ======================================================= */}

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">

          <ScreenButton onClick={onBack} variant="primary">
            ← BACK TO MENU
          </ScreenButton>

          <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.3em] text-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/50" />
            The forest remembers your progress
          </div>
        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes upgradeTwinkle {
          0%, 100% {
            opacity: 0.08;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.65;
            transform: scale(1.35);
          }
        }

        @keyframes upgradeSuccess {
          0% {
            box-shadow:
              0 0 0 rgba(34, 211, 238, 0),
              0 0 0 rgba(168, 85, 247, 0);
          }

          35% {
            box-shadow:
              0 0 45px rgba(34, 211, 238, 0.35),
              0 0 80px rgba(168, 85, 247, 0.18);
          }

          100% {
            box-shadow:
              0 0 0 rgba(34, 211, 238, 0),
              0 0 0 rgba(168, 85, 247, 0);
          }
        }

        .upgrade-success {
          animation: upgradeSuccess 600ms ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </main>
  );
};

/* ===============================================================
   UPGRADE CARD
================================================================ */

const UpgradeCard = ({
  name,
  description,
  level,
  maxLevel,
  cost,
  crystals,
  selected,
  index,
  onUpgrade,
}) => {
  const isMaxed = level >= maxLevel;
  const canUpgrade = crystals >= cost && !isMaxed;
  const progress = maxLevel > 0 ? (level / maxLevel) * 100 : 0;

  return (
    <article
      className={`
        group relative overflow-hidden rounded-2xl
        border bg-black/30
        p-5 backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        ${
          isMaxed
            ? "border-emerald-400/20"
            : canUpgrade
              ? "border-purple-400/20 hover:border-purple-400/45 hover:bg-purple-500/[0.025]"
              : "border-white/[0.07] hover:border-white/[0.12]"
        }
        ${selected ? "upgrade-success" : ""}
      `}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Card ambient glow */}
      <div
        className={`
          pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full blur-3xl
          transition-opacity duration-300
          ${
            isMaxed
              ? "bg-emerald-400/[0.06]"
              : canUpgrade
                ? "bg-purple-500/[0.07]"
                : "bg-cyan-500/[0.025]"
          }
        `}
      />

      {/* Top accent */}
      <div
        className={`
          pointer-events-none absolute left-1/2 top-0 h-px w-1/2
          -translate-x-1/2
          bg-gradient-to-r from-transparent to-transparent
          ${
            isMaxed
              ? "via-emerald-400/50"
              : canUpgrade
                ? "via-purple-400/50"
                : "via-white/10"
          }
        `}
      />

      <div className="relative">

        {/* Card heading */}
        <div className="mb-4 flex items-start justify-between gap-3">

          <div>
            <div
              className={`
                mb-1 text-[8px] font-bold uppercase tracking-[0.3em]
                ${
                  isMaxed
                    ? "text-emerald-400/60"
                    : canUpgrade
                      ? "text-purple-400/60"
                      : "text-white/20"
                }
              `}
            >
              Ability {String(index + 1).padStart(2, "0")}
            </div>

            <h3 className="text-lg font-black uppercase tracking-[0.08em] text-white/85">
              {name}
            </h3>
          </div>

          {/* Level badge */}
          <div
            className={`
              shrink-0 rounded-xl border px-2.5 py-1.5 text-center
              ${
                isMaxed
                  ? "border-emerald-400/20 bg-emerald-400/[0.06]"
                  : "border-purple-400/15 bg-purple-400/[0.05]"
              }
            `}
          >
            <div className="text-[7px] font-bold uppercase tracking-[0.15em] text-white/25">
              LVL
            </div>

            <div
              className={`
                text-sm font-black tabular-nums
                ${isMaxed ? "text-emerald-300" : "text-purple-300"}
              `}
            >
              {level}
              <span className="text-white/20">/{maxLevel}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-5 min-h-[40px] text-xs leading-5 text-white/35">
          {description}
        </p>

        {/* Level progression */}
        <div className="mb-5">

          <div className="mb-2 flex items-center justify-between">
            <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
              Mastery
            </span>

            <span className="text-[8px] font-bold text-white/30">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.06]">

            <div
              className={`
                absolute inset-y-0 left-0 rounded-full
                transition-all duration-500
                ${
                  isMaxed
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]"
                    : "bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                }
              `}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Level pips */}
          <div className="mt-2 flex justify-between">
            {Array.from({ length: maxLevel }, (_, i) => (
              <span
                key={i}
                className={`
                  h-1 w-1 rounded-full transition-colors
                  ${
                    i < level
                      ? isMaxed
                        ? "bg-emerald-400"
                        : "bg-purple-400"
                      : "bg-white/10"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Action */}
        {isMaxed ? (
          <div className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300/80">
            <span className="text-sm">✓</span>
            MAXIMUM POWER
          </div>
        ) : (
          <button
            type="button"
            onClick={onUpgrade}
            disabled={!canUpgrade}
            className={`
              relative h-11 w-full overflow-hidden rounded-xl
              border
              text-[9px] font-black uppercase tracking-[0.18em]
              transition-all duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-purple-400/60
              ${
                canUpgrade
                  ? `
                    border-purple-400/30
                    bg-gradient-to-r
                    from-purple-600/80
                    via-violet-600/80
                    to-blue-600/80
                    text-white
                    shadow-[0_8px_25px_rgba(139,92,246,0.15)]
                    hover:-translate-y-0.5
                    hover:border-purple-300/50
                    hover:shadow-[0_10px_35px_rgba(139,92,246,0.28)]
                    active:translate-y-0
                  `
                  : `
                    cursor-not-allowed
                    border-white/[0.05]
                    bg-white/[0.025]
                    text-white/20
                  `
              }
            `}
          >
            {canUpgrade ? (
              <span className="relative flex items-center justify-center gap-2">
                <span>UPGRADE</span>
                <span className="h-4 w-px bg-white/20" />
                <span className="text-yellow-200">
                  {cost} 💎
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>NEED</span>
                <span className="text-yellow-200/50">
                  {cost} 💎
                </span>
              </span>
            )}

            {/* Button shine */}
            {canUpgrade && (
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/10 transition-all duration-700 hover:left-[120%]" />
            )}
          </button>
        )}

        {/* Cost hint */}
        {!isMaxed && (
          <div className="mt-2 text-center text-[7px] font-medium uppercase tracking-[0.2em] text-white/15">
            {canUpgrade
              ? "Crystal reserves sufficient"
              : `${cost - crystals} more crystal${
                  cost - crystals === 1 ? "" : "s"
                } required`}
          </div>
        )}
      </div>
    </article>
  );
};

export default UpgradesScreen;
