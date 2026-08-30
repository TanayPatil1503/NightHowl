import { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import ResponsiveGameCanvas from './components/ResponsiveGameCanvas';
import GameOverScreen from './components/GameOverScreen';
import { VictoryScreen } from './components/GameOverScreen';
import UpgradesScreen from './components/UpgradesScreen';
import SettingsScreen from './components/SettingsScreen';
import HowToPlayScreen from './components/HowToPlayScreen';
import { loadSaveData } from './game/saveSystem';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'game', 'gameover', 'victory', 'upgrades', 'settings', 'howtoplay'
  const [gameStats, setGameStats] = useState(null);
  const [upgradeLevels, setUpgradeLevels] = useState(null);

  // Load upgrade levels on mount
  useEffect(() => {
    const data = loadSaveData();
    setUpgradeLevels(data.upgradeLevels);
  }, []);

  const handlePlayClick = () => {
    setGameState('game');
  };

  const handleGameOver = (stats) => {
    setGameStats(stats);
    setGameState('gameover');
  };

  const handleVictory = (stats) => {
    setGameStats(stats);
    setGameState('victory');
  };

  const handleRetry = () => {
    setGameState('game');
    setGameStats(null);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setGameStats(null);
    // Reload upgrade levels in case they changed
    const data = loadSaveData();
    setUpgradeLevels(data.upgradeLevels);
  };

  const handleUpgradesFromMenu = () => {
    setGameState('upgrades');
  };

  const handleBackFromUpgrades = () => {
    // Reload upgrade levels
    const data = loadSaveData();
    setUpgradeLevels(data.upgradeLevels);
    setGameState('menu');
  };

  const handleHowToPlayClick = () => {
    setGameState('howtoplay');
  };

  const handleSettingsClick = () => {
    setGameState('settings');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Menu */}
      {gameState === 'menu' && (
        <MainMenu
          onPlayClick={handlePlayClick}
          onHowToPlayClick={handleHowToPlayClick}
          onUpgradesClick={handleUpgradesFromMenu}
          onSettingsClick={handleSettingsClick}
        />
      )}

      {/* Game */}
      {gameState === 'game' && upgradeLevels && (
        <ResponsiveGameCanvas
          onGameOver={handleGameOver}
          onVictory={handleVictory}
          onMainMenu={handleBackToMenu}
          upgradeLevels={upgradeLevels}
        />
      )}

      {/* Game Over */}
      {gameState === 'gameover' && gameStats && (
        <GameOverScreen stats={gameStats} onRetry={handleRetry} onUpgrades={handleUpgradesFromMenu} onMenu={handleBackToMenu} />
      )}

      {/* Victory */}
      {gameState === 'victory' && gameStats && (
        <VictoryScreen stats={gameStats} onRetry={handleRetry} onUpgrades={handleUpgradesFromMenu} onMenu={handleBackToMenu} />
      )}

      {/* Upgrades */}
      {gameState === 'upgrades' && (
        <UpgradesScreen onBack={handleBackFromUpgrades} />
      )}

      {/* Settings */}
      {gameState === 'settings' && (
        <SettingsScreen onBack={() => setGameState('menu')} />
      )}

      {/* How to Play */}
      {gameState === 'howtoplay' && (
        <HowToPlayScreen onBack={() => setGameState('menu')} />
      )}
    </div>
  );
}

export default App;
