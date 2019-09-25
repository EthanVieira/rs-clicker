import { CONSTANTS } from "../constants.js";
import { Level } from "../level.js";

export class Lumbridge extends Level{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE,
            killQuest: 10,
            background: { name: 'lumbridge', path: 'source/assets/lumbridgeBackground.jpg' },
            enemy: {
                name: 'cow', 
                path: 'source/assets/sprites/cow.png',
                maxHealth: 20,
                killGold: 5 
            }
        })
    }
}