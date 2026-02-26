import { Application, extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';
import { ShapeManager } from './components/ShapeManager';

extend({ Container, Graphics });

export default function App() {
    return (
        <Application background="#1a1a1a" width={800} height={600}>
            <ShapeManager />
        </Application>
    );
}