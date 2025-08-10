import { cn } from "@/lib/utils"

export default function MultiplayerButton({ isDemoPlaying, onClick, isPlaying }: { isDemoPlaying: boolean; onClick: () => void, isPlaying: boolean }) {
    return (
        <div className="absolute bottom-8 right-8 z-10">
            <button
                aria-label="Multiplayer mode"
                onClick={onClick}
                className={cn("w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:cursor-pointer", (isDemoPlaying || isPlaying) && "opacity-60 cursor-not-allowed")}
                disabled={isDemoPlaying || isPlaying}
            >
                <div className="relative w-6 h-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/90" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-white/90 scale-75" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-white/90 scale-75" />
                </div>
            </button>
        </div>
    )
}