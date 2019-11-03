import { CONSTANTS } from "../constants.js";
import { ResourceLevel } from "../resourceLevel.js";

export class LumbridgeTree extends ResourceLevel{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
            background: { name: 'lumbridge', path: 'source/assets/LumbridgeBackground.jpg' },
            minimap: { name: 'lumbridgeMap', path: 'source/assets/LumbridgeMap.png'},
            clickObjects: [
                {
                    name: 'tree1', 
                    path: 'source/assets/sprites/tree1.webp',
                    neededClicks: 5,
                },
                {
                    name: 'tree2', 
                    path: 'source/assets/sprites/tree2.webp',
                    neededClicks: 5,
                },
            ],
            resourceType:   CONSTANTS.RESOURCES.WOOD,
            audio: {bgm: 'harmony'}
        })
    }
}