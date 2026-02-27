import { create } from 'zustand';

// Define the shape structure
export interface Shape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
}

interface ShapeState {
  shapes: Shape[];

  addShape: (shape: Shape) => void;
  removeShape: (id: string) => void;
  clearShapes: () => void;
 
  getTotalArea: () => number;
}

export const useShapeStore = create<ShapeState>((set, get) => ({
  shapes: [],

  addShape: (shape) => 
    set((state) => ({ shapes: [...state.shapes, shape] })),

  removeShape: (id) => 
    set((state) => ({ shapes: state.shapes.filter((s) => s.id !== id) })),

  clearShapes: () => 
    set({ shapes: [] }),

  getTotalArea: () => {
    const shapes = get().shapes;
    return shapes.reduce((acc, shape) => acc + (shape.width * shape.height), 0);
  },
}));