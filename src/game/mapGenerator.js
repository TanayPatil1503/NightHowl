import { GAME_WIDTH, GAME_HEIGHT } from './gameState';

export const generateMap = (seed = Date.now()) => {
  // Simple pseudo-random generator using seed
  let random = seededRandom(seed);

  const map = {
    obstacles: generateObstacles(random),
    collectibles: generateCollectibles(random),
    hiddenAreas: generateHiddenAreas(random),
    moonShrine: generateMoonShrine(),
  };

  return map;
};

const seededRandom = (seed) => {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};

const generateObstacles = (random) => {
  const obstacles = [];
  const obstacleCount = 8 + Math.floor(random() * 5);

  for (let i = 0; i < obstacleCount; i++) {
    obstacles.push({
      x: random() * (GAME_WIDTH - 60),
      y: random() * (GAME_HEIGHT - 60),
      width: 40 + random() * 40,
      height: 40 + random() * 40,
      type: 'tree',
    });
  }

  return obstacles;
};

const generateCollectibles = (random) => {
  const collectibles = [];

  // Bones
  const boneCount = 5 + Math.floor(random() * 5);
  for (let i = 0; i < boneCount; i++) {
    collectibles.push({
      id: Math.random(),
      type: 'bone',
      x: random() * GAME_WIDTH,
      y: random() * GAME_HEIGHT,
      width: 15,
      height: 15,
      value: 50,
      collected: false,
    });
  }

  // Moon Crystals (rare)
  const crystalCount = 1 + Math.floor(random() * 3);
  for (let i = 0; i < crystalCount; i++) {
    collectibles.push({
      id: Math.random(),
      type: 'moon_crystal',
      x: random() * GAME_WIDTH,
      y: random() * GAME_HEIGHT,
      width: 20,
      height: 20,
      value: 100,
      collected: false,
    });
  }

  return collectibles;
};

const generateHiddenAreas = (random) => {
  const areas = [];
  const areaCount = 2 + Math.floor(random() * 3);

  for (let i = 0; i < areaCount; i++) {
    areas.push({
      id: Math.random(),
      x: random() * GAME_WIDTH,
      y: random() * GAME_HEIGHT,
      width: 100 + random() * 100,
      height: 100 + random() * 100,
      revealed: false,
      rewards: [
        { type: 'bone', value: 100 },
        { type: 'moon_crystal', value: 150 },
      ],
    });
  }

  return areas;
};

const generateMoonShrine = () => {
  return {
    x: GAME_WIDTH - 100,
    y: GAME_HEIGHT - 100,
    width: 80,
    height: 80,
  };
};
