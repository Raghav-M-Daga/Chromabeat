import { JSX } from "react"
import { cn } from "@/lib/utils"

type GameMode = "color" | "sound" | "inverse"
type ButtonColor = "yellow" | "blue" | "green" | "red"

const buttonGridPositions: Record<ButtonColor, string> = {
    yellow: "row-start-1 col-start-2",
    blue: "row-start-2 col-start-3",
    green: "row-start-3 col-start-2",
    red: "row-start-2 col-start-1",
}

interface GameInterfaceProps {
    BUTTON_ORDER: ButtonColor[]
    gameState: {
        mode: GameMode
        isPlayerTurn: boolean
        gameOver: boolean
    }
    INVERTED_BUTTON_COLORS: Record<ButtonColor, string>
    BUTTON_COLORS: Record<ButtonColor, string>
    handleButtonClick: (color: ButtonColor) => void
    getCenterIcon: () => JSX.Element | null
    activeButton: ButtonColor | null
    showSuccess: boolean
    isDemoPlaying: boolean
}

export default function GameInterface({
    BUTTON_ORDER,
    gameState,
    INVERTED_BUTTON_COLORS,
    BUTTON_COLORS,
    handleButtonClick,
    getCenterIcon,
    activeButton,
    showSuccess,
    isDemoPlaying,
}: GameInterfaceProps) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-8">
            <div className="grid place-items-center gap-2 [grid-template-columns:repeat(3,calc(var(--d)/1.4142))] [grid-template-rows:repeat(3,calc(var(--d)/1.4142))] [--d:9rem] sm:[--d:12rem]">
                <div className="row-start-2 col-start-2 z-10 flex items-center justify-center">{getCenterIcon()}</div>
                {BUTTON_ORDER.map((color) => {
                    const bg =
                        gameState.mode === "inverse" ? INVERTED_BUTTON_COLORS[color] : BUTTON_COLORS[color]
                    const glow = activeButton === color ? `0 0 30px ${bg}` : `0 0 15px ${bg}80`
                    return (
                        <button
                            key={color}
                            onClick={() => handleButtonClick(color)}
                            className={cn(
                                buttonGridPositions[color],
                                "h-[var(--d)] w-[var(--d)] rotate-45 transition-all duration-200",
                                "shadow-lg hover:scale-105 active:scale-95 hover:cursor-pointer",
                                activeButton === color && "scale-110 brightness-150",
                                showSuccess && "animate-pulse",
                            )}
                            style={{ backgroundColor: bg, boxShadow: glow }}
                            disabled={!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying}
                        />
                    )
                })}
            </div>
        </div>
    )
}