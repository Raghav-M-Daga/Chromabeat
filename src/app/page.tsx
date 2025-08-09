"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import MultiplayerDialog from "@/components/game/MultiplayerDialog"
import GameInterface from "@/components/game/GameInterface"
import ScoreIndicator from "@/components/game/ScoreIndicator"
import MistakesIndicator from "@/components/game/MistakesIndicator"
import ProgressBar from "@/components/game/ProgressBar"
import LegendButton from "@/components/game/LegendButton"
import MultiplayerButton from "@/components/game/MultiplayerButton"
import StartButton from "@/components/game/StartButton"
import SuccessErrorOverlay from "@/components/game/SuccessErrorOverlay"
import useAudio from "@/hooks/useAudio"
import useGameSounds from "@/hooks/useGameSounds"
import useGameLogic from "@/hooks/useGameLogic"

type ButtonColor = "yellow" | "blue" | "green" | "red"

const BUTTON_COLORS: Record<ButtonColor, string> = {
    yellow: "#FFD500",
    blue: "#0074D9",
    green: "#2ECC40",
    red: "#FF4136",
}

const COMBINATION_BUTTON_COLORS: Record<ButtonColor, string> = {
    yellow: "#002AFF",
    blue: "#FF8B26",
    green: "#D133BF",
    red: "#00BEC9",
}

const BUTTON_ORDER: ButtonColor[] = ["yellow", "blue", "green", "red"]

const initialButtonPositions: Record<ButtonColor, string> = {
    yellow: "row-start-1 col-start-2",
    blue: "row-start-2 col-start-3",
    green: "row-start-3 col-start-2",
    red: "row-start-2 col-start-1",
}

export default function GamePage() {
    const { playTone, getButtonFrequency } = useAudio()
    const { playSuccessSound, playErrorSound } = useGameSounds(playTone)
    const { gameState, setGameState, startNextRound, startNewGame } = useGameLogic(BUTTON_ORDER, playTone, getButtonFrequency)

    const [activeButton, setActiveButton] = useState<ButtonColor | null>(null)
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isDemoPlaying, setIsDemoPlaying] = useState(false)
    const [multiplayerOpen, setMultiplayerOpen] = useState(false)
    const [partyCode, setPartyCode] = useState<ButtonColor[]>([])
    const [buttonPositions, setButtonPositions] = useState<Record<ButtonColor, string>>(initialButtonPositions)

    const progressRef = useRef<HTMLDivElement>(null!)
    const countdownRef = useRef<number | null>(null)

    const rotatePositions = useCallback(() => {
        const positionCycle = [
            "row-start-1 col-start-2",
            "row-start-2 col-start-3",
            "row-start-3 col-start-2",
            "row-start-2 col-start-1",
        ]

        const currentColors = positionCycle.map(cls =>
            Object.keys(buttonPositions).find(color => buttonPositions[color as ButtonColor] === cls) as ButtonColor
        )

        const direction = Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'
        let newColors: ButtonColor[]
        if (direction === 'clockwise') {
            newColors = [currentColors[3], currentColors[0], currentColors[1], currentColors[2]]
        } else {
            newColors = [currentColors[1], currentColors[2], currentColors[3], currentColors[0]]
        }

        const newPositions = {} as Record<ButtonColor, string>
        newColors.forEach((color, idx) => {
            newPositions[color] = positionCycle[idx]
        })

        setButtonPositions(newPositions)
    }, [buttonPositions])

    useEffect(() => {
        if (!gameState.isPlayerTurn || gameState.gameOver || gameState.startTime === null || !progressRef.current) {
            if (countdownRef.current !== null) {
                cancelAnimationFrame(countdownRef.current)
                countdownRef.current = null
            }
            return
        }

        progressRef.current.style.width = "100%"
        progressRef.current.style.backgroundColor = "#FFFFFF"

        const update = () => {
            const elapsed = (Date.now() - gameState.startTime!) / 1000
            const newTimeLeft = Math.max(0, gameState.maxTime - elapsed)
            const progressPct = (newTimeLeft / gameState.maxTime) * 100

            if (progressRef.current) {
                progressRef.current.style.width = `${progressPct}%`
                progressRef.current.style.backgroundColor = newTimeLeft < 1 ? "#EF4444" : "#FFFFFF"
            }

            if (newTimeLeft > 0) {
                countdownRef.current = requestAnimationFrame(update)
            } else {
                if (progressRef.current) {
                    progressRef.current.style.width = "0%"
                }
                setGameState(prev => ({
                    ...prev,
                    isPlayerTurn: false,
                    startTime: null,
                }))
                setShowError(true)
                playErrorSound()
                const newMistakes = gameState.mistakes + 1
                setTimeout(() => {
                    setShowError(false)
                    if (newMistakes >= 3) {
                        setGameState(p => ({
                            ...p,
                            gameOver: true,
                            mistakes: newMistakes,
                        }))
                    } else {
                        setGameState(p => ({
                            ...p,
                            mistakes: newMistakes,
                        }))
                        setTimeout(() => {
                            rotatePositions()
                            startNextRound()
                        }, 700)
                    }
                }, 800)
            }
        }

        countdownRef.current = requestAnimationFrame(update)

        return () => {
            if (countdownRef.current !== null) {
                cancelAnimationFrame(countdownRef.current)
                countdownRef.current = null
            }
        }
    }, [gameState.isPlayerTurn, gameState.gameOver, gameState.startTime, gameState.maxTime, gameState.mistakes, playErrorSound, startNextRound, setGameState, rotatePositions])

    const handleButtonClick = useCallback(
        (color: ButtonColor) => {
            if (!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying) return

            setGameState(prev => ({ ...prev, isPlayerTurn: false, startTime: null }))

            if (progressRef.current) {
                progressRef.current.style.width = "0%"
            }

            setActiveButton(color)
            playTone(getButtonFrequency(color))
            setTimeout(() => setActiveButton(null), 200)

            const isCorrect = color === gameState.targetColor
            if (isCorrect) {
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                    setGameState(prev => {
                        const newScore = prev.score + 1

                        return { ...prev, score: newScore }
                    })
                    setTimeout(() => {
                        if (!gameState.gameOver) {
                            rotatePositions()
                            startNextRound()
                        }
                    }, 700)
                }, 700)
            } else {
                setShowError(true)
                const newMistakes = gameState.mistakes + 1
                setTimeout(() => {
                    setShowError(false)
                    if (newMistakes >= 3) {
                        setGameState(prev => ({ ...prev, gameOver: true, mistakes: newMistakes }))
                    } else {
                        setGameState(prev => ({ ...prev, mistakes: newMistakes }))
                        setTimeout(() => {
                            rotatePositions()
                            startNextRound()
                        }, 700)
                    }
                }, 800)
            }
        },
        [
            gameState,
            isDemoPlaying,
            playTone,
            getButtonFrequency,
            playSuccessSound,
            playErrorSound,
            startNextRound,
            setGameState,
            rotatePositions,
        ],
    )

    const playLegend = useCallback(() => {
        if (isDemoPlaying) return
        setIsDemoPlaying(true)

        const previousState = gameState

        setGameState(prev => ({
            ...prev,
            isPlayerTurn: false,
            startTime: null,
            pausedRemaining:
                prev.isPlayerTurn && prev.startTime !== null
                    ? prev.maxTime - (Date.now() - prev.startTime) / 1000
                    : prev.pausedRemaining,
            centerColor: null,
            toneColor: null,
        }))

        BUTTON_ORDER.forEach((color, index) => {
            setTimeout(() => {
                setActiveButton(color)
                playTone(getButtonFrequency(color), 0.35)
                setTimeout(() => setActiveButton(null), 250)
            }, index * 650)
        })

        setTimeout(() => {
            setIsDemoPlaying(false)
            setGameState(prev => ({
                ...prev,
                centerColor: previousState.centerColor,
                toneColor: previousState.toneColor,
                isPlayerTurn: previousState.isPlayerTurn,
                startTime:
                    previousState.isPlayerTurn && prev.pausedRemaining !== null
                        ? Date.now() - (previousState.maxTime - prev.pausedRemaining) * 1000
                        : prev.startTime,
                pausedRemaining: null,
            }))
        }, BUTTON_ORDER.length * 650 + 50)
    }, [isDemoPlaying, gameState, setGameState, playTone, getButtonFrequency, setActiveButton, BUTTON_ORDER])

    const getBackgroundStyle = () => {
        switch (gameState.mode) {
            case "color":
                return "bg-black"
            case "sound":
                return "bg-gradient-to-b from-gray-800 to-black"
            case "combination":
                return "bg-[repeating-linear-gradient(45deg,#1a1a1a_0px,#1a1a1a_5px,#2a2a2a_5px,#2a2a2a_10px)]"
            default:
                return "bg-black"
        }
    }

    const getCenterIcon = () => {
        if (!gameState.centerColor) return null
        const bg = BUTTON_COLORS[gameState.centerColor];
        return (
            <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white/20"
                style={{ backgroundColor: bg }}
            />
        )
    }

    const handleMultiplayerClick = () => {
        const code = Array.from({ length: 5 }, () => BUTTON_ORDER[Math.floor(Math.random() * BUTTON_ORDER.length)]);
        setPartyCode(code);
        setMultiplayerOpen(true);
    }

    const handleStartNewGame = useCallback(() => {
        setButtonPositions(initialButtonPositions)
        startNewGame()
    }, [startNewGame])

    const handleJoin = useCallback((code: ButtonColor[]) => {
        // TODO: Implement multiplayer connection logic here (e.g., join room with code.join('-'))
        console.log('Joining multiplayer with code:', code);
        setMultiplayerOpen(false);
        // Example: setIsMultiplayer(true); setRoomCode(code);
    }, [])

    return (
        <div
            className={cn(
                "min-h-screen w-full relative overflow-hidden transition-all duration-1000",
                getBackgroundStyle(),
                showError && "bg-red-500/30",
                showSuccess && "bg-green-500/20",
            )}
        >
            <SuccessErrorOverlay showSuccess={showSuccess} showError={showError} />

            <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
                <div className="flex-1" />
                <ScoreIndicator score={gameState.score} />
                <MistakesIndicator mistakes={gameState.mistakes} />
            </div>

            <ProgressBar progressRef={progressRef} />

            <GameInterface
                BUTTON_ORDER={BUTTON_ORDER}
                gameState={gameState}
                COMBINATION_BUTTON_COLORS={COMBINATION_BUTTON_COLORS}
                BUTTON_COLORS={BUTTON_COLORS}
                handleButtonClick={handleButtonClick}
                getCenterIcon={getCenterIcon}
                activeButton={activeButton}
                showSuccess={showSuccess}
                isDemoPlaying={isDemoPlaying}
                buttonPositions={buttonPositions}
            />

            <LegendButton
                isPlaying={gameState.isPlaying}
                isDemoPlaying={isDemoPlaying}
                onClick={playLegend}
            />

            <div className="absolute bottom-8 right-8 z-10">
                <button
                    aria-label="Restart game"
                    onClick={handleStartNewGame}
                    disabled={gameState.isPlaying}
                    className={cn(
                        "w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center", gameState.isPlaying && "opacity-60 cursor-not-allowed"
                    )}
                >
                    {/* reload icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-6 h-6 text-white/90"
                    >
                        <path d="M21 12a9 9 0 1 1-3.51-7.09" />
                        <path d="M21 3v6h-6" />
                    </svg>
                </button>
            </div>

            {(!gameState.isPlaying || gameState.gameOver) && (
                <StartButton
                    isDemoPlaying={isDemoPlaying}
                    onClick={handleStartNewGame}
                />
            )}

            <MultiplayerDialog
                BUTTON_COLORS={BUTTON_COLORS}
                BUTTON_ORDER={BUTTON_ORDER}
                partyCode={partyCode}
                multiplayerOpen={multiplayerOpen}
                setMultiplayerOpen={setMultiplayerOpen}
                onJoin={handleJoin}
            />
        </div>
    )
}