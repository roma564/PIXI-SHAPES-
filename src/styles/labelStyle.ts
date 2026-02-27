import { TextStyle } from "pixi.js";


export const labelStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    fill: '#ffffff',
    stroke: { color: '#000000', width: 4 },
    dropShadow: { color: '#000000', blur: 4, distance: 2 },
});
