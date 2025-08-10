import { cn } from "@/lib/utils"

export default function LegendButton({ isDemoPlaying, onClick, isPlaying, gameOver }: { isDemoPlaying: boolean; onClick: () => void, isPlaying: boolean, gameOver: boolean }) {
    return (
        <div className="absolute bottom-8 left-8 z-10">
            <button
                aria-label="Play color sound legend"
                onClick={onClick}
                disabled={(isPlaying && !gameOver || isDemoPlaying)}
                className={cn(
                    "w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:cursor-pointer", (isPlaying && !gameOver || isDemoPlaying) && "opacity-60 cursor-not-allowed",
                )}
            >
                <div className="space-y-1.5">
                    <div className="w-6 h-0.5 bg-white/90" />
                    <div className="w-6 h-0.5 bg-white/90" />
                    <div className="w-6 h-0.5 bg-white/90" />
                </div>
            </button>
        </div>
    )
}