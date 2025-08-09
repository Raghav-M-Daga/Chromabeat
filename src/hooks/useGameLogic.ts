import { useState, useCallback } from "react"

type GameMode = "color" | "sound" | "combination"
type ButtonColor = "yellow" | "blue" | "green" | "red";

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
    maxTime: number
    startTime: number | null
    pausedRemaining: number | null
}

const getRandomBaseColor = (BUTTON_ORDER: ButtonColor[]): ButtonColor =>
    BUTTON_ORDER[Math.floor(Math.random() * BUTTON_ORDER.length)]

export default function useGameLogic(
    BUTTON_ORDER: ButtonColor[],
    playTone: (frequency: number) => void,
    getButtonFrequency: (color: ButtonColor) => number
) {
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
        maxTime: 0,
        startTime: null,
        pausedRemaining: null,
    })

    const startNextRound = useCallback(() => {
        const nextMode: GameMode =
            (["color", "sound", "combination"][Math.floor(Math.random() * 3)] as GameMode)

        let centerColor: ButtonColor = getRandomBaseColor(BUTTON_ORDER)
        let toneColor: ButtonColor = getRandomBaseColor(BUTTON_ORDER)
        let targetColor: ButtonColor

        if (nextMode === "color") {
            centerColor = getRandomBaseColor(BUTTON_ORDER)
            do {
                toneColor = getRandomBaseColor(BUTTON_ORDER)
            } while (toneColor === centerColor && Math.random() < 0.7)
            targetColor = centerColor
        } else if (nextMode === "sound") {
            toneColor = getRandomBaseColor(BUTTON_ORDER)
            centerColor = getRandomBaseColor(BUTTON_ORDER)
            do {
                toneColor = getRandomBaseColor(BUTTON_ORDER)
            } while (toneColor === centerColor && Math.random() < 0.7)
            targetColor = toneColor
        } else {
            centerColor = getRandomBaseColor(BUTTON_ORDER)
            do {
                toneColor = getRandomBaseColor(BUTTON_ORDER)
            } while (toneColor === centerColor)

            targetColor = toneColor
        }


        setGameState(prev => {
            const newMaxTime = Math.max(1.5, 5 - 0.2 * prev.score)
            return {
                ...prev,
                mode: nextMode,
                centerColor,
                toneColor,
                targetColor,
                isPlayerTurn: true,
                maxTime: newMaxTime,
                startTime: Date.now(),
            }
        })

        setTimeout(() => {
            if (toneColor) playTone(getButtonFrequency(toneColor))
        }, 200)
    }, [BUTTON_ORDER, playTone, getButtonFrequency])

    const startNewGame = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            isPlaying: true,
            isPlayerTurn: false,
            score: 0,
            mistakes: 0,
            gameOver: false,
            centerColor: null,
            toneColor: null,
            targetColor: null,
            maxTime: 0,
            startTime: null,
            pausedRemaining: null,
        }))
        setTimeout(() => startNextRound(), 600)
    }, [startNextRound])

    return { gameState, setGameState, startNextRound, startNewGame }
}