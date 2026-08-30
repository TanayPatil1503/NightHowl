import { NIGHT_PHASES, getNightPhaseColor, GAME_WIDTH, GAME_HEIGHT } from '../game/gameState';

// Render functions for drawing game elements to canvas

export const renderGame = (ctx, gameState, map, howlEffect, particles, fireflies, scorePopups) => {
  const phaseColor = getNightPhaseColor(gameState.nightPhase);
  
  // Clear background with phase-specific color
  ctx.fillStyle = phaseColor;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Render fog/atmosphere
  renderAtmosphere(ctx, gameState);

  // Render fireflies (behind everything)
  renderFireflies(ctx, fireflies);

  // Render map elements
  renderMap(ctx, map, gameState);

  // Render collectibles
  renderCollectibles(ctx, map.collectibles);

  // Render player
  renderPlayer(ctx, gameState.player);

  // Render enemies
  renderEnemies(ctx, gameState.enemies);

  // Render howl effect
  if (howlEffect) {
    renderHowlEffect(ctx, howlEffect);
  }

  // Render particles
  renderParticles(ctx, particles);

  // Render score popups
  renderScorePopups(ctx, scorePopups);

  // Render moon shrine
  renderMoonShrine(ctx, map.moonShrine);

  // Render foreground elements
  renderForeground(ctx, gameState);
};

const renderAtmosphere = (ctx, gameState) => {
  const fogOpacity = 0.1 + (gameState.nightPhase / 4) * 0.2;
  const fogColor = `rgba(50, 30, 80, ${fogOpacity})`;
  
  ctx.fillStyle = fogColor;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Add vignette effect
  const gradient = ctx.createRadialGradient(GAME_WIDTH / 2, GAME_HEIGHT / 2, 200, GAME_WIDTH / 2, GAME_HEIGHT / 2, 600);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};

export const renderPlayer = (ctx, player) => {
  // Player body (wolf silhouette)
  ctx.fillStyle = '#e0e0e0';
  
  // Body
  ctx.beginPath();
  ctx.ellipse(player.x + player.width / 2, player.y + player.height / 2 + 5, 15, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2, player.y + 8, 10, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = '#d0d0d0';
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2 - 6, player.y - 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2 + 6, player.y - 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Eyes - glow effect
  ctx.fillStyle = '#00ff88';
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2 - 4, player.y + 5, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2 + 4, player.y + 5, 2, 0, Math.PI * 2);
  ctx.fill();

  // Glow around player
  const glowGradient = ctx.createRadialGradient(player.x + player.width / 2, player.y + player.height / 2, 0, player.x + player.width / 2, player.y + player.height / 2, 30);
  glowGradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)');
  glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(player.x - 20, player.y - 20, player.width + 40, player.height + 40);

  // Dash effect
  if (player.isDashing) {
    ctx.strokeStyle = 'rgba(0, 255, 200, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 35, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const renderEnemies = (ctx, enemies) => {
  enemies.forEach(enemy => {
    // Enemy body - red/dark red
    ctx.fillStyle = enemy.stunned ? '#ffff00' : '#cc0000';
    
    ctx.beginPath();
    ctx.ellipse(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, enemy.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Health bar
    ctx.fillStyle = '#00ff00';
    const healthBarWidth = (enemy.health / enemy.maxHealth) * enemy.width;
    ctx.fillRect(enemy.x, enemy.y - 8, healthBarWidth, 3);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(enemy.x, enemy.y - 8, enemy.width, 3);

    // Stun indicator
    if (enemy.stunned) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
      ctx.beginPath();
      ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
};

const renderCollectibles = (ctx, collectibles) => {
  collectibles.forEach(collectible => {
    if (collectible.collected) return;

    if (collectible.type === 'bone') {
      // Render bone - off-white color
      ctx.fillStyle = '#f5e6d3';
      ctx.beginPath();
      ctx.ellipse(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (collectible.type === 'moon_crystal') {
      // Render crystal - cyan glow
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.moveTo(collectible.x + collectible.width / 2, collectible.y);
      ctx.lineTo(collectible.x + collectible.width, collectible.y + collectible.height / 2);
      ctx.lineTo(collectible.x + collectible.width / 2, collectible.y + collectible.height);
      ctx.lineTo(collectible.x, collectible.y + collectible.height / 2);
      ctx.closePath();
      ctx.fill();

      // Glow effect
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
};

const renderHowlEffect = (ctx, howlEffect) => {
  ctx.strokeStyle = `rgba(0, 200, 255, ${1 - howlEffect.elapsedTime / howlEffect.duration})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(howlEffect.x, howlEffect.y, howlEffect.radius, 0, Math.PI * 2);
  ctx.stroke();

  // Add pulsing circles
  for (let i = 1; i <= 3; i++) {
    ctx.strokeStyle = `rgba(0, 200, 255, ${(1 - howlEffect.elapsedTime / howlEffect.duration) * (0.3 / i)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(howlEffect.x, howlEffect.y, howlEffect.radius * (1 - i * 0.2), 0, Math.PI * 2);
    ctx.stroke();
  }
};

const renderParticles = (ctx, particles) => {
  particles.forEach(particle => {
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.type === 'fire' ? '#ff6600' : '#ffff00';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
};

const renderScorePopups = (ctx, scorePopups) => {
  scorePopups.forEach(popup => {
    ctx.globalAlpha = popup.opacity;
    ctx.fillStyle = popup.type === 'crystal' ? '#00ffff' : '#ffff00';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(popup.text, popup.x, popup.y - popup.floatDistance);
    ctx.globalAlpha = 1;
  });
};

const renderMap = (ctx, map, gameState) => {
  // Render obstacles (trees)
  ctx.fillStyle = '#1a4d2e';
  map.obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    
    // Tree outline
    ctx.strokeStyle = '#0f2818';
    ctx.lineWidth = 2;
    ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
};

const renderMoonShrine = (ctx, shrine) => {
  // Render a glowing moon shrine
  ctx.fillStyle = 'rgba(200, 150, 255, 0.8)';
  ctx.fillRect(shrine.x, shrine.y, shrine.width, shrine.height);

  // Glow
  const glowGradient = ctx.createRadialGradient(shrine.x + shrine.width / 2, shrine.y + shrine.height / 2, 0, shrine.x + shrine.width / 2, shrine.y + shrine.height / 2, 80);
  glowGradient.addColorStop(0, 'rgba(200, 100, 255, 0.5)');
  glowGradient.addColorStop(1, 'rgba(200, 100, 255, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(shrine.x - 40, shrine.y - 40, shrine.width + 80, shrine.height + 80);

  // Portal effect - rotating circle
  const angle = (Date.now() / 1000) * Math.PI;
  ctx.strokeStyle = `rgba(150, 100, 255, 0.6)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(shrine.x + shrine.width / 2, shrine.y + shrine.height / 2, 50, angle, angle + Math.PI * 0.5);
  ctx.stroke();
};

const renderFireflies = (ctx, fireflies) => {
  fireflies.forEach(firefly => {
    // Draw firefly glow
    const gradient = ctx.createRadialGradient(firefly.x, firefly.y, 0, firefly.x, firefly.y, firefly.size * firefly.glow);
    gradient.addColorStop(0, 'rgba(255, 255, 100, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(firefly.x, firefly.y, firefly.size * firefly.glow, 0, Math.PI * 2);
    ctx.fill();

    // Draw firefly body
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(firefly.x, firefly.y, firefly.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
};

const renderForeground = (ctx, gameState) => {
  // Could add overlay effects here
};
