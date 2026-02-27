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

export const getShapeArea = (type: ShapeType): number => {
    const s = 30;
    switch (type) {
        case 'circle':   return Math.PI * s * s;           // πr²
        case 'square':   return (s * 2) * (s * 2);         // (2s)²
        case 'triangle': return (Math.sqrt(3) / 4) * (s * 2)**2; // Equilateral
        case 'ellipse':  return Math.PI * (s * 1.5) * s;   // πab
        case 'pentagon': return 2.377 * s * s;             // Approx for regular pentagon
        case 'hexagon':  return 2.598 * s * s;             // Approx for regular hexagon
        case 'star':     return 1000;                      // Estimated average
        default: return 0;
    }
};
