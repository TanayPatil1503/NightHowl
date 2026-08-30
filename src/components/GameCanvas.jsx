import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useKeyboard, useGameLoop } from '../hooks/useGameHooks';
import { renderGame } from '../utils/canvasRenderer';
import { createGameState, updateNightPhase, GAME_WIDTH, GAME_HEIGHT, getNightPhaseName } from '../game/gameState';
import { updatePlayer, handlePlayerDash, handlePlayerHowl, takeDamage } from '../game/playerSystem';
import { updateEnemies, spawnEnemy, checkEnemyPlayerCollision } from '../game/enemySystem';
import { generateMap } from '../game/mapGenerator';
import { updateHowlEffect, createParticle, updateParticles, createScorePopup, updateScorePopups, createFirefly, updateFireflies } from '../game/particleSystem';
import { audioManager } from '../game/audioSystem';
import { loadSaveData, saveTotalCrystals, saveHighScore, saveBestSurvivalTime, updateStatistics } from '../game/saveSystem';
import { checkCollision } from '../game/collisionSystem';

export const GameCanvas = ({ onGameOver, onVictory, upgradeLevels }) => {
  const canvasRef = useRef(null);
  const keys = useKeyboard();
  const [gameState, setGameState] = useState(() => createGameState());
  const [map, setMap] = useState(() => generateMap(Date.now()));
  const [howlEffect, setHowlEffect] = useState(null);
  const [particles, setParticles] = useState([]);
  const [fireflies, setFireflies] = useState(() => [...Array(8)].map(() => createFirefly(Math.random() * GAME_WIDTH, Math.random() * GAME_HEIGHT)));
  const [scorePopups, setScorePopups] = useState([]);
  const gameStateRef = useRef(gameState);
  const lastEnemySpawnRef = useRef(0);
  const lastCollectibleCheckRef = useRef(0);
  const lastSpaceKeyRef = useRef(false);
  const lastShiftKeyRef = useRef(false);

  // Apply upgrades to game state
  useEffect(() => {
    setGameState(prevState => ({
      ...prevState,
      player: {
        ...prevState.player,
        maxHealth: 100 + (upgradeLevels?.health?.level - 1) * 20 || 100,
        maxStamina: 100 + (upgradeLevels?.stamina?.level - 1) * 20 || 100,
      },
    }));
  }, [upgradeLevels]);

  // Main game loop
  useGameLoop(
    useCallback(
      (deltaTime) => {
        setGameState((prevState) => {
          let newState = { ...prevState };
          gameStateRef.current = newState;

          // Update timer
          newState.nightTimer += deltaTime;
          newState.survivalTime = Math.floor(newState.nightTimer / 1000);

          // Check win condition
          if (newState.nightTimer >= newState.nightDuration) {
            newState.showVictory = true;
            return newState;
          }

          // Update night phase
          newState = updateNightPhase(newState);

          // Update player
          newState.player = updatePlayer(newState.player, keys, deltaTime);

          // Handle dash (only once when shift is pressed)
          const isShiftPressed = keys['Shift'] || keys['shift'];
          if (isShiftPressed && !lastShiftKeyRef.current) {
            handlePlayerDash(newState.player);
          }
          lastShiftKeyRef.current = isShiftPressed;

          // Handle howl (only once when space is pressed)
          const isSpacePressed = keys[' '];
          if (isSpacePressed && !lastSpaceKeyRef.current) {
            const howl = handlePlayerHowl(newState.player, newState);
            if (howl) {
              setHowlEffect(howl);
              setParticles((prev) => {
                const newParticles = [...prev];
                for (let i = 0; i < 20; i++) {
                  const angle = (i / 20) * Math.PI * 2;
                  newParticles.push(
                    createParticle(
                      newState.player.x + newState.player.width / 2 + Math.cos(angle) * 30,
                      newState.player.y + newState.player.height / 2 + Math.sin(angle) * 30,
                      Math.cos(angle) * 200,
                      Math.sin(angle) * 200,
                      500
                    )
                  );
                }
                return newParticles;
              });
            }
          }
          lastSpaceKeyRef.current = isSpacePressed;

          // Update enemies
          newState.enemies = updateEnemies(
            newState.enemies,
            newState.player,
            deltaTime,
            howlEffect,
            newState
          );

          // Spawn new enemies
          lastEnemySpawnRef.current += deltaTime;
          if (lastEnemySpawnRef.current > 2000) {
            const newEnemy = spawnEnemy(newState);
            if (newEnemy) {
              newState.enemies.push(newEnemy);
            }
            lastEnemySpawnRef.current = 0;
          }

          // Check enemy-player collisions
          newState.enemies.forEach((enemy) => {
            if (checkEnemyPlayerCollision(enemy, newState.player)) {
              if (takeDamage(newState.player, enemy.damage)) {
                newState.showGameOver = true;
                newState.gameOverReason = 'Defeated';
              }
            }
          });

          // Check collectible pickup
          lastCollectibleCheckRef.current += deltaTime;
          if (lastCollectibleCheckRef.current > 100) {
            map.collectibles.forEach((collectible) => {
              if (!collectible.collected) {
                const pickupRadius = 50;
                const dx = newState.player.x - collectible.x;
                const dy = newState.player.y - collectible.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < pickupRadius) {
                  collectible.collected = true;
                  newState.score += collectible.value;
                  newState.comboBones += 1;
                  newState.comboTimeout = newState.comboTimeoutMax;

                  if (collectible.type === 'bone') {
                    newState.bonesCollected += 1;
                  } else if (collectible.type === 'moon_crystal') {
                    newState.moonCrystalsCollected += 1;
                  }

                  // Score popup
                  setScorePopups((prev) => [
                    ...prev,
                    createScorePopup(
                      collectible.x,
                      collectible.y,
                      `+${collectible.value} ${collectible.type === 'bone' ? 'BONE' : 'CRYSTAL'}`,
                      collectible.type
                    ),
                  ]);
                }
              }
            });
            lastCollectibleCheckRef.current = 0;
          }

          // Update combo
          if (newState.comboTimeout > 0) {
            newState.comboTimeout -= deltaTime;
          } else {
            newState.combo = Math.floor(newState.comboBones / 5);
          }

          return newState;
        });

        // Update howl effect
        setHowlEffect((prev) => (prev ? updateHowlEffect(prev, deltaTime) : null));

        // Update particles
        setParticles((prev) => updateParticles(prev, deltaTime));

        // Update fireflies
        setFireflies((prev) => updateFireflies(prev, deltaTime));

        // Update score popups
        setScorePopups((prev) => updateScorePopups(prev, deltaTime));
      },
      [keys, map]
    ),
    !gameState.showGameOver && !gameState.showVictory
  );

  // Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    renderGame(ctx, gameState, map, howlEffect, particles, fireflies, scorePopups);
  }, [gameState, map, howlEffect, particles, fireflies, scorePopups]);

  // Handle game end
  useEffect(() => {
    if (gameState.showGameOver) {
      saveHighScore(gameState.score);
      saveTotalCrystals(gameState.moonCrystalsCollected);
      saveBestSurvivalTime(gameState.survivalTime);
      onGameOver({
        score: gameState.score,
        bonesCollected: gameState.bonesCollected,
        crystalsCollected: gameState.moonCrystalsCollected,
        enemiesDefeated: gameState.enemies.length,
        survivalTime: gameState.survivalTime,
      });
    }
  }, [gameState.showGameOver]);

  useEffect(() => {
    if (gameState.showVictory) {
      saveHighScore(gameState.score);
      saveTotalCrystals(gameState.moonCrystalsCollected);
      saveBestSurvivalTime(gameState.survivalTime);
      onVictory({
        score: gameState.score,
        bonesCollected: gameState.bonesCollected,
        crystalsCollected: gameState.moonCrystalsCollected,
        enemiesDefeated: gameState.enemies.length,
        survivalTime: gameState.survivalTime,
      });
    }
  }, [gameState.showVictory]);

  return (
    <div className="game-stage relative">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="game-canvas rounded-xl border border-cyan-500/40 shadow-[0_0_40px_-5px_rgba(34,211,238,0.35)]"
      />
      <GameHUD gameState={gameState} />
    </div>
  );
};

/* ---------- Small reusable HUD primitives ---------- */

const StatBar = ({ icon, label, value, max, colorFrom, colorTo, glow, danger }) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-2.5">
      <span className={`text-base leading-none drop-shadow-sm ${danger ? 'animate-pulse' : ''}`}>{icon}</span>
      <div className="w-32">
        <div className="mb-1 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.13em] text-white/55">
          <span>{label}</span>
          <span className="tabular-nums text-white/85">{Math.floor(value)}</span>
        </div>
        <div
          className="relative h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden backdrop-blur-sm"
          style={glow ? { boxShadow: `0 0 10px ${glow}` } : undefined}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
            }}
          />
          {danger && <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />}
        </div>
      </div>
    </div>
  );
};

const HudPanel = ({ children, className = '' }) => (
  <div
    className={`rounded-xl border border-white/10 bg-black/45 backdrop-blur-md shadow-lg shadow-black/30 ${className}`}
  >
    {children}
  </div>
);

/* ---------- Main HUD ---------- */

const GameHUD = ({ gameState }) => {
  const nightProgress = (gameState.nightTimer / gameState.nightDuration) * 100;
  const healthPercent = (gameState.player.health / gameState.player.maxHealth) * 100;
  const howlPercent = (gameState.player.howlEnergy / gameState.player.maxHowlEnergy) * 100;
  const howlReady = howlPercent >= 100;
  const isLowHealth = healthPercent <= 25;
  const phaseName = getNightPhaseName(gameState.nightPhase);
  const remainingSeconds = Math.max(
    0,
    Math.ceil((gameState.nightDuration - gameState.nightTimer) / 1000)
  );

  return (
    <div className="game-hud pointer-events-none absolute inset-0 text-white font-sans select-none">
      {/* Top Left - Vitals */}
      <HudPanel className="absolute top-4 left-4 px-4 py-3 space-y-2">
        <StatBar
          icon="🐺"
          label="Health"
          value={gameState.player.health}
          max={gameState.player.maxHealth}
          colorFrom="#22c55e"
          colorTo="#4ade80"
          glow={isLowHealth ? 'rgba(239,68,68,0.6)' : 'rgba(34,197,94,0.35)'}
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
      </HudPanel>

      {/* Top Center - Night Progress */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <HudPanel className="px-5 py-2.5 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-cyan-300 uppercase">
            <span>🌙</span>
            <span>{phaseName}</span>
          </div>
          <div className="relative w-56 h-2.5 rounded-full bg-black/40 border border-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, nightProgress)}%`, boxShadow: '0 0 10px rgba(56,189,248,0.6)' }}
            />
          </div>
          <div className="flex w-full items-center justify-between text-[10px] font-medium uppercase tracking-wider text-white/60 tabular-nums">
            <span>Survive until dawn</span>
            <span>{remainingSeconds}s</span>
          </div>
        </HudPanel>
      </div>

      {/* Top Right - Score */}
      <HudPanel className="absolute top-4 right-4 min-w-[150px] px-4 py-2.5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold tracking-widest text-cyan-300/80 uppercase">Score</div>
            <div className="text-xl font-extrabold text-yellow-300 tabular-nums leading-tight drop-shadow-[0_0_6px_rgba(253,224,71,0.5)]">
              {gameState.score.toLocaleString()}
            </div>
          </div>
          <div className="border-l border-white/10 pl-3 text-right">
            <div className="text-[9px] font-bold uppercase tracking-wider text-white/45">Collected</div>
            <div className="mt-0.5 flex justify-end gap-1.5 text-[11px] font-semibold tabular-nums text-white/80">
              <span title="Bones">🦴 {gameState.bonesCollected}</span>
              <span title="Moon crystals" className="text-cyan-200">💎 {gameState.moonCrystalsCollected}</span>
            </div>
          </div>
        </div>
        {gameState.combo > 0 && (
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-400/40 px-2 py-0.5 text-[11px] font-bold text-red-300 animate-pulse">
            🔥 COMBO ×{gameState.combo}
          </div>
        )}
      </HudPanel>

      {/* Bottom Center - Howl Ability */}
      <HudPanel
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-3 flex flex-col items-center gap-1.5 transition-shadow duration-300 ${
          howlReady ? 'ring-1 ring-purple-400/60 shadow-purple-500/40' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-purple-300">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono normal-case">
            Space
          </kbd>
          <span>Howl</span>
          {howlReady && <span className="text-purple-200 animate-pulse">READY</span>}
        </div>
        <div className="relative w-36 h-3 rounded-full bg-black/40 border border-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-300 ease-out"
            style={{
              width: `${howlPercent}%`,
              boxShadow: howlReady ? '0 0 14px rgba(217,70,239,0.75)' : 'none',
            }}
          />
        </div>
      </HudPanel>

      {/* Bottom Right - Controls */}
      <HudPanel className="absolute bottom-5 right-4 flex flex-col items-end gap-1 px-3 py-2 text-[11px] text-white/55">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-[10px]">WASD / ←↑→↓</kbd>
          <span>Move</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-[10px]">Shift</kbd>
          <span>Dash</span>
        </div>
      </HudPanel>

      {/* Low health vignette warning */}
      {isLowHealth && (
        <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse shadow-[inset_0_0_120px_30px_rgba(239,68,68,0.35)]" />
      )}
    </div>
  );
};

export default GameCanvas;
