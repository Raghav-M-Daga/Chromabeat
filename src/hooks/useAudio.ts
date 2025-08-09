import { useEffect, useRef } from "react"

export default function useAudio() {
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

    const playTone = (frequency: number, duration = 0.3) => {
        if (!audioContextRef.current) return
        const ctx = audioContextRef.current
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
        oscillator.type = "sine"
        gainNode.gain.setValueAtTime(0, ctx.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + duration)
    }

    const getButtonFrequency = (color: string): number => {
        const frequencies: Record<string, number> = {
            red: 220.0,
            yellow: 440.0,
            green: 880.0,
            blue: 1760.0,
        }
        return frequencies[color] || 440.0
    }

    return { playTone, getButtonFrequency }
}