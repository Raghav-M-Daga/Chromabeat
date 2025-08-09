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
  
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
</div>

---

## 🏴‍☠️ About the Project

<div style="background-color:#E0F7FA; border-left: 5px solid #0077B6; padding: 1.5em; border-radius: 10px; margin: 1em 0;">
<strong>⚡ The Challenge:</strong> Create a project without using text - only colors, sounds, and patterns!
<br><br>
<strong>🎯 Our Solution:</strong> An audio-visual memory and perception game inspired by Simon Says, built with only colors and tones. You get a central hint and four colored tiles. Depending on the background/mode, you must interpret color and/or tone cues and click the correct tile.
</div>

### 🎮 Game Features

<div style="background-color:#F0F8FF; border: 2px solid #4682B4; padding: 1.5em; border-radius: 10px; margin: 1em 0;">

- **🎯 Four-button board** with a central hint system
- **🎨 Three dynamic modes** with distinct rules:
  - **Color** (black background) - Visual truth mode
  - **Sound** (gradient background) - Audio guidance mode
  - **Striped** (inverse/mixing background) - Advanced pattern mixing
- **⚡ Round-based gameplay** - One strategic click per round
- **🎨 Clean Tailwind v4 styling** with subtle nautical animations
- **🎵 Web Audio tones** with clearly distinct pitches for each color
- **🗺️ Legend button** to preview tone-to-color mappings

</div>

### 🛠️ Technical Stack

<div style="background-color:#F5F5F5; border-radius: 10px; padding: 1.5em;">

- **⚓ Next.js 15** (App Router) + Turbopack for lightning-fast development
- **🌊 React 19** for modern component architecture
- **🎨 Tailwind CSS v4** (`@tailwindcss/postcss`) for utility-first styling

</div>

---

## 🚢 Getting Started

<div style="background-color:#E0F6FF; border: 2px dashed #20B2AA; padding: 1.5em; border-radius: 15px;">

### 🧭 **Installation **

1. **Install your dependencies:**

   ```bash
   npm install
   ```

2. **Launch the project:**

   ```bash
   npm run dev
   ```

   _Next.js will start on port 3000; if busy, it will choose the next available port._

3. **Build for the production:**
   ```bash
   npm run build
   npm start
   ```

</div>

---

## 🎯 How to play the game

<div style="border: 2px solid #4682B4; padding: 2em; border-radius: 15px; background: linear-gradient(45deg, #E0F6FF, #F0F8FF);">

### 🎮 **Basic Survival Guide**

- **🚀 Start**: Click the Start button to begin your island adventure
- **👁️ Observe**: Each round shows a center color and plays a tone depending on the mode
- **🎯 One Shot**: You have **one click per round** to pick the correct tile
- **💀 Game Over**: Three mistakes → you're marooned on the island!
- **🗺️ Legend**: Use the bottom-left list button to hear/see each color's tone mapping

</div>

---

## ⚔️ Island Mode Rules & Strategies

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2em; border-radius: 15px; margin: 1em 0;">

### 🎨 **Color Mode** _(Black Background - Trust Your Eyes)_

- **Truth Source**: Center color is the correct answer
- **Decoy**: Tone is random/misleading
- **Strategy**: Click the tile that matches the center color

### 🎵 **Sound Mode** _(Gradient Background - Trust Your Ears)_

- **Truth Source**: Tone determines the target tile
- **Decoy**: Center color is random/misleading
- **Strategy**: Click the tile whose original color matches the tone

### 🌀 **Striped Mode** _(Mixing Background - Trust Your Brain)_

- **Setup**: Center shows one of four primaries (yellow/blue/green/red)
- **Cue**: A tone plays for one of the four primaries
- **Visual Mix**: Each outer tile shows a distinct mix of center color + that tile's original color
- **Correct Answer**: Exactly one tile displays the correct mix of center + tone
  - _Examples: red+blue → magenta, blue+green → cyan, red+yellow → orange_
- **Strategy**: Click the tile at the tone color's original position (it displays the correct mix)

</div>

---

## 🏛️ Ship's Architecture

<div style="background-color:#F5F5F5; border-radius: 10px; padding: 1.5em;">

### 📂 **Directory Overview**

```
🏴‍☠️ Chromabeat Navigation Map
├── 🎮 src/app/page.tsx              # Main game deck (UI composition & controls)
├── 🎣 src/hooks/useGameLogic.ts     # Round generation, timers, scoring, mistakes
├── 🔊 src/hooks/useAudio.ts         # Web Audio helpers (oscillator, gain)
├── 🧩 src/components/game/*         # UI components (board, overlays, buttons, indicators)
├── 🛠️ src/lib/utils.ts              # cn utility (class merging)
└── 🔧 postcss.config.js             # Tailwind v4 PostCSS plugin configuration
```

</div>

---

## 📜 Developer's Island Journal

<div style="background-color:#FDF5E6; border: 2px solid #D2691E; padding: 2em; border-radius: 15px; margin: 2em 0;">

### 🌅 **1) Brainstorming: Color- and sound-only game ideas**

_We began by brainstorming the ideas what the game could be like. We wanted to combine the colors with the sounds so it would fit the game._

### 🏗️ **2) v0 UI: One-shot generation and initial build**

_We defined a simple spec: four circular buttons and a central hint. Using v0, We generated a clean UI scaffold and wired a basic "sequence + playback + click to match" flow. The first pass established: four primary colors and placements, center hint space, simple tones via Web Audio, and round/turn state and scoring._

### 🎨 **3) Tailwind v4 and project setup**

_We integrated Tailwind CSS v4 and switched PostCSS to the new plugin: `postcss.config.js` → `@tailwindcss/postcss`. Utility-first styling with Tailwind; aliases configured via `tsconfig.json` (`@/_`→`./src/_`)._

### ⚡ **4) Refining gameplay: one-click rounds and clearer feedback**

_The initial long sequences were replaced by single-click rounds. This made the game snappier and more readable. I added: round cue playback (a single tone) and then enable input, green/red haze overlay for success/failure, and removed extra sounds (only the clicked color's tone plays)._

### 🎭 **5) Mode polish: backgrounds and iconography**

_Each mode got a distinct background for instant recognition: Color (solid black), Sound (more pronounced gradient `from-white via-gray-500 to-black`), and Striped (repeating diagonal stripes for the mixing/inverse flavor)._

### 🎵 **6) Audio clarity and legend button**

_Early tones were too similar, so We spaced pitches widely (e.g., A3/A4/A5/A6). I added a bottom-left "legend" button that cycles each color and plays its tone. During the demo, player input is temporarily paused and resumes afterwards._

### 🌈 **7) Striped mode redesign: intuitive color mixing**

_The striped mode went through multiple iterations. The final model: Center is one of the four primaries (yellow/blue/green/red), a tone (also one of the primaries) plays, outer tiles display distinct, intuitive mixes using a fixed palette. Only the tile at the tone's original position will display the correct mix. Removed inverted palettes and avoided ambiguous blends; ensured visible contrast among all four tiles._

### 🔧 **8) Stabilization and DX improvements**

_Fixed Tailwind v4 PostCSS error by moving to `@tailwindcss/postcss`, consolidated `cn` utility and class merging, split logic into hooks (`useGameLogic`, `useAudio`) and components for clarity, ensured lints/builds pass, and resolved Windows shell quirks and Next.js port conflicts during dev._

### 🚀 **9) What We'd do next**

_Add accessibility hints (visual patterns) to complement color perception, difficulty scaling with shorter timers and misdirection cues, and online multiplayer with input validation and round syncing via a simple server._

</div>

---

## 🚀 Ship's Command Center

<div style="display: flex; justify-content: space-around; margin: 2em 0;">

<div style="text-align: center; padding: 1em; border: 2px solid #4CAF50; border-radius: 10px; margin: 0.5em;">
<strong>🛠️ Development</strong><br>
<code>npm run dev</code><br>
<small>Start development server (Turbopack)</small>
</div>

<div style="text-align: center; padding: 1em; border: 2px solid #2196F3; border-radius: 10px; margin: 0.5em;">
<strong>🏗️ Build</strong><br>
<code>npm run build</code><br>
<small>Build for production</small>
</div>

<div style="text-align: center; padding: 1em; border: 2px solid #FF9800; border-radius: 10px; margin: 0.5em;">
<strong>🚀 Deploy</strong><br>
<code>npm start</code><br>
<small>Start production server</small>
</div>

</div>

---

## 📄 License

**MIT** - Built for the Shipwrecked Challenge with ⚓ and 🎵

<div style="background-color:#E8F4F8; border-left: 4px solid #0077B6; padding: 1em; margin: 1em 0;">
<em>This is a <a href="https://nextjs.org">Next.js</a> project bootstrapped with <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app">create-next-app</a> and enhanced for the island adventure!</em>

### 🌊 Additional Resources

**Getting Started with Next.js:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

**Learn More:**

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

**Deploy on Vercel:**
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

</div>

---

## 🤝 Fellow Islanders

<div align="center">
<h3>🏴‍☠️ Built by Shipwrecked Survivors</h3>

This treasure was forged during **Shipwrecked Challenge #2: The Villagers Can't Speak**

---
