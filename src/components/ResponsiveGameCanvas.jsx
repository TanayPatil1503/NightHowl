import React from 'react';
import GameCanvas from './GameCanvas';

export const ResponsiveGameCanvas = ({ onGameOver, onVictory, onMainMenu, upgradeLevels }) => {
  return (
    <div className="game-shell">
      <GameCanvas
        onGameOver={onGameOver}
        onVictory={onVictory}
        onMainMenu={onMainMenu}
        upgradeLevels={upgradeLevels}
      />
    </div>
  );
};

export default ResponsiveGameCanvas;
