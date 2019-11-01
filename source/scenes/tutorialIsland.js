import { CONSTANTS } from "../constants.js";
import { enemyLevel } from "../enemyLevel.js";

export class TutorialIsland extends enemyLevel{
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
            ],
            audio: {bgm: 'newbieMelody'}
        })
    }
}