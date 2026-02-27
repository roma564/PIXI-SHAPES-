## PixiJS v8 + React: Falling Shapes Simulation

An interactive, high-performance physics simulation built with **PixiJS v8** and **React 18/19**. This project demonstrates modular rendering, real-time state synchronization between HTML and Canvas, and advanced usage of the `@pixi/react` bridge.

---

### 🚀 Key Features

* **PixiJS v8 Engine:** Leverages the latest modular architecture of PixiJS for ultra-fast WebGL/WebGPU rendering.
* **Dynamic Physics:** Interactive gravity simulation where shapes accelerate based on real-time adjustable values.
* **Interactive UI:**
* **Auto-Spawn:** Adjustable generation frequency (Shapes per second).
* **Gravity Control:** Dynamic manipulation of the simulation's downward force.
* **Manual Spawning:** Click/Tap anywhere on the stage to spawn a shape at that specific coordinate.
* **Interaction:** Click any falling shape to "pop" it and remove it from the simulation.


* **Stats Tracking:** Real-time calculation of total active shapes and total surface area (in pixels²).
* **DevTools Ready:** Integrated hook to expose the PIXI application to the **PixiJS DevTools** browser extension.

---

### 🛠️ Technical Stack

* **Framework:** React 19 / Vite
* **Rendering:** [PixiJS v8](https://pixijs.com/)
* **React Bridge:** `@pixi/react` (v8.x)
* **Styling:** Tailwind CSS (for HTML Overlays)
* **Language:** TypeScript

---

### 📂 Project Structure

* **`App.tsx`**: The root component containing the `<Application />` provider and HTML UI overlays.
* **`ShapeManager.tsx`**: The logic hub. Manages the physics loop via `useTick`, handles state for all active shapes, and coordinates the spawning logic.
* **`FallingShape.tsx`**: A memoized sub-component that renders individual `pixiGraphics` and `pixiText` labels.
* **`ShapeType.ts`**: Contains types, shape definitions (triangle, square, pentagon, etc.), and the area calculation formulas.
  
---

### 📦 State Management (Zustand)

The project uses **Zustand** as the central "Source of Truth," bridging the gap between the React UI and the PixiJS rendering loop.

* **Decoupled Logic:** Physics calculations (gravity, velocity) and shape management are handled in a global store (`useGameStore.ts`), keeping components clean and performant.
* **High Performance:** The PixiJS Ticker triggers store actions 60 times per second, ensuring smooth 60 FPS movement without the overhead of React prop drilling.
* **Unified Control:** Both the HTML/Tailwind buttons and the Canvas click events interact with the same state, ensuring the UI and simulation are always in sync.

**Key Store Actions:**

* `addShape(x, y)`: Spawns a new shape with random geometry.
* `updatePhysics(dt)`: The "heartbeat" that updates positions every frame.
* `removeShape(id)`: Handles shape "popping" on interaction.

---

### ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/roma564/PIXI-SHAPES-.git
cd PIXI-SHAPES

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```



---

### 💡 Implementation Notes

#### The `extend` API

In PixiJS v8, components must be explicitly registered to be used as JSX tags.

```typescript
import { extend } from '@pixi/react';
import { Container, Graphics, Text } from 'pixi.js';

extend({ Container, Graphics, Text });
// Now you can use <pixiContainer />, <pixiGraphics />, etc.

```

#### Gravity & Ticker

The simulation uses the PixiJS Ticker via the `useTick` hook to ensure frame-rate independent movement:


$$v_y = v_y + (gravity \times ticker.deltaTime)$$

$$y = y + (v_y \times ticker.deltaTime)$$


