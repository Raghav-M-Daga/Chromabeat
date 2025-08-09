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
    optionMixes: Record<ButtonColor, string> | null
}

const getRandomBaseColor = (BUTTON_ORDER: ButtonColor[]): ButtonColor =>
    BUTTON_ORDER[Math.floor(Math.random() * BUTTON_ORDER.length)]

// Allowed mixed color names for inverse mode button options
const MIX_ALLOWED_NAMES = ["purple", "cyan", "yellow", "brown", "orange", "green", "lime"] as const
type MixName = (typeof MIX_ALLOWED_NAMES)[number]

// Fixed hex values for each allowed mix name
const MIX_HEX: Record<MixName, string> = {
    // Make purple less magenta and more violet
    purple: "#8000FF",
    cyan: "#00FFFF",
    yellow: "#FFD500",
    brown: "#8B4513",
    orange: "#FFA500",
    green: "#2ECC40",
    lime: "#ADFF2F",
}

// Valid center+tone combinations and their resulting mix names (unordered pairs)
const MIX_COMBINATIONS: Array<{ a: ButtonColor; b: ButtonColor; mix: MixName }> = [
    { a: "red", b: "blue", mix: "purple" },
    { a: "red", b: "yellow", mix: "orange" },
    { a: "red", b: "green", mix: "brown" },
    { a: "blue", b: "yellow", mix: "green" },
    { a: "blue", b: "green", mix: "cyan" },
    { a: "yellow", b: "green", mix: "lime" },
]

const getMixForPair = (c1: ButtonColor, c2: ButtonColor): MixName | null => {
    for (const { a, b, mix } of MIX_COMBINATIONS) {
        if ((c1 === a && c2 === b) || (c1 === b && c2 === a)) return mix
    }
    return null
}

const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

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
        optionMixes: null,
    })

    const startNextRound = useCallback(() => {
        const nextMode: GameMode =
            (["color", "sound", "combination"][Math.floor(Math.random() * 3)] as GameMode)

        let centerColor: ButtonColor = getRandomBaseColor(BUTTON_ORDER)
        let toneColor: ButtonColor = getRandomBaseColor(BUTTON_ORDER)
        let targetColor: ButtonColor
        let optionMap: Record<ButtonColor, string> | null = null

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
                optionMixes: nextMode === "combination" ? optionMap : null,
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