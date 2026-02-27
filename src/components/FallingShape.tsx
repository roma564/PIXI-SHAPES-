import { useCallback } from 'react';
import type { FC } from 'react';
import { Graphics as PixiGraphics, FederatedPointerEvent } from 'pixi.js';

interface FallingShapeProps {
    id: string;      
    x: number;
    y: number;
    color: number;
    type: string; // Receive the random type here
    onPop: (id: string) => void; 
}

export const FallingShape: FC<FallingShapeProps> = ({ id, x, y, color, type, onPop }) => {
    const draw = useCallback((g: PixiGraphics) => {
        g.clear();
        
        const size = 30;

        switch (type) {
            case 'triangle':
                g.poly([0, -size, size, size, -size, size]);
                break;
            case 'square':
                g.rect(-size, -size, size * 2, size * 2);
                break;
            case 'pentagon':
                g.star(0, 0, 5, size); // 5 sides
                break;
            case 'hexagon':
                g.star(0, 0, 6, size); // 6 sides
                break;
            case 'ellipse':
                g.ellipse(0, 0, size * 1.5, size);
                break;
            case 'star':
                g.star(0, 0, 5, size, size / 2); // Classic 5-point star
                break;
            case 'circle':
            default:
                g.circle(0, 0, size);
                break;
        }

        g.fill(color);
    }, [color, type]);

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