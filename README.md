# Night Howl 🌕🐺

A mysterious, addictive browser-based game built with **React + JavaScript** where you control a wolf named **Howl** exploring a dark forest at night.

## 🎮 Features

- **Top-Down 2D Gameplay**: Control your wolf with WASD keys
- **Howl Mechanic**: Press SPACE to unleash a powerful howl that reveals hidden items and stuns enemies
- **Dynamic Night System**: Five different night phases that progressively get harder
- **Collectible Items**: Bones for points, Moon Crystals for upgrades
- **Enemy Types**: Multiple enemy variants with different behaviors
- **Upgrade System**: Spend Moon Crystals to enhance your abilities
- **Atmospheric Design**: Dark fantasy aesthetic with neon glow effects
- **Save System**: Your progress and upgrades are saved to browser localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🕹️ How to Play

### Controls
- **WASD** or **Arrow Keys** - Move your wolf
- **SPACE** - Howl (reveals items, stuns enemies)
- **SHIFT** - Dash to escape danger
- **E** - Interact (coming soon)

### Objective
Survive the night by collecting items and avoiding enemies. The longer you survive, the higher your score. Reach the Moon Shrine for victory!

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically `http://localhost:5174`)

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
├── game/               # Game logic systems
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── App.jsx
```

## 🎯 Game Mechanics

- **Howl**: Press SPACE to stun enemies and reveal hidden items
- **Dash**: Press SHIFT to escape danger (costs stamina)
- **Collectibles**: Gather bones (50pts) and moon crystals (100pts)
- **Night Phases**: Game gets harder as time passes
- **Upgrades**: Spend crystals to improve abilities

## 💾 Save System

Progress is automatically saved to browser localStorage:
- High scores
- Upgrade levels
- Total crystals collected
- Statistics

## 🛠️ Technologies

- React 19
- Vite
- Tailwind CSS
- Canvas API
- localStorage

## 📱 Responsive Design

The game works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

## 🎨 Visual Design

- Dark fantasy aesthetic
- Neon cyan and purple accents
- Smooth animations
- Atmospheric effects
- Glassmorphism UI

## 📝 License

Open source - MIT License
