import { CONSTANTS } from "../constants.js";
import { Level } from "../level.js";

export class Lumbridge extends Level{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE,
            killQuest: 10,
            background: { name: 'lumbridge', path: 'source/assets/LumbridgeBackground.jpg' },
            minimap: { name: 'lumbridgeMap', path: 'source/assets/LumbridgeMap.png'},
            enemies: [
                {
                    name: 'cow', 
                    path: 'source/assets/sprites/cow.png',
                    maxHealth: 8,
                    killGold: 5 
                },
                {
                    name: 'rat', 
                    path: 'source/assets/sprites/GiantRat.png',
                    maxHealth: 5,
                    killGold: 1 
                },
            ]
        })
    }
}