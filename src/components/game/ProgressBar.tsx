import { RefObject } from "react"

export default function ProgressBar({ progressRef }: { progressRef: RefObject<HTMLDivElement> }) {
    return (
        <div className="absolute top-12 left-0 right-0 z-10 px-4">
            <div className="max-w-md mx-auto h-1 rounded-full bg-white/20 overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full rounded-full bg-white"
                    style={{ width: "0%" }}
                />
            </div>
        </div>
    )
}