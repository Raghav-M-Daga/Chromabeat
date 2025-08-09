import { JSX } from "react"
import { cn } from "@/lib/utils"

type GameMode = "color" | "sound" | "combination";
type ButtonColor = "yellow" | "blue" | "green" | "red";

const MIX: Record<`${ButtonColor}+${ButtonColor}`, string> = {
    "yellow+yellow": "#FFD500",
    "blue+blue": "#0074D9",
    "green+green": "#2ECC40",
    "red+red": "#FF4136",

    "red+blue": "#8E44AD",
    "blue+red": "#8E44AD",
    "red+yellow": "#FF8B26",
    "yellow+red": "#FF8B26",
    "red+green": "#8B5E3C",
    "green+red": "#8B5E3C",

    "blue+yellow": "#2ECC40",
    "yellow+blue": "#2ECC40",
    "blue+green": "#00BEC9",
    "green+blue": "#00BEC9",

    "yellow+green": "#A3E635",
    "green+yellow": "#A3E635",
};

export function combineColorsHex(a: ButtonColor, b: ButtonColor): string {
    return MIX[`${a}+${b}`];
}

interface GameSlice {
    mode: GameMode;
    isPlayerTurn: boolean;
    gameOver: boolean;
    centerColor: ButtonColor | null;
    toneColor: ButtonColor | null;
}

interface GameInterfaceProps {
    BUTTON_ORDER: ButtonColor[];
    gameState: GameSlice;
    COMBINATION_BUTTON_COLORS: Record<ButtonColor, string>;
    BUTTON_COLORS: Record<ButtonColor, string>;
    handleButtonClick: (color: ButtonColor) => void;
    getCenterIcon: () => JSX.Element | null;
    activeButton: ButtonColor | null;
    showSuccess: boolean;
    isDemoPlaying: boolean;
    buttonPositions: Record<ButtonColor, string>;
}

export default function GameInterface({
    BUTTON_ORDER,
    gameState,
    BUTTON_COLORS,
    handleButtonClick,
    getCenterIcon,
    activeButton,
    showSuccess,
    isDemoPlaying,
    buttonPositions,
}: GameInterfaceProps) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-8">
            <div className="grid place-items-center gap-1 sm:gap-2 [grid-template-columns:repeat(3,calc(var(--d)/1.4142))] [grid-template-rows:repeat(3,calc(var(--d)/1.4142))] [--d:6rem] sm:[--d:12rem]">
                <div className="row-start-2 col-start-2 z-10 flex items-center justify-center">
                    {getCenterIcon()}
                </div>

                {BUTTON_ORDER.map((color) => {
                    let bg = BUTTON_COLORS[color];

                    if (gameState.mode === "combination" && gameState.centerColor) {
                        bg = combineColorsHex(gameState.centerColor, color);
                    }

                    const glow = activeButton === color ? `0 0 30px ${bg}` : `0 0 15px ${bg}80`;

                    return (
                        <button
                            key={color}
                            onClick={() => handleButtonClick(color)}
                            className={cn(
                                buttonPositions[color],
                                "h-[var(--d)] w-[var(--d)] rotate-45 transition-all duration-200",
                                "shadow-lg hover:scale-105 active:scale-95 hover:cursor-pointer",
                                activeButton === color && "scale-110 brightness-150",
                                showSuccess && "animate-pulse",
                            )}
                            style={{ backgroundColor: bg, boxShadow: glow }}
                            disabled={!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying}
                        />
                    );
                })}
            </div>
        </div>
    );
}