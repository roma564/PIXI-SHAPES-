import { useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Text } from 'pixi.js';
import { ShapeManager } from './components/ShapeManager';

extend({ Container, Graphics, Text });

export default function App() {
    const [gravity, setGravity] = useState(0.5);
    const [spawnRate, setSpawnRate] = useState(1); // shapes per second

    return (
        <div className="relative w-200 h-150 mx-auto mt-10 font-sans">
            {/* PIXI CANVAS */}
            <Application background="#1a1a1a" width={800} height={600}>
                <ShapeManager gravity={gravity} spawnRate={spawnRate} />
            </Application>

            {/* HTML UI CONTROLS (Floating at the bottom) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8 pointer-events-none">
                <div className="flex items-center gap-3 bg-black/80 p-3 rounded-lg border border-white/20 pointer-events-auto text-white">
                    <span className="text-xs uppercase opacity-50">Gravity</span>
                    <button onClick={() => setGravity(g => Math.max(0, g - 0.1))} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded">-</button>
                    <span className="w-8 text-center font-mono">{gravity.toFixed(1)}</span>
                    <button onClick={() => setGravity(g => g + 0.1)} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded">+</button>
                </div>

                <div className="flex items-center gap-3 bg-black/80 p-3 rounded-lg border border-white/20 pointer-events-auto text-white">
                    <span className="text-xs uppercase opacity-50">Spawn Rate</span>
                    <button onClick={() => setSpawnRate(r => Math.max(0, r - 1))} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded">-</button>
                    <span className="w-8 text-center font-mono">{spawnRate}/s</span>
                    <button onClick={() => setSpawnRate(r => r + 1)} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded">+</button>
                </div>
            </div>
        </div>
    );
}