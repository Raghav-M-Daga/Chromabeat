import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export default function MistakesIndicator({ mistakes }: { mistakes: number }) {
    return (
        <div className="flex-1 flex justify-end space-x-2 sm:mr-1 mr-0">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className={cn("w-6 h-6 relative transition-all duration-300", i < mistakes ? "opacity-100" : "opacity-20")}
                >
                    <div className="absolute inset-0 flex items-center justify-center text-red-400 text-lg"><X /></div>
                </div>
            ))}
        </div>
    )
}