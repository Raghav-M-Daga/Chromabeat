<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
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

<table>
<tr>
<td align="center" width="33%">

**🎨 Color Mode**
<br>
_Visual Recognition_
<br>
Follow the center color indicator and click the matching button

</td>
<td align="center" width="33%">

**🔊 Sound Mode**
<br>
_Auditory Memory_
<br>
Listen to tones and identify the button that produced the sound

</td>
<td align="center" width="33%">

**🧠 Inverse Mode**
<br>
_Logical Thinking_
<br>
Advanced XOR logic combining color and sound patterns

</td>
</tr>
</table>

---

## 🚢 Set Sail - Getting Started

<div style="background-color:#F0F8FF; border: 2px solid #4682B4; padding: 1em; border-radius: 10px; margin: 1em 0;">

### ⚓ Prerequisites

- **Node.js** 18+ (The ship's engine)
- **npm/yarn/pnpm** (Your navigation tools)

### 🗺️ Installation Journey

```bash
# 🏴‍☠️ Clone the treasure map
git clone <repository-url>
cd chromabeat

# 🧭 Install your crew (dependencies)
npm install
# or
yarn install

# ⛵ Set sail on the development seas
npm run dev
# or
yarn dev

# 🌊 Navigate to http://localhost:3000 and start your adventure!
```

</div>

---

## 🎯 How to Navigate the Game

<div style="border: 2px dashed #20B2AA; padding: 1.5em; border-radius: 15px; background: linear-gradient(45deg, #E0F6FF, #F0F8FF);">

### 🧭 **Step-by-Step Gameplay**

1. **🚀 Launch**: Click the "Start" button to begin your journey
2. **👀 Observe**: Watch the center indicator and listen carefully to audio cues
3. **⚡ React**: Click the correct colored button based on the current game mode
4. **📈 Progress**: Each correct answer increases difficulty and score
5. **💀 Survive**: You have 3 lives - use them wisely!

### ⚔️ **Game Modes Explained**

| Mode        | Icon | Challenge              | Strategy         |
| ----------- | ---- | ---------------------- | ---------------- |
| **Color**   | 🎨   | Match the center color | Trust your eyes  |
| **Sound**   | 🎵   | Identify the tone      | Trust your ears  |
| **Inverse** | 🔄   | XOR logic puzzle       | Trust your brain |

</div>

---

## 🛠️ Ship's Technical Specifications

<div align="center">

### 🏗️ **Built With Island Resources**

| Technology                                                                                      | Version | Purpose        |
| ----------------------------------------------------------------------------------------------- | ------- | -------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js)    | 15.4.6  | Ship Framework |
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)         | 19.1.0  | UI Components  |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) | 5.0     | Type Safety    |
| ![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css) | 4.0     | Styling Engine |

</div>

---

## 🏛️ Ship's Architecture

<div style="background-color:#F5F5F5; border-radius: 10px; padding: 1em;">

```
🏴‍☠️ chromabeat/
├── 📁 src/
│   ├── 🏠 app/                    # Main deck (Next.js App Router)
│   │   ├── 🎨 globals.css         # Ship's paint job
│   │   ├── 🏗️ layout.tsx          # Ship's blueprint
│   │   └── 🎮 page.tsx            # The game arena
│   ├── 🧩 components/
│   │   ├── 🎯 game/               # Game components crew
│   │   │   ├── 🎮 GameInterface.tsx
│   │   │   ├── 📊 ScoreIndicator.tsx
│   │   │   ├── ❌ MistakesIndicator.tsx
│   │   │   └── 🎵 (more game components)
│   │   └── 🔧 ui/                 # Reusable UI tools
│   ├── 🎣 hooks/
│   │   ├── 🔊 useAudio.ts         # Sound captain
│   │   ├── 🎮 useGameLogic.ts     # Game master
│   │   └── 🎵 useGameSounds.ts    # Audio effects crew
│   └── 📚 lib/
│       └── 🛠️ utils.ts            # Utility toolkit
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

- 🌐 **Full Multiplayer**: Battle other island survivors
- 🏆 **Leaderboards**: Island-wide high scores
- 🎭 **New Game Modes**: Pattern recognition challenges
- 🎨 **Custom Themes**: Personalize your ship
- 🏅 **Achievement System**: Unlock island treasures
- 📱 **Mobile Optimization**: Play anywhere on the island

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
