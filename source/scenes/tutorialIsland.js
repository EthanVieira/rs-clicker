import { CONSTANTS } from "../constants.js";
import { Level } from "../level.js";

export class TutorialIsland extends Level{
    constructor() {
        super({
            key: CONSTANTS.SCENES.TUTORIAL_ISLAND,
            killQuest: 10,
            background: { name: 'tutorialIsland', path: 'source/assets/TutorialIslandBackground.png' },
            minimap: { name: 'tutorialIslandMap', path: 'source/assets/TutorialIslandMap.png'},
            enemies: [
                {
                    name: 'rat', 
                    path: 'source/assets/sprites/GiantRat.png',
                    maxHealth: 5,
                    killGold: 1 
                }
            ]
        })
    }
}