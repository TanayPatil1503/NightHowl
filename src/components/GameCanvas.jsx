import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useKeyboard, useGameLoop } from '../hooks/useGameHooks';
import { renderGame } from '../utils/canvasRenderer';
import {
  createGameState,
  updateNightPhase,
  GAME_WIDTH,
  GAME_HEIGHT,
} from '../game/gameState';
import {
  updatePlayer,
  handlePlayerDash,
  handlePlayerHowl,
  takeDamage,
} from '../game/playerSystem';
import {
  updateEnemies,
  spawnEnemy,
  checkEnemyPlayerCollision,
} from '../game/enemySystem';
import { generateMap } from '../game/mapGenerator';
import {
  updateHowlEffect,
  createParticle,
  updateParticles,
  createScorePopup,
  updateScorePopups,
  createFirefly,
  updateFireflies,
} from '../game/particleSystem';
import { audioManager } from '../game/audioSystem';
import {
  loadSaveData,
  saveTotalCrystals,
  saveHighScore,
  saveBestSurvivalTime,
  updateStatistics,
} from '../game/saveSystem';
import { checkCollision } from '../game/collisionSystem';
import SettingsScreen from './SettingsScreen';
import HowToPlayScreen from './HowToPlayScreen';
import GameHUD from './GameHUD';

export const GameCanvas = ({
  onGameOver,
  onVictory,
  onMainMenu,
  upgradeLevels,
}) => {
  const canvasRef = useRef(null);
  const keys = useKeyboard();

  const [gameState, setGameState] = useState(() =>
    createGameState()
  );

  const [map, setMap] = useState(() =>
    generateMap(Date.now())
  );

  const [howlEffect, setHowlEffect] = useState(null);
  const [particles, setParticles] = useState([]);

  const [fireflies, setFireflies] = useState(() =>
    [...Array(8)].map(() =>
      createFirefly(
        Math.random() * GAME_WIDTH,
        Math.random() * GAME_HEIGHT
      )
    )
  );

  const [scorePopups, setScorePopups] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const gameStateRef = useRef(gameState);
  const lastEnemySpawnRef = useRef(0);
  const lastCollectibleCheckRef = useRef(0);
  const lastSpaceKeyRef = useRef(false);
  const lastShiftKeyRef = useRef(false);

  // --------------------------------------------------
  // Pause with Escape
  // --------------------------------------------------

  useEffect(() => {
    const handlePauseKey = (event) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();

      setIsPaused((paused) => !paused);
    };

    window.addEventListener(
      'keydown',
      handlePauseKey
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handlePauseKey
      );
    };
  }, []);

  // --------------------------------------------------
  // Apply upgrades
  // --------------------------------------------------

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,

        maxHealth:
          100 +
            ((upgradeLevels?.health?.level - 1) *
              20 || 0),

        maxStamina:
          100 +
            ((upgradeLevels?.stamina?.level - 1) *
              20 || 0),
      },
    }));
  }, [upgradeLevels]);

  // --------------------------------------------------
  // Main Game Loop
  // --------------------------------------------------

  useGameLoop(
    useCallback(
      (deltaTime) => {
        setGameState((prevState) => {
          let newState = {
            ...prevState,
          };

          gameStateRef.current = newState;

          // Update timer
          newState.nightTimer += deltaTime;

          newState.survivalTime = Math.floor(
            newState.nightTimer / 1000
          );

          // Check victory
          if (
            newState.nightTimer >=
            newState.nightDuration
          ) {
            newState.showVictory = true;

            return newState;
          }

          // Update night phase
          newState =
            updateNightPhase(newState);

          // Update player
          newState.player = updatePlayer(
            newState.player,
            keys,
            deltaTime
          );

          // --------------------------------------------------
          // Dash
          // --------------------------------------------------

          const isShiftPressed =
            keys['Shift'] ||
            keys['shift'];

          if (
            isShiftPressed &&
            !lastShiftKeyRef.current
          ) {
            handlePlayerDash(
              newState.player
            );
          }

          lastShiftKeyRef.current =
            isShiftPressed;

          // --------------------------------------------------
          // Howl
          // --------------------------------------------------

          const isSpacePressed =
            keys[' '];

          if (
            isSpacePressed &&
            !lastSpaceKeyRef.current
          ) {
            const howl =
              handlePlayerHowl(
                newState.player,
                newState
              );

            if (howl) {
              setHowlEffect(howl);

              setParticles((prev) => {
                const newParticles = [
                  ...prev,
                ];

                for (let i = 0; i < 20; i++) {
                  const angle =
                    (i / 20) *
                    Math.PI *
                    2;

                  newParticles.push(
                    createParticle(
                      newState.player.x +
                        newState.player
                          .width /
                          2 +
                        Math.cos(angle) *
                          30,

                      newState.player.y +
                        newState.player
                          .height /
                          2 +
                        Math.sin(angle) *
                          30,

                      Math.cos(angle) *
                        200,

                      Math.sin(angle) *
                        200,

                      500
                    )
                  );
                }

                return newParticles;
              });
            }
          }

          lastSpaceKeyRef.current =
            isSpacePressed;

          // --------------------------------------------------
          // Enemies
          // --------------------------------------------------

          newState.enemies =
            updateEnemies(
              newState.enemies,
              newState.player,
              deltaTime,
              howlEffect,
              newState
            );

          // Spawn enemies
          lastEnemySpawnRef.current +=
            deltaTime;

          if (
            lastEnemySpawnRef.current >
            2000
          ) {
            const newEnemy =
              spawnEnemy(newState);

            if (newEnemy) {
              newState.enemies.push(
                newEnemy
              );
            }

            lastEnemySpawnRef.current = 0;
          }

          // --------------------------------------------------
          // Enemy / Player collision
          // --------------------------------------------------

          newState.enemies.forEach(
            (enemy) => {
              if (
                checkEnemyPlayerCollision(
                  enemy,
                  newState.player
                )
              ) {
                if (
                  takeDamage(
                    newState.player,
                    enemy.damage
                  )
                ) {
                  newState.showGameOver =
                    true;

                  newState.gameOverReason =
                    'Defeated';
                }
              }
            }
          );

          // --------------------------------------------------
          // Collectibles
          // --------------------------------------------------

          lastCollectibleCheckRef.current +=
            deltaTime;

          if (
            lastCollectibleCheckRef.current >
            100
          ) {
            map.collectibles.forEach(
              (collectible) => {
                if (
                  collectible.collected
                ) {
                  return;
                }

                const pickupRadius = 50;

                const dx =
                  newState.player.x -
                  collectible.x;

                const dy =
                  newState.player.y -
                  collectible.y;

                const dist = Math.sqrt(
                  dx * dx + dy * dy
                );

                if (
                  dist < pickupRadius
                ) {
                  collectible.collected =
                    true;

                  newState.score +=
                    collectible.value;

                  newState.comboBones += 1;

                  newState.comboTimeout =
                    newState.comboTimeoutMax;

                  if (
                    collectible.type ===
                    'bone'
                  ) {
                    newState.bonesCollected +=
                      1;
                  } else if (
                    collectible.type ===
                    'moon_crystal'
                  ) {
                    newState.moonCrystalsCollected +=
                      1;
                  }

                  setScorePopups(
                    (prev) => [
                      ...prev,
                      createScorePopup(
                        collectible.x,
                        collectible.y,
                        `+${collectible.value} ${
                          collectible.type ===
                          'bone'
                            ? 'BONE'
                            : 'CRYSTAL'
                        }`,
                        collectible.type
                      ),
                    ]
                  );
                }
              }
            );

            lastCollectibleCheckRef.current =
              0;
          }

          // --------------------------------------------------
          // Combo
          // --------------------------------------------------

          if (
            newState.comboTimeout > 0
          ) {
            newState.comboTimeout -=
              deltaTime;
          } else {
            newState.combo =
              Math.floor(
                newState.comboBones / 5
              );
          }

          return newState;
        });

        // Howl
        setHowlEffect((prev) =>
          prev
            ? updateHowlEffect(
                prev,
                deltaTime
              )
            : null
        );

        // Particles
        setParticles((prev) =>
          updateParticles(
            prev,
            deltaTime
          )
        );

        // Fireflies
        setFireflies((prev) =>
          updateFireflies(
            prev,
            deltaTime
          )
        );

        // Score popups
        setScorePopups((prev) =>
          updateScorePopups(
            prev,
            deltaTime
          )
        );
      },
      [keys, map, howlEffect]
    ),
    !gameState.showGameOver &&
      !gameState.showVictory &&
      !isPaused
  );

  // --------------------------------------------------
  // Canvas Rendering
  // --------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    renderGame(
      ctx,
      gameState,
      map,
      howlEffect,
      particles,
      fireflies,
      scorePopups
    );
  }, [
    gameState,
    map,
    howlEffect,
    particles,
    fireflies,
    scorePopups,
  ]);

  // --------------------------------------------------
  // Game Over
  // --------------------------------------------------

  useEffect(() => {
    if (!gameState.showGameOver) {
      return;
    }

    saveHighScore(gameState.score);

    saveTotalCrystals(
      gameState.moonCrystalsCollected
    );

    saveBestSurvivalTime(
      gameState.survivalTime
    );

    onGameOver({
      score: gameState.score,
      bonesCollected:
        gameState.bonesCollected,
      crystalsCollected:
        gameState.moonCrystalsCollected,
      enemiesDefeated:
        gameState.enemies.length,
      survivalTime:
        gameState.survivalTime,
    });
  }, [gameState.showGameOver]);

  // --------------------------------------------------
  // Victory
  // --------------------------------------------------

  useEffect(() => {
    if (!gameState.showVictory) {
      return;
    }

    saveHighScore(gameState.score);

    saveTotalCrystals(
      gameState.moonCrystalsCollected
    );

    saveBestSurvivalTime(
      gameState.survivalTime
    );

    onVictory({
      score: gameState.score,
      bonesCollected:
        gameState.bonesCollected,
      crystalsCollected:
        gameState.moonCrystalsCollected,
      enemiesDefeated:
        gameState.enemies.length,
      survivalTime:
        gameState.survivalTime,
    });
  }, [gameState.showVictory]);

  // --------------------------------------------------
  // GAME SCREEN LAYOUT
  // --------------------------------------------------

  return (
    <div className="min-h-screen w-full bg-slate-950 p-3 sm:p-5 lg:p-6">

      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1800px] flex-col gap-4 lg:min-h-[calc(100vh-3rem)] lg:flex-row lg:items-center lg:gap-5">

        {/* =================================================
            LEFT SIDEBAR
        ================================================== */}

        <aside className="w-full shrink-0 lg:w-[300px] xl:w-[340px] 2xl:w-[360px]">
          <GameHUD gameState={gameState} />
        </aside>

        {/* =================================================
            RIGHT GAME SCREEN
        ================================================== */}

        <main className="relative flex min-w-0 flex-1 items-center justify-center">

          <div className="relative w-fit max-w-full">

            <canvas
              ref={canvasRef}
              width={GAME_WIDTH}
              height={GAME_HEIGHT}
              className="
                game-canvas
                block
                max-h-[calc(100vh-2rem)]
                max-w-full
                rounded-xl
                border
                border-cyan-500/40
                shadow-[0_0_40px_-5px_rgba(34,211,238,0.35)]
              "
            />

            {/* Pause overlay belongs to GAME SCREEN */}
            {isPaused && (
              <PauseMenu
                onResume={() =>
                  setIsPaused(false)
                }
                onMainMenu={onMainMenu}
              />
            )}

          </div>

        </main>

      </div>

    </div>
  );
};

// ======================================================
// PAUSE MENU
// ======================================================

const PauseMenu = ({
  onResume,
  onMainMenu,
}) => {
  const [activeScreen, setActiveScreen] =
    useState('menu');

  if (activeScreen === 'settings') {
    return (
      <SettingsScreen
        onBack={() =>
          setActiveScreen('menu')
        }
      />
    );
  }

  if (
    activeScreen === 'how-to-play'
  ) {
    return (
      <HowToPlayScreen
        onBack={() =>
          setActiveScreen('menu')
        }
      />
    );
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center rounded-xl bg-slate-950/65 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-950/60 ring-1 ring-white/10 sm:p-8">

        <div className="mb-7 text-center">

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300/70">
            Night Howl
          </p>

          <h2 className="text-3xl font-black tracking-tight text-white">
            GAME PAUSED
          </h2>

          <p className="mt-2 text-sm text-white/55">
            The forest waits for your return.
          </p>

        </div>

        <div className="space-y-3">

          <PauseButton
            onClick={onResume}
            variant="primary"
          >
            Resume
          </PauseButton>

          <PauseButton
            onClick={() =>
              setActiveScreen(
                'settings'
              )
            }
          >
            Settings
          </PauseButton>

          <PauseButton
            onClick={() =>
              setActiveScreen(
                'how-to-play'
              )
            }
          >
            How to Play
          </PauseButton>

          <PauseButton
            onClick={onMainMenu}
            variant="quiet"
          >
            Main Menu
          </PauseButton>

        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-white/35">
          Press Esc to resume
        </p>

      </div>

    </div>
  );
};

// ======================================================
// PAUSE BUTTON
// ======================================================

const PauseButton = ({
  children,
  onClick,
  variant = 'default',
}) => {
  const styles = {
    primary:
      'border-cyan-300/30 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/15 hover:from-cyan-400 hover:to-blue-500',

    default:
      'border-white/10 bg-white/[0.06] text-white/85 hover:border-purple-300/30 hover:bg-purple-500/15',

    quiet:
      'border-white/10 bg-black/25 text-white/55 hover:bg-white/[0.08] hover:text-white',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default GameCanvas;
