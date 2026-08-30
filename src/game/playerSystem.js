import { GAME_WIDTH, GAME_HEIGHT } from './gameState';

export const updatePlayer = (player, keys, deltaTime) => {
  // Movement
  const moveX = (keys['a'] || keys['A'] || keys['ArrowLeft'] ? -1 : 0) +
                (keys['d'] || keys['D'] || keys['ArrowRight'] ? 1 : 0);
  const moveY = (keys['w'] || keys['W'] || keys['ArrowUp'] ? -1 : 0) +
                (keys['s'] || keys['S'] || keys['ArrowDown'] ? 1 : 0);

  // Normalize diagonal movement
  let speed = player.speed;
  if (moveX !== 0 && moveY !== 0) {
    speed *= 0.707; // Normalize diagonal speed
  }

  if (player.isDashing) {
    speed = player.dashSpeed;
  }

  player.velocityX = moveX * speed;
  player.velocityY = moveY * speed;

  // Update position
  player.x += player.velocityX * (deltaTime / 1000);
  player.y += player.velocityY * (deltaTime / 1000);

  // Boundary checking
  player.x = Math.max(0, Math.min(GAME_WIDTH - player.width, player.x));
  player.y = Math.max(0, Math.min(GAME_HEIGHT - player.height, player.y));

  // Stamina regeneration
  if (!player.isDashing && (moveX === 0 && moveY === 0)) {
    player.stamina = Math.min(player.maxStamina, player.stamina + player.staminaRegen * (deltaTime / 1000));
  }

  // Howl energy regeneration
  player.howlEnergy = Math.min(player.maxHowlEnergy, player.howlEnergy + player.howlEnergyRegen * (deltaTime / 1000));

  // Cooldowns
  if (player.howlCooldown > 0) {
    player.howlCooldown -= deltaTime;
  }

  if (player.dashCooldown > 0) {
    player.dashCooldown -= deltaTime;
  }

  if (player.isDashing) {
    player.dashDuration -= deltaTime;
    if (player.dashDuration <= 0) {
      player.isDashing = false;
    }
  }

  return player;
};

export const handlePlayerDash = (player) => {
  if (player.isDashing || player.dashCooldown > 0) return false;
  if (player.stamina < player.dashStaminaCost) return false;

  player.isDashing = true;
  player.dashCooldown = 2000;
  player.dashDuration = 300;
  player.stamina -= player.dashStaminaCost;

  return true;
};

export const handlePlayerHowl = (player, gameState) => {
  if (player.howlCooldown > 0) return null;
  if (player.howlEnergy < 30) return null;

  player.howlCooldown = player.howlCooldownMax;
  player.howlEnergy -= 30;

  return {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    radius: 0,
    maxRadius: 300,
    duration: 500,
    elapsedTime: 0,
  };
};

export const takeDamage = (player, amount) => {
  player.health -= amount;
  return player.health <= 0;
};

export const getPlayerDirection = (player) => {
  if (player.velocityX === 0 && player.velocityY === 0) {
    return 'idle';
  }

  const angle = Math.atan2(player.velocityY, player.velocityX) * (180 / Math.PI);
  
  if (angle > -45 && angle <= 45) return 'right';
  if (angle > 45 && angle <= 135) return 'down';
  if (angle > 135 || angle <= -135) return 'left';
  if (angle > -135 && angle <= -45) return 'up';
  
  return 'idle';
};
