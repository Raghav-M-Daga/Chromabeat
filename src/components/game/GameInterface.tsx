import { JSX, useMemo } from "react"
import { cn } from "@/lib/utils"
type GameMode = "color" | "sound" | "combination";
type ButtonColor = "yellow" | "blue" | "green" | "red";
const MIX = {
    "red+blue": "purple-700",
    "blue+red": "purple-700",
    "red+yellow": "orange-500",
    "yellow+red": "orange-500",
    "red+green": "amber-800",
    "green+red": "amber-800",
    "blue+yellow": "green-500",
    "yellow+blue": "green-500",
    "blue+green": "cyan-500",
    "green+blue": "cyan-500",
    "yellow+green": "lime-400",
    "green+yellow": "lime-400",
} as const;
type MixKey = keyof typeof MIX;
export function combineColors(a: ButtonColor, b: ButtonColor): string {
    const key = `${a}+${b}` as MixKey;
    return MIX[key];
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
    let colorsToShow = [...BUTTON_ORDER];
    const assignedPositions = useMemo(() => {
        if (gameState.mode !== "combination") {
            return { ...buttonPositions };
        }
        const positionsList = Object.values(buttonPositions).sort(() => Math.random() - 0.5);
        const newPositions: Partial<Record<ButtonColor, string>> = {};
        BUTTON_ORDER.forEach((color, index) => {
            newPositions[color] = positionsList[index];
        });
        return newPositions;
    }, [gameState.mode, buttonPositions, BUTTON_ORDER]);
    const buttonMixes = useMemo<Record<ButtonColor, string> | null>(() => {
        if (gameState.mode !== "combination" || !gameState.centerColor || !gameState.toneColor) {
            return null;
        }
        const correctMix = combineColors(gameState.centerColor, gameState.toneColor);
        const allUniqueMixes = Array.from(new Set(Object.values(MIX)));
        const otherMixes = allUniqueMixes.filter(hex => hex !== correctMix);
        const shuffledOther = [...otherMixes].sort(() => Math.random() - 0.5);
        const wrongMixes = shuffledOther.slice(0, 3);
        const mixes: Partial<Record<ButtonColor, string>> = {};
        mixes[gameState.toneColor] = correctMix;
        const otherButtons = BUTTON_ORDER.filter(c => c !== gameState.toneColor);
        otherButtons.forEach((color, idx) => {
            mixes[color] = wrongMixes[idx]!;
        });
        return mixes as Record<ButtonColor, string>;
    }, [gameState.mode, gameState.centerColor, gameState.toneColor, BUTTON_ORDER]);
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-8">
            <div className="grid place-items-center gap-1 sm:gap-2 [grid-template-columns:repeat(3,calc(var(--d)/1.4142))] [grid-template-rows:repeat(3,calc(var(--d)/1.4142))] [--d:6rem] sm:[--d:12rem]">
                <div className="row-start-2 col-start-2 z-10 flex items-center justify-center">
                    {getCenterIcon()}
                </div>
                {colorsToShow.map((color) => {
                    let colorTail = BUTTON_COLORS[color];
                    if (buttonMixes) {
                        colorTail = buttonMixes[color];
                    } else if (gameState.mode === "combination" && gameState.centerColor) {
                        if (gameState.centerColor === color) {
                            colorTail = BUTTON_COLORS[color];
                        } else {
                            colorTail = combineColors(gameState.centerColor, color);
                        }
                    }
                    const bgClass = `bg-${colorTail}`;
                    const isActive = activeButton === color;
                    const shadowClass = isActive ? "shadow-glow-active" : "shadow-glow";
                    const opacity = isActive ? "" : "/50";
                    const textClass = `text-${colorTail}${opacity}`;
                    return (
                        <button
                            key={color}
                            onClick={() => handleButtonClick(color)}
                            className={cn(
                                assignedPositions[color],
                                "h-[var(--d)] w-[var(--d)] rotate-45 transition-all duration-150",
                                "hover:scale-105 active:scale-95 hover:cursor-pointer",
                                isActive && "scale-110 brightness-150",
                                showSuccess && "animate-pulse",
                                bgClass,
                                textClass,
                                shadowClass,
                            )}
                            disabled={!gameState.isPlayerTurn || gameState.gameOver || isDemoPlaying}
                        />
                    );
                })}
            </div>
        </div>
    );
}