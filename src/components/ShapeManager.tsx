import { useState, useCallback, useEffect } from 'react';
import { useTick } from '@pixi/react';
import { Graphics as PixiGraphics, FederatedPointerEvent, Ticker } from 'pixi.js';
import { FallingShape } from './FallingShape';
import { SHAPE_TYPES, type ShapeData } from '../types/ShapeType';

const WIDTH = 800;
const HEIGHT = 600;

export const ShapeManager = ({ gravity, spawnRate }: { gravity: number, spawnRate: number }) => {
    const [shapes, setShapes] = useState<ShapeData[]>([]);

    const spawn = useCallback((x: number, y: number) => {
        const randomType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
        const newShape: ShapeData = {
            id: crypto.randomUUID(),
            x, y, vy: 0,
            color: Math.floor(Math.random() * 0xffffff),
            type: randomType,
        };
        setShapes((prev) => [...prev, newShape]);
    }, []);

    // Handle timed spawning based on spawnRate
    useEffect(() => {
        if (spawnRate <= 0) return;
        
        const interval = setInterval(() => {
            // Spawn at a random X at the top of the screen
            spawn(Math.random() * WIDTH, -50);
        }, 1000 / spawnRate);

        return () => clearInterval(interval);
    }, [spawnRate, spawn]);

    useTick((ticker: Ticker) => {
        setShapes((prev) =>
            prev.map((s: ShapeData) => ({
                ...s,
                vy: s.vy + gravity * ticker.deltaTime,
                y: s.y + s.vy * ticker.deltaTime,
            })).filter((s: ShapeData) => s.y < HEIGHT + 100)
        );
    });

    return (
        <pixiContainer>
            <pixiGraphics
                eventMode="static"
                onPointerDown={(e: FederatedPointerEvent) => spawn(e.global.x, e.global.y)}
                draw={(g: PixiGraphics) => {
                    g.clear().rect(0, 0, WIDTH, HEIGHT).fill(0x1a1a1a);
                }}
            />

            {shapes.map((s: ShapeData) => (
                <FallingShape
                    key={s.id}
                    {...s}
                    onPop={(id: string) => {
                        setShapes((prev) => prev.filter((sh) => sh.id !== id));
                    }}
                />
            ))}
        </pixiContainer>
    );
};