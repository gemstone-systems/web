import { useMemo } from "react";

const SPACING = 64;
const DOT_SIZE = 6;
const COLS = 80;
const ROWS = 50;

export const DriftingCirclesBackground = () => {
    const dots = useMemo(() => {
        const positions: Array<{ x: number; y: number; key: number }> = [];
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const jitterX = ((col * 7 + row * 13) % 17) - 8;
                const jitterY = ((col * 11 + row * 3) % 19) - 9;
                positions.push({
                    x: col * SPACING + jitterX,
                    y: row * SPACING + jitterY,
                    key: row * COLS + col,
                });
            }
        }
        return positions;
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div
                className="animate-drift"
                style={{
                    width: COLS * SPACING,
                    height: ROWS * SPACING,
                    position: "relative",
                }}
            >
                {dots.map((dot) => (
                    <div
                        key={dot.key}
                        className="bg-surface1 pointer-events-auto absolute rounded-full opacity-20 transition-transform duration-200 hover:scale-[0.3]"
                        style={{
                            left: dot.x,
                            top: dot.y,
                            width: DOT_SIZE,
                            height: DOT_SIZE,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
