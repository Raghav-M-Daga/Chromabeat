<div align="center">
  ## 🏴‍☠️ About the Project

<div style="background-color:#E0F7FA; border-left: 5px solid #0077B6; padding: 1.5em; border-radius: 10px; margin: 1em 0;">
<strong>⚡ The Challenge:</strong> Create a project without using text - only colors, sounds, and patterns!
<br><br>
<strong>🎯 Our Solution:</strong> Chromabeat is an audio-visual memory and perception game inspired by Simon Says, built with only colors and tones. You get a central hint and four colored tiles. Depending on the background/mode, you must interpret color and/or tone cues and click the correct tile.
</div>="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 45%;">
  </a>
</div>

<h1 align="center">
  🌊 ⚓ <span style="color:#1E90FF;">Chromabeat</span> ⚓ 🌊
</h1>

<div align="center">
  <h3 style="color:#4682B4;">🎵 A Color & Sound Memory Game 🎵</h3>
  <p><em>"This project was for the second challenge on the island: The Villagers Can't Speak!"</em></p>
  
  <img src="https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
</div>

---

## �‍☠️ About the Project

<div style="background-color:#E0F7FA; border-left: 5px solid #0077B6; padding: 1.5em; border-radius: 10px; margin: 1em 0;">
<strong>⚡ The Challenge:</strong> Create a project without using text - only colors, sounds, and patterns!
<br><br>
<strong>🎯 Our Solution:</strong> Chromabeat is an interactive memory and reaction game that combines visual and auditory challenges. It's like Simon Says but with multiple game modes that test different cognitive skills!
</div>

### 🎮 Game Features

- **🎯 Four-button board** with a central hint system
- **🎨 Three dynamic modes** with distinct visual backgrounds:
  - **Color Mode** (black background) - Center color is truth, tone is decoy
  - **Sound Mode** (gradient background) - Tone determines target, center color is decoy
  - **Striped Mode** (mixing background) - Advanced color mixing logic with XOR patterns
- **⚡ Round-based gameplay** - One strategic click per round
- **🎨 Clean Tailwind v4 styling** with subtle animations
- **🎵 Web Audio tones** with clearly distinct pitches
- **🗺️ Legend button** to preview tone-to-color mappings

---

## 🚢 Set Sail - Getting Started

<div style="background-color:#F0F8FF; border: 2px solid #4682B4; padding: 1em; border-radius: 10px; margin: 1em 0;">

### ⚓ Prerequisites

- **Node.js** 18+ (The ship's engine)
- **npm/yarn/pnpm** (Your navigation tools)

### 🗺️ Installation Journey

```bash
# 🏴‍☠️ Clone the treasure map
git clone https://github.com/Raghav-M-Daga/Chromabeat
cd chromabeat

# 🧭 Install your crew (dependencies)
npm install

# ⛵ Set sail on the development seas
npm run dev
# Next.js will start on port 3000; if busy, it will choose the next available port

# 🏗️ Build for production voyage
npm run build
npm start

# 🌊 Navigate to http://localhost:3000 and start your adventure!
```

</div>

---

## 🎯 How to Navigate the Game _(For Fellow Islanders)_

<div style="border: 2px dashed #20B2AA; padding: 1.5em; border-radius: 15px; background: linear-gradient(45deg, #E0F6FF, #F0F8FF);">

### 🧭 **Step-by-Step Survival Guide**

1. **🚀 Launch**: Click the "Start" button to begin your island adventure
2. **�️ Observe**: Watch the center color hint and listen to the tone cue
3. **🎯 One Shot**: You have **one click per round** to pick the correct tile
4. **📈 Score**: Correct answers increase your survival score
5. **💀 Survive**: Wrong answers add mistakes - **three strikes and you're marooned!**
6. **🗺️ Legend**: Use the bottom-left button to preview tone-to-color mappings

### ⚔️ **Island Mode Rules**

| Mode           | Background   | Truth Source       | Decoy            | Strategy                                |
| -------------- | ------------ | ------------------ | ---------------- | --------------------------------------- |
| **🎨 Color**   | Black        | Center color       | Random tone      | Trust your eyes - match the center      |
| **🎵 Sound**   | Gradient     | Tone played        | Random center    | Trust your ears - find the tone's color |
| **🌀 Striped** | Diagonal Mix | Color mixing logic | Complex patterns | Trust your brain - XOR the signals      |

### 🧩 **Striped Mode Deep Dive**

- Center shows one primary color (yellow/blue/green/red)
- A tone plays for another primary color
- Each outer tile displays a **visual mix** of center + that tile's original color
- Click the tile at the **tone color's position** - it shows the correct center+tone mix!

</div>

---

## 🛠️ Ship's Technical Specifications

<div align="center">

### 🏗️ **Built With Island Resources**

| Technology                                                                                      | Version                     | Purpose        |
| ----------------------------------------------------------------------------------------------- | --------------------------- | -------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)        | 15 (App Router + Turbopack) | Ship Framework |
| ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)             | 19                          | UI Components  |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) | 5                           | Type Safety    |
| ![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css) | 4 (`@tailwindcss/postcss`)  | Styling Engine |

</div>

---

## 🏛️ Ship's Architecture

<div style="background-color:#F5F5F5; border-radius: 10px; padding: 1em;">

```
🏴‍☠️ chromabeat/
├── 📁 src/
│   ├── 🏠 app/
│   │   ├── 🎮 page.tsx            # Main game page (UI composition and controls)
│   │   ├── 🏗️ layout.tsx          # Ship's blueprint
│   │   └── 🎨 globals.css         # Ship's paint job
│   ├── 🎣 hooks/
│   │   ├── � useGameLogic.ts     # Round generation, timers, scoring, mistakes
│   │   ├── 🔊 useAudio.ts         # Web Audio helpers (oscillator, gain)
│   │   └── 🎵 useGameSounds.ts    # Audio effects crew
│   ├── 🧩 components/
│   │   ├── 🎯 game/               # UI components (board, overlays, buttons, indicators)
│   │   │   ├── 🎮 GameInterface.tsx
│   │   │   ├── 📊 ScoreIndicator.tsx
│   │   │   ├── ❌ MistakesIndicator.tsx
│   │   │   └── 🎵 (more game components)
│   │   └── 🔧 ui/                 # Reusable UI tools
│   └── 📚 lib/
│       └── �️ utils.ts            # cn utility (class merging)
├── 🔧 postcss.config.js           # Tailwind v4 PostCSS plugin
├── 📦 package.json                # Cargo manifest
└── 📖 README.md                   # This treasure map!
```

</div>

---

## 🎪 Game Mechanics - The Rules of the Sea

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2em; border-radius: 15px; margin: 1em 0;">

### ⚔️ **Difficulty Scaling**

- **Time Pressure**: Each round gets faster → `Math.max(1.5, 5 - 0.2 * score)`
- **Progressive Challenge**: Higher scores = less thinking time
- **Survival Mode**: 3 mistakes and you're marooned!

### 🏆 **Scoring System**

- ✅ **Correct Answer**: +1 point
- ❌ **Wrong Answer**: +1 mistake (max 3)
- ⏰ **Timeout**: Also counts as a mistake
- 🎯 **Perfect Streak**: The goal is survival!

</div>

---

## 🚀 Available Commands

<div style="display: flex; justify-content: space-around; margin: 2em 0;">

<div style="text-align: center; padding: 1em; border: 2px solid #4CAF50; border-radius: 10px; margin: 0.5em;">
<strong>🛠️ Development</strong><br>
<code>npm run dev</code><br>
<small>Start the development ship</small>
</div>

<div style="text-align: center; padding: 1em; border: 2px solid #2196F3; border-radius: 10px; margin: 0.5em;">
<strong>🏗️ Build</strong><br>
<code>npm run build</code><br>
<small>Prepare for voyage</small>
</div>

<div style="text-align: center; padding: 1em; border: 2px solid #FF9800; border-radius: 10px; margin: 0.5em;">
<strong>🚀 Deploy</strong><br>
<code>npm run start</code><br>
<small>Launch production ship</small>
</div>

<div style="text-align: center; padding: 1em; border: 2px solid #9C27B0; border-radius: 10px; margin: 0.5em;">
<strong>🔍 Inspect</strong><br>
<code>npm run lint</code><br>
<small>Check ship's condition</small>
</div>

</div>

---

## 🔮 Future Expeditions

<div style="background-color:#FFF8DC; border: 2px solid #DAA520; padding: 1.5em; border-radius: 10px;">

- � **Accessibility enhancements**: Visual patterns to complement color perception
- ⚡ **Difficulty scaling**: Shorter timers and misdirection cues for advanced players
- 🌐 **Online multiplayer**: Validate inputs and sync rounds via simple server
- 🏆 **Leaderboards**: Island-wide high scores and statistics
- 🎭 **New Game Modes**: Additional pattern recognition challenges
- 📱 **Mobile Optimization**: Enhanced touch controls for island exploration

</div>

---

## 📜 Developer's Island Journal

<div style="background-color:#FDF5E6; border: 2px solid #D2691E; padding: 2em; border-radius: 15px; margin: 2em 0;">

### 🌅 **1-2: Brainstorming & Ideation**

_Exploring color-only game concepts with AI assistance. Sifted through puzzle mechanics and emotion-boarding ideas. Simon Says variant emerged as the most approachable and replayable concept._

### 🏗️ **3-4: v0 UI & Initial Build**

_Generated clean UI scaffold with four circular buttons and central hint. Established basic "sequence + playback + click to match" flow, Web Audio integration, and fundamental game state._

### � **5: Tailwind v4 Integration**

_Switched to Tailwind CSS v4 with new PostCSS plugin architecture. Configured utility-first styling with path aliases via tsconfig.json._

### ⚡ **6-7: Gameplay Refinement**

_Replaced long sequences with snappy single-click rounds. Added green/red success/failure overlays. Streamlined audio feedback to only play clicked color tones._

### 🎭 **8-9: Mode Differentiation**

_Implemented distinct backgrounds for instant mode recognition: solid black (Color), gradient (Sound), diagonal stripes (Striped). Each mode now has clear visual identity._

### 🎵 **10: Audio Clarity & Legend**

_Spaced pitches widely (A3/A4/A5/A6) for better distinction. Added legend button for tone-to-color mapping preview with demo pause functionality._

### 🌈 **11-12: Striped Mode Evolution**

_Multiple iterations on color mixing logic. Final implementation uses intuitive primary combinations with fixed palette (red+blue→magenta, blue+green→cyan, etc.). Removed ambiguous blends._

### 🔧 **13: Stabilization & Polish**

_Fixed Tailwind v4 PostCSS issues. Consolidated utilities and class merging. Split logic into focused hooks and components. Resolved Windows shell quirks and port conflicts._

### 🚀 **Next Voyage Plans**

_Accessibility improvements, difficulty scaling, and multiplayer implementation ready for future development cycles._

</div>

---

## 📄 License

**MIT** - Built for the Shipwrecked Challenge with ⚓ and 🎵

<div style="background-color:#E8F4F8; border-left: 4px solid #0077B6; padding: 1em; margin: 1em 0;">
<em>This project was bootstrapped with <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app">create-next-app</a> and enhanced for the island adventure!</em>
</div>

---

## 🤝 Fellow Islanders

<div align="center">
<h3>🏴‍☠️ Built by Shipwrecked Survivors</h3>

This treasure was forged during **Shipwrecked Challenge #2: The Villagers Can't Speak**
<br>
_Where communication happens through colors, sounds, and patterns!_

<br>

**Ready to test your survival instincts?** 🏴‍☠️
<br>
Set sail with Chromabeat and see how long you can survive! ⚓🎮

</div>

---

<div align="center" style="margin-top: 3em;">
<img src="https://via.placeholder.com/800x200/4682B4/FFFFFF?text=🌊+May+the+beats+guide+you+through+the+storm+🌊" style="border-radius: 10px;">
</div>
