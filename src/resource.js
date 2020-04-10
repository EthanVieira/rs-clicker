import { ProgressBar } from "./ui/progress-bar.js";
import { CONSTANTS, calcLevel } from "./constants/constants.js"; 
import { Target } from "./target.js";

export class Resource extends Target {
    skill;
    
    constructor(data) {
        super(data);
        
        this.skill = data.skill;

        // Add health bar
        this.progressBar = new ProgressBar(data.scene, data.x, data.y - 40, data.neededClicks);
    }
    
    getClickValue() {
        return calcLevel(this.characterData.skills[this.skill]);
    }
    
    onClick(clickValue) {
        // Increase skill xp
        this.characterData.skills[this.skill] += clickValue;
    }
    
    onCompletion() {}
}
