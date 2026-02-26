import { useCallback } from 'react';
import type { FC } from 'react';
import { Graphics as PixiGraphics, FederatedPointerEvent } from 'pixi.js';


interface FallingShapeProps {
    id: string;      
    x: number;
    y: number;
    color: number;
    onPop: (id: string) => void; 
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
                onPop(id);
            }}
        />
    );
};