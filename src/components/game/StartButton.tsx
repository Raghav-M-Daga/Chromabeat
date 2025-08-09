import { cn } from "@/lib/utils"

export default function StartButton({ isDemoPlaying, onClick }: { isDemoPlaying: boolean; onClick: () => void }) {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
                onClick={onClick}
                className={cn("w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:cursor-pointer", isDemoPlaying && "opacity-60 cursor-not-allowed")}
                disabled={isDemoPlaying}
            >
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
            </button>
        </div>
    )
}