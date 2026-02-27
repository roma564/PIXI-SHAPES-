import { create } from 'zustand';

export interface Shape {
  id: string;
  x: number;
  y: number;
  vy: number;      
  width: number;
  height: number;
  color: number;
  type: string;    
}

interface ShapeState {
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  removeShape: (id: string) => void;
  clearShapes: () => void;
  // Added a dedicated tick function to keep logic clean
  tick: (gravity: number, deltaTime: number, height: number) => void;
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

  tick: (gravity, deltaTime, height) => {
    set((state) => ({
      shapes: state.shapes
        .map((s) => {
          const nextVy = s.vy + gravity * deltaTime;
          return {
            ...s,
            vy: nextVy,
            y: s.y + nextVy * deltaTime,
          };
        })
        .filter((s) => s.y < height + 100) // Auto-cleanup
    }));
  },

  getTotalArea: () => {
    const shapes = get().shapes;

    return shapes.reduce((acc, shape) => acc + (shape.width * shape.height), 0);
  },
}));