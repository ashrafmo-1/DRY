import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const ComparisonSlider = ({afterWrok, beforeWrok}: {afterWrok: string, beforeWrok: string}) => {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
        <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] select-none rounded bg-neutral-900 border border-white/10 shrink-0">
            <img
                src={afterWrok}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover rounded pointer-events-none select-none"
                draggable={false}
            />

            <img
                src={beforeWrok}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover rounded pointer-events-none select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                draggable={false}
            />

            <div
                className="absolute inset-y-0 w-[2px] bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 1px)` }}
            >
                <div className="absolute w-8 h-8 rounded-full border border-white bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <ChevronLeft className="w-4 h-4 text-white -mr-0.5" />
                    <ChevronRight className="w-4 h-4 text-white -ml-0.5" />
                </div>
            </div>

            <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
            />
        </div>
    )
}
