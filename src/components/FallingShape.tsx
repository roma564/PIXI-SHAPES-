import { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { Graphics as PixiGraphics, FederatedPointerEvent, TextStyle, Application } from 'pixi.js';
import { labelStyle } from '../styles/labelStyle';



interface FallingShapeProps {
    id: string;      
    x: number;
    y: number;
    color: number;
    type: string; 
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
                g.star(0, 0, 5, size);
                break;
            case 'hexagon':
                g.star(0, 0, 6, size);
                break;
            case 'ellipse':
                g.ellipse(0, 0, size * 1.5, size);
                break;
            case 'star':
                g.star(0, 0, 5, size, size / 2);
                break;
            case 'circle':
            default:
                g.circle(0, 0, size);
                break;
        }
        g.fill(color);
    }, [color, type]);

    return (
        <pixiContainer x={x} y={y}>
            {/* The Shape Itself */}
            <pixiGraphics
                draw={draw}
                eventMode="static"
                cursor="pointer"
                onPointerDown={(e: FederatedPointerEvent) => {
                    e.stopPropagation();
                    onPop(id);
                }}
            />

            {/* Label attached to the shape (shows its type) */}
            <pixiText 
                text={type.toUpperCase()} 
                style={labelStyle} 
                anchor={0.5} // Centers the text
                y={70}       // Positions it slightly below the shape
            />
            
        </pixiContainer>
    );
};