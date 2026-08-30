export const createParticle = (x, y, velocityX, velocityY, lifetime, type = 'default') => {
  return {
    id: Math.random(),
    x,
    y,
    velocityX,
    velocityY,
    lifetime,
    maxLifetime: lifetime,
    type,
    size: 4,
    opacity: 1,
  };
};

export const updateParticles = (particles, deltaTime) => {
  return particles
    .map(particle => {
      particle.x += particle.velocityX * (deltaTime / 1000);
      particle.y += particle.velocityY * (deltaTime / 1000);
      particle.lifetime -= deltaTime;
      particle.opacity = Math.max(0, particle.lifetime / particle.maxLifetime);
      particle.velocityY += 100 * (deltaTime / 1000); // Gravity

      return particle;
    })
    .filter(particle => particle.lifetime > 0);
};

export const createHowlEffect = (x, y, maxRadius = 300, duration = 500) => {
  return {
    x,
    y,
    radius: 0,
    maxRadius,
    duration,
    elapsedTime: 0,
  };
};

export const updateHowlEffect = (howlEffect, deltaTime) => {
  if (!howlEffect) return null;

  howlEffect.elapsedTime += deltaTime;
  howlEffect.radius = (howlEffect.elapsedTime / howlEffect.duration) * howlEffect.maxRadius;

  if (howlEffect.elapsedTime >= howlEffect.duration) {
    return null;
  }

  return howlEffect;
};

export const createScorePopup = (x, y, text, type = 'default') => {
  return {
    id: Math.random(),
    x,
    y,
    text,
    type,
    duration: 2000,
    elapsedTime: 0,
    opacity: 1,
    floatDistance: 0,
  };
};

export const updateScorePopups = (popups, deltaTime) => {
  return popups
    .map(popup => {
      popup.elapsedTime += deltaTime;
      popup.floatDistance = (popup.elapsedTime / popup.duration) * 50;
      popup.opacity = Math.max(0, 1 - (popup.elapsedTime / popup.duration));
      return popup;
    })
    .filter(popup => popup.elapsedTime < popup.duration);
};

export const createFirefly = (x, y) => {
  return {
    id: Math.random(),
    x,
    y,
    targetX: x + (Math.random() - 0.5) * 100,
    targetY: y + (Math.random() - 0.5) * 100,
    speed: 30 + Math.random() * 50,
    size: 3 + Math.random() * 3,
    glow: 1 + Math.random() * 0.5,
  };
};

export const updateFireflies = (fireflies, deltaTime) => {
  return fireflies.map(firefly => {
    // Move toward target
    const dx = firefly.targetX - firefly.x;
    const dy = firefly.targetY - firefly.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) {
      // Reached target, pick new one
      firefly.targetX = firefly.x + (Math.random() - 0.5) * 200;
      firefly.targetY = firefly.y + (Math.random() - 0.5) * 200;
    } else {
      const angle = Math.atan2(dy, dx);
      firefly.x += Math.cos(angle) * firefly.speed * (deltaTime / 1000);
      firefly.y += Math.sin(angle) * firefly.speed * (deltaTime / 1000);
    }

    // Animate glow
    firefly.glow = 1 + Math.sin(Date.now() * 0.005) * 0.3;

    return firefly;
  });
};
