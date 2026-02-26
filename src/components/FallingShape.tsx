import { useCallback } from 'react';
import type { FC } from 'react';
import { Graphics as PixiGraphics, FederatedPointerEvent } from 'pixi.js';

// 1. Define the interface with ALL the props you are passing
interface FallingShapeProps {
    id: string;      // The error said 'id' was missing here
    x: number;
    y: number;
    color: number;
    onPop: (id: string) => void; // The error said 'onPop' was missing here
}

export const FallingShape: FC<FallingShapeProps> = ({ id, x, y, color, onPop }) => {
    const draw = useCallback((g: PixiGraphics) => {
        g.clear().beginFill(color).drawCircle(0, 0, 30).endFill();
    }, [color]);

    return (
        <pixiGraphics
            x={x}
            y={y}
            draw={draw}
            eventMode="static"
            cursor="pointer"
            onPointerDown={(e: FederatedPointerEvent) => {
                e.stopPropagation();
                onPop(id); // Now TS knows what 'id' and 'onPop' are!
            }}
        />
    );
};