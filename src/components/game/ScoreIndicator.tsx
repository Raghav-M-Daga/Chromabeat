import { cn } from "@/lib/utils"

export default function ScoreIndicator({ score }: { score: number }) {
    return (
        <div className="flex space-x-2">
            {Array.from({ length: Math.max(1, score) }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        i < score ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/20",
                    )}
                />
            ))}
        </div>
    )
}