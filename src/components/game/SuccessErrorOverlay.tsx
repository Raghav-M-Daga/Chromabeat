import { cn } from "@/lib/utils"

export default function SuccessErrorOverlay({ showSuccess, showError }: { showSuccess: boolean; showError: boolean }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                showSuccess ? "opacity-100 bg-green-500/40" : showError ? "opacity-100 bg-red-500/50" : "opacity-0",
            )}
        />
    )
}