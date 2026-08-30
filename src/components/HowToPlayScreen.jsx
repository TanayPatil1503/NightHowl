import React, { useState } from "react";
import { ScreenButton } from "./GameOverScreen";

export const HowToPlayScreen = ({ onBack }) => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      name: "Twilight",
      time: "00:00",
      color: "cyan",
      icon: "🌅",
      description: "The night begins. Enemies are slow and few.",
      threat: "LOW",
    },
    {
      name: "Midnight",
      time: "25:00",
      color: "blue",
      icon: "🌙",
      description: "More enemies appear. Stay alert.",
      threat: "MEDIUM",
    },
    {
      name: "Deep Night",
      time: "50:00",
      color: "purple",
      icon: "🌑",
      description: "Darkness deepens. Stronger enemies emerge.",
      threat: "HIGH",
    },
    {
      name: "Blood Moon",
      time: "75:00",
      color: "red",
      icon: "🔴",
      description: "The sky turns red. Dangerous creatures roam.",
      threat: "EXTREME",
    },
    {
      name: "Final Hunt",
      time: "90:00",
      color: "orange",
      icon: "☠",
      description: "The night's end. Survive the final moments.",
      threat: "DEADLY",
    },
  ];

  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
    })),
  );

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#03020a] text-white">

      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_15%,#24144f_0%,#0d0920_40%,#030208_100%)]" />

      <div className="pointer-events-none fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -bottom-52 -right-52 h-[650px] w-[650px] rounded-full bg-purple-700/[0.09] blur-[160px]" />

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
              animation: `howToTwinkle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          TOP NAV
      ========================================================= */}

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#05030d]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

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
              Field Guide
            </div>
          </div>

          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.25em] text-white/20">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/60" />
            Stay alive
          </div>
        </div>
      </header>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="mx-auto mb-10 max-w-3xl text-center">

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/40" />

            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-cyan-300/40">
              Survivor's handbook
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>

          <h1 className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-4xl font-black uppercase tracking-[0.08em] text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.25)] sm:text-5xl lg:text-6xl">
            How To Survive
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/30 sm:text-sm">
            The forest is alive.
            <br />
            Learn its rules before the darkness learns yours.
          </p>
        </section>

        {/* =======================================================
            QUICK START
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="⚡"
            eyebrow="Start here"
            title="Quick Start"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <QuickStep
              number="01"
              icon="🐺"
              title="MOVE"
              description="Explore the forest and keep your distance from danger."
            />

            <QuickStep
              number="02"
              icon="🌙"
              title="HOWL"
              description="Reveal hidden objects and temporarily stun enemies."
            />

            <QuickStep
              number="03"
              icon="💎"
              title="SURVIVE"
              description="Collect crystals, avoid enemies, and reach safety."
            />

          </div>
        </section>

        {/* =======================================================
            CONTROLS
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="🎮"
            eyebrow="Know your abilities"
            title="Controls"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <ControlCard
              keys={["W", "A", "S", "D"]}
              label="MOVE"
              description="Move your wolf through the forest."
              color="cyan"
            />

            <ControlCard
              keys={["SPACE"]}
              label="HOWL"
              description="Reveal hidden items and stun nearby enemies."
              color="purple"
            />

            <ControlCard
              keys={["SHIFT"]}
              label="DASH"
              description="Quickly escape danger. Uses stamina."
              color="blue"
            />

            <ControlCard
              keys={["E"]}
              label="INTERACT"
              description="Interact with the Moon Shrine."
              color="yellow"
              comingSoon
            />

          </div>
        </section>

        {/* =======================================================
            OBJECTIVE
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="🎯"
            eyebrow="Your mission"
            title="Objective"
          />

          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-black/30 p-5 backdrop-blur-xl sm:p-6">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/[0.06] blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:items-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/[0.06] text-4xl shadow-[0_0_40px_rgba(34,211,238,0.10)] md:mx-0">
                🌕
              </div>

              <div>
                <h3 className="mb-2 text-lg font-black uppercase tracking-[0.12em] text-cyan-200/90">
                  Reach the Moon Shrine
                </h3>

                <p className="text-xs leading-6 text-white/35 sm:text-sm">
                  Survive the night by avoiding enemies, collecting valuable
                  items, and reaching the Moon Shrine before dawn. As time
                  passes, the forest becomes increasingly hostile.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag text="Explore" />
                  <Tag text="Collect" />
                  <Tag text="Howl" />
                  <Tag text="Escape" />
                  <Tag text="Survive" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =======================================================
            MECHANICS
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="⚙️"
            eyebrow="Master the night"
            title="Game Mechanics"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <MechanicCard
              icon="❤️"
              name="Health"
              description="Lose health when enemies hit you. Reach zero and the night ends."
              color="red"
            />

            <MechanicCard
              icon="⚡"
              name="Stamina"
              description="Used for dashing. Recover stamina while moving safely or standing still."
              color="yellow"
            />

            <MechanicCard
              icon="🐺"
              name="Howl"
              description="Creates a pulse that reveals hidden objects and stuns enemies."
              color="cyan"
            />

            <MechanicCard
              icon="💎"
              name="Moon Crystals"
              description="Rare collectibles used to permanently upgrade your abilities."
              color="purple"
            />

            <MechanicCard
              icon="🦴"
              name="Bones"
              description="Common collectibles worth 50 points each."
              color="white"
            />

            <MechanicCard
              icon="🔥"
              name="Combos"
              description="Collect several items quickly to build your score multiplier."
              color="orange"
            />

          </div>
        </section>

        {/* =======================================================
            NIGHT PHASES
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="🌙"
            eyebrow="The forest changes"
            title="Night Phases"
          />

          <div className="overflow-hidden rounded-2xl border border-purple-400/15 bg-black/30 backdrop-blur-xl">

            {/* Timeline */}
            <div className="overflow-x-auto border-b border-white/[0.05]">
              <div className="flex min-w-[650px]">

                {phases.map((phase, index) => (
                  <button
                    key={phase.name}
                    type="button"
                    onClick={() => setActivePhase(index)}
                    className={`
                      relative flex-1 px-3 py-4
                      text-center transition-all duration-300
                      focus:outline-none
                      ${
                        activePhase === index
                          ? "bg-white/[0.045]"
                          : "hover:bg-white/[0.025]"
                      }
                    `}
                  >
                    <div className="text-lg">{phase.icon}</div>

                    <div
                      className={`
                        mt-2 text-[8px] font-black uppercase tracking-[0.12em]
                        ${
                          activePhase === index
                            ? "text-white/80"
                            : "text-white/30"
                        }
                      `}
                    >
                      {phase.name}
                    </div>

                    <div className="mt-1 text-[7px] font-medium text-white/15">
                      {phase.time}
                    </div>

                    {activePhase === index && (
                      <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    )}
                  </button>
                ))}

              </div>
            </div>

            {/* Active phase */}
            <div className="p-5 sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-3xl">
                  {phases[activePhase].icon}
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-xl font-black uppercase tracking-[0.08em] text-white/85">
                      {phases[activePhase].name}
                    </h3>

                    <span
                      className={`
                        rounded-full border px-2 py-1
                        text-[7px] font-black uppercase tracking-[0.18em]
                        ${
                          activePhase <= 0
                            ? "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300/70"
                            : activePhase === 1
                              ? "border-blue-400/20 bg-blue-400/[0.06] text-blue-300/70"
                              : activePhase === 2
                                ? "border-purple-400/20 bg-purple-400/[0.06] text-purple-300/70"
                                : activePhase === 3
                                  ? "border-red-400/20 bg-red-400/[0.06] text-red-300/70"
                                  : "border-orange-400/20 bg-orange-400/[0.06] text-orange-300/70"
                        }
                      `}
                    >
                      {phases[activePhase].threat} THREAT
                    </span>

                  </div>

                  <p className="mt-2 text-xs leading-5 text-white/35">
                    {phases[activePhase].description}
                  </p>

                </div>

              </div>

              {/* Danger meter */}
              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
                    Danger level
                  </span>

                  <span className="text-[8px] font-bold text-red-300/50">
                    {activePhase + 1} / {phases.length}
                  </span>
                </div>

                <div className="flex gap-1">
                  {phases.map((_, index) => (
                    <div
                      key={index}
                      className={`
                        h-1.5 flex-1 rounded-full transition-all duration-500
                        ${
                          index <= activePhase
                            ? index < 2
                              ? "bg-cyan-400/70"
                              : index === 2
                                ? "bg-purple-400/70"
                                : "bg-red-400/70"
                            : "bg-white/[0.06]"
                        }
                      `}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            ENEMIES
        ======================================================= */}

        <section className="mb-5">
          <SectionHeader
            icon="👾"
            eyebrow="Know your enemy"
            title="Creatures of the Night"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <EnemyCard
              icon="🦇"
              name="Shadow Bat"
              threat="LOW"
              description="A fast flyer that chases you from medium range. Weak, but dangerous in groups."
              color="blue"
            />

            <EnemyCard
              icon="🌲"
              name="Forest Stalker"
              threat="MEDIUM"
              description="Slow but powerful ground enemy. Appears later in the night."
              color="green"
            />

            <EnemyCard
              icon="🐺"
              name="Howler"
              threat="HIGH"
              description="An enemy wolf capable of howling. Keep your distance."
              color="purple"
            />

            <EnemyCard
              icon="👹"
              name="Night Beast"
              threat="DEADLY"
              description="A rare and powerful creature that emerges during the Blood Moon."
              color="red"
            />

          </div>
        </section>

        {/* =======================================================
            PRO TIPS
        ======================================================= */}

        <section className="mb-8">
          <SectionHeader
            icon="💡"
            eyebrow="Veteran knowledge"
            title="Pro Tips"
          />

          <div className="relative overflow-hidden rounded-2xl border border-yellow-400/10 bg-black/30 p-5 backdrop-blur-xl sm:p-6">

            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-yellow-400/[0.04] blur-3xl" />

            <div className="relative grid gap-3 sm:grid-cols-2">

              <Tip number="01">
                Use your <strong>Howl</strong> to reveal hidden collectibles
                before moving into dangerous areas.
              </Tip>

              <Tip number="02">
                Save your <strong>Dash</strong> for emergencies rather than
                wasting stamina during exploration.
              </Tip>

              <Tip number="03">
                Collect <strong>Moon Crystals</strong> whenever possible.
                Permanent upgrades make future runs easier.
              </Tip>

              <Tip number="04">
                Keep moving. A stationary wolf is an easy target.
              </Tip>

              <Tip number="05">
                Learn enemy movement patterns instead of trying to outrun
                everything.
              </Tip>

              <Tip number="06">
                Build <strong>combos</strong> by collecting items quickly to
                maximize your score.
              </Tip>

            </div>
          </div>
        </section>

        {/* =======================================================
            BACK
        ======================================================= */}

        <div className="flex flex-col items-center gap-4 pb-5">

          <ScreenButton onClick={onBack} variant="primary">
            ← BACK TO MENU
          </ScreenButton>

          <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.3em] text-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/50" />
            The forest is waiting
          </div>

        </div>
      </div>

      <style>{`
        @keyframes howToTwinkle {
          0%, 100% {
            opacity: 0.08;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
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
   SECTION HEADER
================================================================ */

const SectionHeader = ({ icon, eyebrow, title }) => (
  <div className="mb-3 flex items-end justify-between px-1">

    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-sm">
        {icon}
      </div>

      <div>
        <div className="text-[7px] font-bold uppercase tracking-[0.3em] text-cyan-300/35">
          {eyebrow}
        </div>

        <h2 className="mt-0.5 text-sm font-black uppercase tracking-[0.16em] text-white/75 sm:text-base">
          {title}
        </h2>
      </div>

    </div>

    <div className="hidden h-px w-24 bg-gradient-to-r from-white/[0.08] to-transparent sm:block" />
  </div>
);

/* ===============================================================
   QUICK STEP
================================================================ */

const QuickStep = ({ number, icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20">

    <div className="absolute right-3 top-3 text-[8px] font-black tracking-[0.2em] text-white/10">
      {number}
    </div>

    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-lg transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>

    <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/80">
      {title}
    </h3>

    <p className="mt-2 text-[10px] leading-5 text-white/30">
      {description}
    </p>
  </div>
);

/* ===============================================================
   CONTROL CARD
================================================================ */

const ControlCard = ({
  keys,
  label,
  description,
  color = "cyan",
  comingSoon,
}) => {
  const colors = {
    cyan: "border-cyan-400/15 bg-cyan-400/[0.025] text-cyan-300",
    purple: "border-purple-400/15 bg-purple-400/[0.025] text-purple-300",
    blue: "border-blue-400/15 bg-blue-400/[0.025] text-blue-300",
    yellow: "border-yellow-400/15 bg-yellow-400/[0.025] text-yellow-300",
  };

  return (
    <div
      className={`
        rounded-2xl border p-4
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        ${colors[color]}
      `}
    >
      <div className="flex items-center gap-4">

        <div className="flex min-w-[92px] items-center gap-1.5">
          {keys.map((key) => (
            <kbd
              key={key}
              className="
                flex h-8 min-w-8 items-center justify-center
                rounded-lg border border-white/10
                bg-black/40 px-1.5
                font-mono text-[10px] font-black
                text-white/75
                shadow-[inset_0_-2px_0_rgba(255,255,255,0.04)]
              "
            >
              {key}
            </kbd>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">

            <h3 className="text-[9px] font-black uppercase tracking-[0.2em]">
              {label}
            </h3>

            {comingSoon && (
              <span className="rounded-full border border-yellow-400/15 bg-yellow-400/[0.05] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.15em] text-yellow-300/50">
                Soon
              </span>
            )}

          </div>

          <p className="mt-1 text-[9px] leading-4 text-white/30">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

/* ===============================================================
   MECHANIC CARD
================================================================ */

const MechanicCard = ({ icon, name, description, color }) => {
  const colorMap = {
    red: "border-red-400/15 text-red-300",
    yellow: "border-yellow-400/15 text-yellow-300",
    cyan: "border-cyan-400/15 text-cyan-300",
    purple: "border-purple-400/15 text-purple-300",
    white: "border-white/10 text-white/70",
    orange: "border-orange-400/15 text-orange-300",
  };

  return (
    <div
      className={`
        group rounded-2xl border
        bg-black/25 p-4
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.025]
        ${colorMap[color]}
      `}
    >
      <div className="flex gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.035] text-lg transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.16em]">
            {name}
          </h3>

          <p className="mt-1.5 text-[9px] leading-5 text-white/30">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

/* ===============================================================
   ENEMY CARD
================================================================ */

const EnemyCard = ({
  icon,
  name,
  threat,
  description,
  color,
}) => {
  const colors = {
    blue: {
      border: "border-blue-400/15 hover:border-blue-400/30",
      icon: "bg-blue-400/[0.06]",
      text: "text-blue-300",
    },
    green: {
      border: "border-green-400/15 hover:border-green-400/30",
      icon: "bg-green-400/[0.06]",
      text: "text-green-300",
    },
    purple: {
      border: "border-purple-400/15 hover:border-purple-400/30",
      icon: "bg-purple-400/[0.06]",
      text: "text-purple-300",
    },
    red: {
      border: "border-red-400/15 hover:border-red-400/30",
      icon: "bg-red-400/[0.06]",
      text: "text-red-300",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        border bg-black/30 p-4
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        ${theme.border}
      `}
    >
      <div className="flex gap-4">

        <div
          className={`
            flex h-14 w-14 shrink-0 items-center justify-center
            rounded-2xl text-2xl
            ${theme.icon}
          `}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-white/80">
              {name}
            </h3>

            <span
              className={`
                text-[7px] font-black uppercase tracking-[0.18em]
                ${theme.text}
              `}
            >
              {threat}
            </span>
          </div>

          <p className="mt-2 text-[9px] leading-5 text-white/30">
            {description}
          </p>

        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   TIP
================================================================ */

const Tip = ({ number, children }) => (
  <div className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">

    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-yellow-400/[0.06] text-[7px] font-black text-yellow-300/50">
      {number}
    </div>

    <p className="text-[9px] leading-5 text-white/35">
      {children}
    </p>
  </div>
);

/* ===============================================================
   TAG
================================================================ */

const Tag = ({ text }) => (
  <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.15em] text-cyan-300/50">
    {text}
  </span>
);

export default HowToPlayScreen;
