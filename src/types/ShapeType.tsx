export type ShapeType = 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'circle' | 'ellipse' | 'star';

export interface ShapeData {
    id: string;
    x: number;
    y: number;
    vy: number;
    color: number;
    type: ShapeType;
}

export const SHAPE_TYPES: ShapeType[] = [
    'triangle', 
    'square', 
    'pentagon', 
    'hexagon', 
    'circle', 
    'ellipse', 
    'star'
];
