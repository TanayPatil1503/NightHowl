import React from 'react';
import GameCanvas from './GameCanvas';

export const ResponsiveGameCanvas = ({ onGameOver, onVictory, upgradeLevels }) => {
  return (
    <div className="game-shell">
      <GameCanvas onGameOver={onGameOver} onVictory={onVictory} upgradeLevels={upgradeLevels} />
    </div>
  );
};

export default ResponsiveGameCanvas;
