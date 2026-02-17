# 🎮 Fungames Time

A multi-game platform featuring three fun and engaging games! Built with pure HTML, CSS, and JavaScript - no external dependencies required!

## 🎮 Games Included

### 🐍 Snake Game
A fully functional, beautiful Snake Game with multiple themes and customization options.

**Features:**
- **Classic Snake gameplay** with smooth, responsive controls
- **Arrow keys** or **WASD** for movement
- **Score tracking** with high score persistence (localStorage)
- **Progressive difficulty** - game speeds up as you play
- **Pause functionality** - Press Space or Escape to pause
- **6 Unique Themes**: Nokia Classic, Neon Cyberpunk, Nature Forest, Ocean Blue, Desert Sand, Space Galaxy
- **4 Snake Skins**: Classic, Gradient, Striped, Rainbow

### ⭕ Tic Tac Toe
A classic Tic Tac Toe game with both local multiplayer and AI opponent options.

**Features:**
- **Player vs Player** - Two players on the same device
- **Player vs Bot** - Challenge the AI with three difficulty levels:
  - **Easy** - Random moves
  - **Medium** - Mix of strategic and random moves
  - **Hard** - Unbeatable minimax algorithm
- **Win detection** and animated winning cells
- **Score tracking** across multiple games
- **Clean, intuitive interface**

### 🧩 Sliding Puzzle
A 3x3 sliding photo puzzle game with colorful gradient images.

**Features:**
- **6 different photos** to choose from
- **Smart shuffle algorithm** ensures puzzle is always solvable
- **Move counter** tracks your efficiency
- **Timer** to challenge yourself
- **Preview button** to see the complete image
- **Win detection** with congratulations modal

## 🎨 Visual Design
- **Beautiful, modern UI** with gradient backgrounds
- **Animated title screens** with bouncing letters
- **Smooth transitions** between screens
- **Particle effects** (Snake Game)
- **Hover animations** on all interactive elements
- **Responsive design** - works on desktop, tablet, and mobile

## 🚀 Getting Started

### Quick Start
1. Clone this repository
2. Open `index.html` in a web browser
3. Choose your game from the main menu
4. Have fun!

### No Installation Required
This is a pure client-side application - no server, no build process, no dependencies. Just open and play!

## 🎯 How to Play

### Snake Game
**Controls:**
- **Arrow Keys** or **WASD** - Move the snake
- **Space** or **Escape** - Pause/Resume game

**Rules:**
- Guide the snake to eat the food (circular dots)
- Each food increases your score by 10 points
- The snake grows longer with each food eaten
- Game speeds up as you progress
- Avoid hitting walls or your own body

### Tic Tac Toe
**Rules:**
- Click on empty cells to place your mark (X or O)
- Get three in a row (horizontal, vertical, or diagonal) to win
- First player is always X
- Choose between playing with a friend or against the AI

### Sliding Puzzle
**Rules:**
- Click on tiles adjacent to the empty space to slide them
- Arrange all tiles in order to complete the puzzle
- The puzzle is solved when all numbered tiles are in sequence
- Use the preview button to see the complete image

## 📁 Project Structure

```
Fungames-Time/
├── index.html         # Main menu/landing page
├── snake.html         # Snake game page
├── tictactoe.html     # Tic Tac Toe game page
├── puzzle.html        # Sliding puzzle game page
├── styles.css         # Shared/base styling
├── main.css           # Main menu specific styles
├── snake.css          # Snake game specific styles
├── tictactoe.css      # Tic Tac Toe specific styles
├── puzzle.css         # Puzzle game specific styles
├── game.js            # Snake game logic
├── tictactoe.js       # Tic Tac Toe game logic
├── puzzle.js          # Puzzle game logic
└── README.md          # This file
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5** for structure and Canvas for Snake game rendering
- **CSS3** for animations and styling
- **Vanilla JavaScript** for game logic
- **localStorage** for data persistence (high scores, preferences)

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with HTML5 Canvas support

### Performance
- Optimized for smooth 60fps gameplay
- Efficient canvas rendering (Snake)
- Minimal memory footprint
- Fast load times (no external dependencies)

## 📱 Responsive Design
All games automatically adapt to different screen sizes:
- **Desktop**: Full-featured experience
- **Tablet**: Touch-friendly interface
- **Mobile**: Optimized layout and controls

## 💾 Features Implementation

### LocalStorage
- High scores persist between sessions (Snake, Tic Tac Toe)
- Theme preferences saved (Snake)
- Snake skin selection saved

### AI Implementation (Tic Tac Toe)
- **Easy Mode**: Random move selection
- **Medium Mode**: 50/50 mix of optimal and random moves
- **Hard Mode**: Minimax algorithm for perfect play

### Puzzle Algorithm
- Smart shuffle ensures puzzle is always solvable
- Move validation only allows adjacent tiles to slide
- Win detection checks if all tiles are in correct order

## 🎨 Customization

### Adding New Themes (Snake)
Edit the `THEMES` object in `game.js`:
```javascript
newtheme: {
    name: 'Theme Name',
    background: '#color',
    snake: '#color',
    food: '#color',
    // ... more options
}
```

### Adding New Snake Skins
Edit the `SNAKE_SKINS` object in `game.js` to add custom rendering logic.

### Adding New Puzzle Photos
Edit the `photos` object in `puzzle.js`:
```javascript
7: 'linear-gradient(135deg, #color1, #color2)'
```

## 🏆 Score Systems

### Snake Game
- Automatically saves your best score
- Displays high score on menu and during gameplay
- Shows "NEW HIGH SCORE!" message when achieved
- Persistent across browser sessions

### Tic Tac Toe
- Tracks wins for X, O, and draws
- Score persists across games
- Reset available by clearing browser data

## 🎭 Animations
- Bouncing letters in title
- Rotating trophy icon (Snake)
- Pulsing start buttons
- Smooth screen transitions
- Particle explosions (Snake)
- Hover effects on all buttons and cards
- Pop-in animations for game pieces

## 📄 License
This project is open source and available for educational purposes.

## 🤝 Contributing
Feel free to fork this project and add your own features, games, themes, or improvements!

## 🔗 Links
- GitHub Profile: [mouhthekiller697](https://github.com/mouhthekiller697)

## 🎉 Enjoy!
Have fun playing all three games! Try to beat your high scores and challenge your friends!
