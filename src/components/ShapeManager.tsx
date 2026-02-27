import { useCallback, useEffect } from 'react';
import { useTick } from '@pixi/react';
import { Graphics as PixiGraphics, FederatedPointerEvent, Ticker } from 'pixi.js';
import { FallingShape } from './FallingShape';
import { SHAPE_TYPES } from '../types/ShapeType';
import { useShapeStore } from '../store/useShapeStore';
import popSoundFile from '../assets/sounds/mixkit-game-ball-tap-2073.wav';


const WIDTH = 800;
const HEIGHT = 600;
const popSound = new Audio(popSoundFile);

export const ShapeManager = ({ gravity, spawnRate }: { gravity: number, spawnRate: number }) => {
    const { shapes, addShape, removeShape, tick } = useShapeStore();

    const spawn = useCallback((x: number, y: number, playSound = false) => {
        if (playSound) {
            popSound.currentTime = 0; // Скидаємо в початок, щоб можна було "спамити" кліками
            popSound.play().catch(e => console.error("Audio play failed:", e));
        }

        const randomType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
        addShape({
            id: crypto.randomUUID(),
            x,
            y,
            vy: 0,
            width: 50,
            height: 50,
            color: Math.floor(Math.random() * 0xffffff),
            type: randomType,
        });
    }, [addShape]);

    useEffect(() => {
        if (spawnRate <= 0) return;
        const interval = setInterval(() => spawn(Math.random() * WIDTH, -50), 1000 / spawnRate);
        return () => clearInterval(interval);
    }, [spawnRate, spawn]);

    // Simple, clean physics call
    useTick((ticker: Ticker) => {
        tick(gravity, ticker.deltaTime, HEIGHT);
    });

    return (
        <pixiContainer>
            <pixiGraphics
                eventMode="static"
                onPointerDown={(e: FederatedPointerEvent) => spawn(e.global.x, e.global.y, true)}
                draw={(g: PixiGraphics) => {
                    g.clear().rect(0, 0, WIDTH, HEIGHT).fill(0x1a1a1a);
                }}
            />
            {shapes.map((s) => (
                <FallingShape key={s.id} {...s} onPop={removeShape} />
            ))}
        </pixiContainer>
    );
};