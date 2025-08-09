"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

type GameMode = "color" | "sound" | "inverse"
type ButtonColor = "yellow" | "blue" | "green" | "red"

interface GameState {
  mode: GameMode
  isPlaying: boolean
  isPlayerTurn: boolean
  score: number
  mistakes: number
  gameOver: boolean
  centerColor: ButtonColor | null
  toneColor: ButtonColor | null
  targetColor: ButtonColor | null
}

const BUTTON_COLORS: Record<ButtonColor, string> = {
  yellow: "#FFD500",
  blue: "#0074D9",
  green: "#2ECC40",
  red: "#FF4136",
}

// Inverse palette used in "inverse" mode (striped background)
const INVERTED_BUTTON_COLORS: Record<ButtonColor, string> = {
  // Complements to showcase cyan/magenta and swaps for blue/yellow
  red: "#00FFFF", // cyan
  green: "#FF00FF", // magenta
  blue: "#FFFF00", // yellow
  yellow: "#0000FF", // blue
}

const BUTTON_ORDER: ButtonColor[] = ["yellow", "blue", "green", "red"]
const colorToIndex = (c: ButtonColor) => BUTTON_ORDER.indexOf(c)
const indexToColor = (i: number): ButtonColor => BUTTON_ORDER[i as 0 | 1 | 2 | 3]

const BUTTON_POSITIONS = {
  yellow: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  blue: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  green: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  red: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
}

export default function ChromabeatGame() {
  const [gameState, setGameState] = useState<GameState>({
    mode: "color",
    isPlaying: false,
    isPlayerTurn: false,
    score: 0,
    mistakes: 0,
    gameOver: false,
    centerColor: null,
    toneColor: null,
    targetColor: null,
  })

  const [activeButton, setActiveButton] = useState<ButtonColor | null>(null)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isDemoPlaying, setIsDemoPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        const Standard = (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext
        const Webkit = (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        const AudioCtor = Standard ?? Webkit
        if (!AudioCtor) return
        audioContextRef.current = new AudioCtor()
      }
    }

    const handleFirstInteraction = () => {
      initAudio()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("touchstart", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [])

  const playTone = useCallback((frequency: number, duration = 0.3) => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }, [])

  const getButtonFrequency = (color: ButtonColor): number => {
    // Widely spaced pitches for clear distinction
    const frequencies: Record<ButtonColor, number> = {
      red: 220.0, // A3
      yellow: 440.0, // A4
      green: 880.0, // A5
      blue: 1760.0, // A6
    }
    return frequencies[color]
  }

  // No entry sounds on background changes to avoid overlap/double audio

  const playSuccessSound = useCallback(() => {
    setTimeout(() => playTone(523.25, 0.1), 0)
    setTimeout(() => playTone(659.25, 0.1), 50)
    setTimeout(() => playTone(783.99, 0.1), 100)
    setTimeout(() => playTone(1046.5, 0.2), 150)
  }, [playTone])

  const playErrorSound = useCallback(() => {
    playTone(150, 0.5)
  }, [playTone])

  const getRandomBaseColor = (): ButtonColor => BUTTON_ORDER[Math.floor(Math.random() * BUTTON_ORDER.length)]

  // Compute the next round according to the rules
  const startNextRound = useCallback(() => {
    const nextMode: GameMode = ["color", "sound", "inverse"][Math.floor(Math.random() * 3)] as GameMode

    let centerColor: ButtonColor
    let toneColor: ButtonColor
    let targetColor: ButtonColor

    if (nextMode === "color") {
      // Black background: center shows accurate color; sound is random (may differ)
      centerColor = getRandomBaseColor()
      do {
        toneColor = getRandomBaseColor()
      } while (toneColor === centerColor && Math.random() < 0.7) // usually different
      targetColor = centerColor
    } else if (nextMode === "sound") {
      // Gradient background: center color is random; sound determines correct circle
      toneColor = getRandomBaseColor()
      centerColor = getRandomBaseColor() // decoy
      targetColor = toneColor
    } else {
      // Inverse background: inverted button palette; center original + unrelated sound
      centerColor = getRandomBaseColor()
      do {
        toneColor = getRandomBaseColor()
      } while (toneColor === centerColor && Math.random() < 0.7)
      // Combine both to pick target: XOR indices so both cues matter
      const i = colorToIndex(centerColor)
      const j = colorToIndex(toneColor)
      const k = i ^ j
      targetColor = indexToColor(k)
    }

    // Apply state and enable player's single click
    setGameState((prev) => ({
      ...prev,
      mode: nextMode,
      centerColor,
      toneColor,
      targetColor,
      isPlayerTurn: true,
    }))

    // Play only the tone cue for the round (no additional UI-triggered sounds)
    setTimeout(() => playTone(getButtonFrequency(toneColor)), 200)
  }, [playTone])

  const startNewGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      isPlayerTurn: false,
      score: 0,
      mistakes: 0,
      gameOver: false,
      centerColor: null,
      toneColor: null,
      targetColor: null,
    }))
    setTimeout(() => startNextRound(), 600)
  }, [startNextRound])

  const handleButtonClick = useCallback(
    (color: ButtonColor) => {
      if (!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying) return

      setGameState((prev) => ({ ...prev, isPlayerTurn: false }))

      // Visual/audio feedback on click
      setActiveButton(color)
      playTone(getButtonFrequency(color))
      setTimeout(() => setActiveButton(null), 200)

      const isCorrect = color === gameState.targetColor

      if (isCorrect) {
        setShowSuccess(true)
        playSuccessSound()
        setTimeout(() => {
          setShowSuccess(false)
          setGameState((prev) => ({ ...prev, score: prev.score + 1 }))
          setTimeout(() => startNextRound(), 700)
        }, 700)
      } else {
        setShowError(true)
        playErrorSound()
        const newMistakes = gameState.mistakes + 1
        setTimeout(() => {
          setShowError(false)
          if (newMistakes >= 3) {
            setGameState((prev) => ({ ...prev, gameOver: true, mistakes: newMistakes }))
          } else {
            setGameState((prev) => ({ ...prev, mistakes: newMistakes }))
            setTimeout(() => startNextRound(), 700)
          }
        }, 800)
      }
    },
    [gameState.isPlayerTurn, gameState.gameOver, isDemoPlaying, gameState.targetColor, gameState.mistakes, playTone, playSuccessSound, playErrorSound, startNextRound],
  )

  // Play a quick demo cycling through each color's tone and label
  const playLegend = useCallback(() => {
    if (isDemoPlaying) return
    setIsDemoPlaying(true)
    const previousCenter = gameState.centerColor
    const previousTone = gameState.toneColor
    const previousTurn = gameState.isPlayerTurn

    // Pause input during demo
    setGameState((prev) => ({ ...prev, isPlayerTurn: false }))

    BUTTON_ORDER.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color)
        // Show color in center during demo
        setGameState((prev) => ({ ...prev, centerColor: color }))
        playTone(getButtonFrequency(color), 0.35)
        setTimeout(() => setActiveButton(null), 250)
      }, index * 650)
    })

    setTimeout(() => {
      // Restore previous cues and turn state
      setIsDemoPlaying(false)
      setGameState((prev) => ({
        ...prev,
        centerColor: previousCenter,
        toneColor: previousTone,
        isPlayerTurn: previousTurn,
      }))
    }, BUTTON_ORDER.length * 650 + 50)
  }, [gameState.centerColor, gameState.isPlayerTurn, gameState.toneColor, isDemoPlaying, playTone])

  // Intentionally no sounds triggered by background/mode changes

  const getBackgroundStyle = () => {
    switch (gameState.mode) {
      case "color":
        return "bg-black"
      case "sound":
        return "bg-gradient-to-b from-white to-black"
      case "inverse":
        return "bg-[repeating-linear-gradient(0deg,#000_0px,#000_20px,#fff_20px,#fff_40px)]"
      default:
        return "bg-black"
    }
  }

  const getCenterIcon = () => {
    if (!gameState.centerColor) return null
    return (
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white/20"
        style={{ backgroundColor: BUTTON_COLORS[gameState.centerColor] }}
      />
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full relative overflow-hidden transition-all duration-1000",
        getBackgroundStyle(),
        showError && "bg-red-500/30",
        showSuccess && "bg-green-500/20",
      )}
    >
      {/* Result haze overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          showSuccess ? "opacity-100 bg-green-500/40" : showError ? "opacity-100 bg-red-500/50" : "opacity-0",
        )}
      />
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
        <div className="flex-1" />
        <div className="flex space-x-2">
          {Array.from({ length: Math.max(5, gameState.score) }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i < gameState.score ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/20",
              )}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-end space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-4 h-4 relative transition-all duration-300",
                i < gameState.mistakes ? "opacity-100" : "opacity-20",
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center text-red-400 font-bold text-lg">×</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mode selector removed; background is randomized each round */}

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">{getCenterIcon()}</div>

          {(Object.keys(BUTTON_COLORS) as ButtonColor[]).map((color) => (
            <button
              key={color}
              onClick={() => handleButtonClick(color)}
              className={cn(
                "absolute w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-200 transform",
                BUTTON_POSITIONS[color],
                "shadow-lg hover:scale-105 active:scale-95",
                activeButton === color && "scale-110 brightness-150",
                showSuccess && "animate-pulse",
              )}
              style={{
                backgroundColor: gameState.mode === "inverse" ? INVERTED_BUTTON_COLORS[color] : BUTTON_COLORS[color],
                boxShadow:
                  activeButton === color
                    ? `0 0 30px ${gameState.mode === "inverse" ? INVERTED_BUTTON_COLORS[color] : BUTTON_COLORS[color]}`
                    : `0 0 10px ${(
                        gameState.mode === "inverse" ? INVERTED_BUTTON_COLORS[color] : BUTTON_COLORS[color]
                      )}40`,
              }}
              disabled={!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying}
            />
          ))}
        </div>
      </div>

      {/* Legend/demo button (bottom-left) */}
      <div className="absolute bottom-8 left-8 z-10">
        <button
          aria-label="Play color sound legend"
          onClick={playLegend}
          disabled={isDemoPlaying}
          className={cn(
            "w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center",
            isDemoPlaying && "opacity-60 cursor-not-allowed",
          )}
        >
          {/* Simple list icon */}
          <div className="space-y-1.5">
            <div className="w-6 h-0.5 bg-white/90" />
            <div className="w-6 h-0.5 bg-white/90" />
            <div className="w-6 h-0.5 bg-white/90" />
          </div>
        </button>
      </div>

      {(!gameState.isPlaying || gameState.gameOver) && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={startNewGame}
            className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}
