import { useState, useCallback } from 'react';
import { useTick } from '@pixi/react';
import { Graphics as PixiGraphics, FederatedPointerEvent, Ticker } from 'pixi.js';
import { FallingShape } from './FallingShape';

// 1. Define the interface for our state objects
export interface ShapeData {
    id: string;
    x: number;
    y: number;
    vy: number;
    color: number;
}

const GRAVITY = 0.5;
const WIDTH = 800;
const HEIGHT = 600;

export const ShapeManager = () => {
    // 2. Explicitly type the state as an array of ShapeData
    const [shapes, setShapes] = useState<ShapeData[]>([]);

    // Function to spawn a shape at specific coordinates
    const spawn = useCallback((x: number, y: number) => {
        const newShape: ShapeData = {
            id: crypto.randomUUID(),
            x,
            y,
            vy: 0,
            color: Math.floor(Math.random() * 0xffffff),
        };
        setShapes((prev) => [...prev, newShape]);
    }, []);

    // 3. The Animation Loop (v8 Ticker)
    
    useTick((ticker: Ticker) => {
        setShapes((prev) =>
            prev
                .map((s: ShapeData) => ({
                    ...s,
                    vy: s.vy + GRAVITY * ticker.deltaTime,
                    y: s.y + s.vy * ticker.deltaTime,
                }))
                // Remove shapes that fall 100px past the bottom
                .filter((s: ShapeData) => s.y < HEIGHT + 100)
        );
    });

    return (
        <pixiContainer>
            {/* Background Layer: Catch clicks to spawn new shapes */}
            <pixiGraphics
                eventMode="static"
                onPointerDown={(e: FederatedPointerEvent) => spawn(e.global.x, e.global.y)}
                draw={(g: PixiGraphics) => {
                    g.clear()
                        .beginFill(0x1a1a1a) // Dark background
                        .drawRect(0, 0, WIDTH, HEIGHT)
                        .endFill();
                }}
            />

            {/* Render the list of falling shapes */}
            {shapes.map((s: ShapeData) => (
                <FallingShape
                    key={s.id}
                    id={s.id}
                    x={s.x}
                    y={s.y}
                    color={s.color}
                    // Explicitly type the id in the callback
                    onPop={(id: string) => {
                        setShapes((prev) => prev.filter((sh: ShapeData) => sh.id !== id));
                    }}
                />
            ))}
        </pixiContainer>
    );
};