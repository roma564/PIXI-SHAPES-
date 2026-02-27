import { useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Text } from 'pixi.js';
import { ShapeManager } from './components/ShapeManager';
import { useShapeStore } from './store/useShapeStore'; // Import your store

extend({ Container, Graphics, Text });

export default function App() {
    const [gravity, setGravity] = useState(0.5);
    const [spawnRate, setSpawnRate] = useState(1);

    // 1. Subscribe to the store data
    const shapesCount = useShapeStore((state) => state.shapes.length);
    const totalArea = useShapeStore((state) => state.getTotalArea());

    return (
        <div className="relative w-[800px] h-[600px] mx-auto mt-10 font-sans select-none overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            
        
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                {/* Shape Count Field */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-md min-w-[140px]">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Shapes</p>
                    <p className="text-2xl font-mono text-white leading-none">{shapesCount}</p>
                </div>

                {/* Surface Area Field */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-md min-w-[140px]">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Surface Area</p>
                    <p className="text-2xl font-mono text-emerald-400 leading-none">
                        {Math.round(totalArea).toLocaleString()}
                        <span className="text-[10px] ml-1 opacity-50 text-white font-sans">px²</span>
                    </p>
                </div>
            </div>

            {/* PIXI CANVAS */}
            <Application background="#1a1a1a" width={800} height={600}>
                <ShapeManager gravity={gravity} spawnRate={spawnRate} />
            </Application>

            {/* HTML UI CONTROLS (Floating at the bottom) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8 pointer-events-none">
                <div className="flex items-center gap-3 bg-black/80 p-3 rounded-lg border border-white/20 pointer-events-auto text-white">
                    <span className="text-xs uppercase opacity-50">Gravity</span>
                    <button onClick={() => setGravity(g => Math.max(0, g - 0.1))} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-xl font-bold">-</button>
                    <span className="w-8 text-center font-mono">{gravity.toFixed(1)}</span>
                    <button onClick={() => setGravity(g => g + 0.1)} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-xl font-bold">+</button>
                </div>

                <div className="flex items-center gap-3 bg-black/80 p-3 rounded-lg border border-white/20 pointer-events-auto text-white">
                    <span className="text-xs uppercase opacity-50">Spawn Rate</span>
                    <button onClick={() => setSpawnRate(r => Math.max(0, r - 1))} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-xl font-bold">-</button>
                    <span className="w-8 text-center font-mono">{spawnRate}/s</span>
                    <button onClick={() => setSpawnRate(r => r + 1)} className="w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-xl font-bold">+</button>
                </div>
            </div>
        </div>
    );
}