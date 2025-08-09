import { useCallback } from "react"

export default function useGameSounds(playTone: (freq: number, duration?: number) => void) {
    const playSuccessSound = useCallback(() => {
        setTimeout(() => playTone(523.25, 0.1), 0)
        setTimeout(() => playTone(659.25, 0.1), 50)
        setTimeout(() => playTone(783.99, 0.1), 100)
        setTimeout(() => playTone(1046.5, 0.2), 150)
    }, [playTone])

    const playErrorSound = useCallback(() => {
        playTone(150, 0.5)
    }, [playTone])

    return { playSuccessSound, playErrorSound }
}