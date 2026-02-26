import { Assets, Texture, Sprite as PixiSprite, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

export const BunnySprite: FC = () => {
    const spriteRef = useRef<PixiSprite>(null);
    const [texture, setTexture] = useState<Texture>(Texture.EMPTY);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        Assets.load<Texture>('https://pixijs.com/assets/bunny.png')
            .then((result) => setTexture(result));
    }, []);

    return (

        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode="static"
            onClick = {(e: FederatedPointerEvent) => setIsActive(!isActive)}
            scale={isActive ? 1 : 1.5}
            texture={texture}
            x={100}
            y={100}
        />
    );
};