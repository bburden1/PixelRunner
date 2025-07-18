# Pixel Runner - Endless Runner Game

A fun and engaging endless runner game built with React and TypeScript! Jump over obstacles, collect points, and see how far you can run.

## 🎮 How to Play

- **SPACE** or **Arrow Up**: Jump
- **Click/Tap**: Jump (mobile-friendly)
- **ENTER**: Restart game when game over

## 🚀 Features

- **Smooth Gameplay**: 60 FPS game loop with requestAnimationFrame
- **Progressive Difficulty**: Game speed increases as you score more points
- **Multiple Obstacles**: Jump over cacti and duck under birds
- **Physics**: Realistic jumping mechanics with gravity
- **Collision Detection**: Precise hit detection for game over
- **Responsive Design**: Works on desktop and mobile
- **Beautiful UI**: Modern gradient backgrounds and smooth animations

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Styled Components** for styling
- **Custom Hooks** for game logic
- **RequestAnimationFrame** for smooth animations

## 📦 Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd pixel-runner
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to play!

## 🎯 Game Mechanics

### Player Character
- A cute pixel-art runner with jumping animation
- Physics-based movement with gravity
- Can only jump when on the ground

### Obstacles
- **Cactus**: Ground obstacles that must be jumped over
- **Bird**: Flying obstacles that appear at varying heights
- Obstacles spawn at increasing frequency as speed increases

### Scoring
- Points increase continuously while playing
- Game speed increases every 1000 points
- Higher speeds make obstacles spawn more frequently

### Game Over
- Collision with any obstacle ends the game
- Final score is displayed
- Easy restart with ENTER key or button click

## 🎨 Visual Design

- **Sky Gradient**: Beautiful blue to green sky background
- **Ground**: Textured ground with subtle patterns
- **Characters**: Pixel-art style with shadows and depth
- **UI**: Clean, readable score and speed display
- **Game Over Screen**: Elegant overlay with restart option

## 🔧 Development

The game is built with a modular architecture:

- `Game.tsx`: Main game component with state management
- `Player.tsx`: Player character component
- `Obstacle.tsx`: Obstacle rendering component
- `Ground.tsx`: Ground surface component
- `useGameLoop.ts`: Custom hook for game loop
- `useCollisionDetection.ts`: Custom hook for collision detection

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Mobile Support

The game is fully responsive and works great on mobile devices:
- Touch controls for jumping
- Optimized for mobile screens
- Smooth performance on mobile browsers

## 🎉 Have Fun!

Enjoy playing Pixel Runner! Try to beat your high score and challenge your friends. The game gets progressively more challenging as you advance, making each run unique and exciting.

---

Built with ❤️ using React and TypeScript
