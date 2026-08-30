import { GAME_WIDTH, GAME_HEIGHT, NIGHT_PHASES } from './gameState';

export const ENEMY_TYPES = {
  SHADOW_BAT: 'shadow_bat',
  FOREST_STALKER: 'forest_stalker',
  HOWLER: 'howler',
  NIGHT_BEAST: 'night_beast',
};

const ENEMY_CONFIGS = {
  [ENEMY_TYPES.SHADOW_BAT]: {
    width: 25,
    height: 20,
    speed: 200,
    health: 20,
    damage: 15,
    detectionRange: 250,
    value: 100,
  },
  [ENEMY_TYPES.FOREST_STALKER]: {
    width: 40,
    height: 50,
    speed: 80,
    health: 50,
    damage: 25,
    detectionRange: 300,
    value: 150,
  },
  [ENEMY_TYPES.HOWLER]: {
    width: 35,
    height: 45,
    speed: 150,
    health: 60,
    damage: 20,
    detectionRange: 280,
    value: 200,
  },
  [ENEMY_TYPES.NIGHT_BEAST]: {
    width: 60,
    height: 70,
    speed: 120,
    health: 100,
    damage: 40,
    detectionRange: 350,
    value: 300,
  },
};

export const createEnemy = (type, x, y) => {
  const config = ENEMY_CONFIGS[type];
  return {
    id: Math.random(),
    type,
    x,
    y,
    velocityX: 0,
    velocityY: 0,
    width: config.width,
    height: config.height,
    speed: config.speed,
    maxHealth: config.health,
    health: config.health,
    damage: config.damage,
    detectionRange: config.detectionRange,
    value: config.value,
    targetX: x,
    targetY: y,
    attackCooldown: 0,
    attackCooldownMax: 1500,
    stunned: false,
    stunDuration: 0,
    stunDurationMax: 1000,
  };
};

export const updateEnemies = (enemies, player, deltaTime, howlEffect, gameState) => {
  return enemies
    .map(enemy => updateEnemy(enemy, player, deltaTime, howlEffect, gameState))
    .filter(enemy => enemy.health > 0);
};

const updateEnemy = (enemy, player, deltaTime, howlEffect, gameState) => {
  // Check if stunned by howl
  if (howlEffect && isInHowlRange(enemy, howlEffect)) {
    enemy.stunned = true;
    enemy.stunDuration = enemy.stunDurationMax;
  }

  if (enemy.stunned) {
    enemy.stunDuration -= deltaTime;
    if (enemy.stunDuration <= 0) {
      enemy.stunned = false;
    } else {
      // Stunned enemies don't move
      return enemy;
    }
  }

  // Attack cooldown
  if (enemy.attackCooldown > 0) {
    enemy.attackCooldown -= deltaTime;
  }

  // Detect and move toward player
  const distToPlayer = distance(enemy, player);
  const config = ENEMY_CONFIGS[enemy.type];

  if (distToPlayer < config.detectionRange) {
    // Chase player
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.velocityX = Math.cos(angle) * enemy.speed;
    enemy.velocityY = Math.sin(angle) * enemy.speed;
  } else {
    // Patrol or idle
    if (Math.abs(enemy.velocityX) < 0.1 && Math.abs(enemy.velocityY) < 0.1) {
      // Randomly start moving
      if (Math.random() < 0.02) {
        const angle = Math.random() * Math.PI * 2;
        enemy.velocityX = Math.cos(angle) * (enemy.speed * 0.5);
        enemy.velocityY = Math.sin(angle) * (enemy.speed * 0.5);
      }
    }
  }

  // Update position
  enemy.x += enemy.velocityX * (deltaTime / 1000);
  enemy.y += enemy.velocityY * (deltaTime / 1000);

  // Boundary checking
  if (enemy.x < 0 || enemy.x > GAME_WIDTH) {
    enemy.velocityX *= -1;
    enemy.x = Math.max(0, Math.min(GAME_WIDTH - enemy.width, enemy.x));
  }
  if (enemy.y < 0 || enemy.y > GAME_HEIGHT) {
    enemy.velocityY *= -1;
    enemy.y = Math.max(0, Math.min(GAME_HEIGHT - enemy.height, enemy.y));
  }

  // Check attack on player
  if (distToPlayer < Math.max(enemy.width, enemy.height) + Math.max(player.width, player.height) && enemy.attackCooldown <= 0) {
    enemy.attackCooldown = enemy.attackCooldownMax;
    // Return attack info
    enemy.lastAttackTime = Date.now();
  }

  return enemy;
};

const distance = (obj1, obj2) => {
  const dx = (obj2.x + obj2.width / 2) - (obj1.x + obj1.width / 2);
  const dy = (obj2.y + obj2.height / 2) - (obj1.y + obj1.height / 2);
  return Math.sqrt(dx * dx + dy * dy);
};

const isInHowlRange = (enemy, howlEffect) => {
  const dist = Math.sqrt(
    Math.pow((enemy.x + enemy.width / 2) - howlEffect.x, 2) +
    Math.pow((enemy.y + enemy.height / 2) - howlEffect.y, 2)
  );
  return dist < howlEffect.maxRadius;
};

export const spawnEnemy = (gameState) => {
  const { nightPhase } = gameState;
  let possibleTypes = [ENEMY_TYPES.SHADOW_BAT];
  let spawnChance = 0.1;

  if (nightPhase >= NIGHT_PHASES.MIDNIGHT) {
    possibleTypes.push(ENEMY_TYPES.FOREST_STALKER);
    spawnChance = 0.15;
  }
  if (nightPhase >= NIGHT_PHASES.DEEP_NIGHT) {
    possibleTypes.push(ENEMY_TYPES.HOWLER);
    spawnChance = 0.2;
  }
  if (nightPhase >= NIGHT_PHASES.BLOOD_MOON) {
    possibleTypes.push(ENEMY_TYPES.NIGHT_BEAST);
    spawnChance = 0.25;
  }

  if (Math.random() > spawnChance) return null;

  const type = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
  const side = Math.floor(Math.random() * 4);
  let x, y;

  switch (side) {
    case 0: // Top
      x = Math.random() * GAME_WIDTH;
      y = -50;
      break;
    case 1: // Right
      x = GAME_WIDTH + 50;
      y = Math.random() * GAME_HEIGHT;
      break;
    case 2: // Bottom
      x = Math.random() * GAME_WIDTH;
      y = GAME_HEIGHT + 50;
      break;
    case 3: // Left
      x = -50;
      y = Math.random() * GAME_HEIGHT;
      break;
  }

  return createEnemy(type, x, y);
};

export const checkEnemyPlayerCollision = (enemy, player) => {
  return (
    enemy.x < player.x + player.width &&
    enemy.x + enemy.width > player.x &&
    enemy.y < player.y + player.height &&
    enemy.y + enemy.height > player.y
  );
};
