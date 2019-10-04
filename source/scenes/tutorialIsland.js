import { CONSTANTS } from "../constants.js";
import { Level } from "../level.js";

export class TutorialIsland extends Level{
    constructor() {
        super({
            key: CONSTANTS.SCENES.TUTORIALISLAND,
            killQuest: 10,
            background: { name: 'tutorialIsland', path: 'source/assets/Tutorial_Island_Mine.png' },
            minimap: { name: 'tutorialIslandMap', path: 'source/assets/TutorialIslandMap.png'},
            enemy: {
                name: 'rat', 
                path: 'source/assets/sprites/Giant_rat.png',
                maxHealth: 5,
                killGold: 1 
            }
        })
    }
}