// Save system using localStorage

const STORAGE_KEYS = {
  HIGH_SCORE: 'nighthowl_high_score',
  TOTAL_CRYSTALS: 'nighthowl_total_crystals',
  UNLOCKED_UPGRADES: 'nighthowl_unlocked_upgrades',
  UPGRADE_LEVELS: 'nighthowl_upgrade_levels',
  BEST_SURVIVAL_TIME: 'nighthowl_best_survival_time',
  SETTINGS: 'nighthowl_settings',
  STATISTICS: 'nighthowl_statistics',
};

export const DEFAULT_UPGRADES = {
  health: { level: 1, maxLevel: 5, baseCost: 50, name: '❤️ More Health', description: 'Increase max health by 20' },
  stamina: { level: 1, maxLevel: 5, baseCost: 50, name: '⚡ More Stamina', description: 'Increase max stamina by 20' },
  howl_power: { level: 1, maxLevel: 5, baseCost: 75, name: '🐺 Stronger Howl', description: 'Increase howl effect radius' },
  dash_speed: { level: 1, maxLevel: 5, baseCost: 60, name: '💨 Faster Dash', description: 'Increase dash speed by 10%' },
  pickup_radius: { level: 1, maxLevel: 5, baseCost: 40, name: '🧲 Bigger Pickup Radius', description: 'Increase collectible pickup range' },
  night_vision: { level: 1, maxLevel: 3, baseCost: 100, name: '🌙 Longer Night Vision', description: 'Extend visibility range' },
};

export const getUpgradeCost = (upgradeName) => {
  const upgrade = DEFAULT_UPGRADES[upgradeName];
  if (!upgrade) return 0;
  return upgrade.baseCost * upgrade.level;
};

export const loadSaveData = () => {
  try {
    return {
      highScore: parseInt(localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0'),
      totalCrystals: parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CRYSTALS) || '0'),
      upgradeLevels: JSON.parse(localStorage.getItem(STORAGE_KEYS.UPGRADE_LEVELS) || JSON.stringify(DEFAULT_UPGRADES)),
      bestSurvivalTime: parseInt(localStorage.getItem(STORAGE_KEYS.BEST_SURVIVAL_TIME) || '0'),
      settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify({
        audioEnabled: true,
        masterVolume: 0.7,
      })),
      statistics: JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || JSON.stringify({
        totalGamesPlayed: 0,
        totalEnemiesDefeated: 0,
        totalBonesCollected: 0,
        highestCombo: 0,
      })),
    };
  } catch (error) {
    console.error('Error loading save data:', error);
    return {
      highScore: 0,
      totalCrystals: 0,
      upgradeLevels: DEFAULT_UPGRADES,
      bestSurvivalTime: 0,
      settings: { audioEnabled: true, masterVolume: 0.7 },
      statistics: { totalGamesPlayed: 0, totalEnemiesDefeated: 0, totalBonesCollected: 0, highestCombo: 0 },
    };
  }
};

export const saveHighScore = (score) => {
  const current = parseInt(localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0');
  if (score > current) {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
    return true;
  }
  return false;
};

export const saveTotalCrystals = (crystals) => {
  const current = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CRYSTALS) || '0');
  localStorage.setItem(STORAGE_KEYS.TOTAL_CRYSTALS, (current + crystals).toString());
};

export const spendCrystals = (amount) => {
  const current = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CRYSTALS) || '0');
  if (current >= amount) {
    localStorage.setItem(STORAGE_KEYS.TOTAL_CRYSTALS, (current - amount).toString());
    return true;
  }
  return false;
};

export const upgradeItem = (upgradeName) => {
  const upgradeLevels = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPGRADE_LEVELS) || JSON.stringify(DEFAULT_UPGRADES));
  const upgrade = upgradeLevels[upgradeName];
  const cost = getUpgradeCost(upgradeName);

  if (upgrade && upgrade.level < upgrade.maxLevel && spendCrystals(cost)) {
    upgrade.level += 1;
    localStorage.setItem(STORAGE_KEYS.UPGRADE_LEVELS, JSON.stringify(upgradeLevels));
    return true;
  }
  return false;
};

export const saveBestSurvivalTime = (time) => {
  const current = parseInt(localStorage.getItem(STORAGE_KEYS.BEST_SURVIVAL_TIME) || '0');
  if (time > current) {
    localStorage.setItem(STORAGE_KEYS.BEST_SURVIVAL_TIME, time.toString());
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const updateStatistics = (stats) => {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || JSON.stringify({
    totalGamesPlayed: 0,
    totalEnemiesDefeated: 0,
    totalBonesCollected: 0,
    highestCombo: 0,
  }));

  Object.assign(current, stats);
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(current));
};
