// Game state management
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 800;
export const TILE_SIZE = 40;

export const NIGHT_PHASES = {
  TWILIGHT: 0,
  MIDNIGHT: 1,
  DEEP_NIGHT: 2,
  BLOOD_MOON: 3,
  FINAL_HUNT: 4
};

export const createGameState = () => ({
  gameRunning: false,
  gamePaused: false,
  nightPhase: NIGHT_PHASES.TWILIGHT,
  nightTimer: 0,
  nightDuration: 180000, // 3 minutes in milliseconds
  
  // Player stats
  player: {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
    width: 30,
    height: 30,
    velocityX: 0,
    velocityY: 0,
    speed: 250,
    maxHealth: 100,
    health: 100,
    maxStamina: 100,
    stamina: 100,
    staminaRegen: 30,
    staminaDrain: 50,
    maxHowlEnergy: 100,
    howlEnergy: 100,
    howlEnergyRegen: 15,
    howlCooldown: 0,
    howlCooldownMax: 2000,
    isDashing: false,
    dashCooldown: 0,
    dashDuration: 300,
    dashSpeed: 500,
    dashStaminaCost: 30,
  },
  
  // Game metrics
  score: 0,
  combo: 0,
  comboBones: 0,
  comboTimeout: 0,
  comboTimeoutMax: 3000,
  bonesCollected: 0,
  moonCrystalsCollected: 0,
  enemiesDefeated: 0,
  bestCombo: 0,
  survivalTime: 0,
  
  // Arrays
  enemies: [],
  particles: [],
  collectibles: [],
  visibleAreas: [],
  
  // UI
  showGameOver: false,
  showVictory: false,
  gameOverReason: '',
  
  // Audio
  audioEnabled: true,
});

export const updateNightPhase = (gameState) => {
  const progress = gameState.nightTimer / gameState.nightDuration;
  
  if (progress < 0.2) {
    gameState.nightPhase = NIGHT_PHASES.TWILIGHT;
  } else if (progress < 0.4) {
    gameState.nightPhase = NIGHT_PHASES.MIDNIGHT;
  } else if (progress < 0.6) {
    gameState.nightPhase = NIGHT_PHASES.DEEP_NIGHT;
  } else if (progress < 0.8) {
    gameState.nightPhase = NIGHT_PHASES.BLOOD_MOON;
  } else {
    gameState.nightPhase = NIGHT_PHASES.FINAL_HUNT;
  }
  
  return gameState;
};

export const getNightPhaseColor = (phase) => {
  switch (phase) {
    case NIGHT_PHASES.TWILIGHT:
      return '#1a1a2e';
    case NIGHT_PHASES.MIDNIGHT:
      return '#0f0f1e';
    case NIGHT_PHASES.DEEP_NIGHT:
      return '#0a0a14';
    case NIGHT_PHASES.BLOOD_MOON:
      return '#2a0a0a';
    case NIGHT_PHASES.FINAL_HUNT:
      return '#4a0a0a';
    default:
      return '#1a1a2e';
  }
};

export const getNightPhaseName = (phase) => {
  switch (phase) {
    case NIGHT_PHASES.TWILIGHT:
      return 'Twilight';
    case NIGHT_PHASES.MIDNIGHT:
      return 'Midnight';
    case NIGHT_PHASES.DEEP_NIGHT:
      return 'Deep Night';
    case NIGHT_PHASES.BLOOD_MOON:
      return 'Blood Moon';
    case NIGHT_PHASES.FINAL_HUNT:
      return 'Final Hunt';
    default:
      return 'Unknown';
  }
};
