import { ProgressBar } from "../ui/progress-bar.js";
import { Target } from "./target.js";

export class Furnace extends Target {
    requiredLevels;
    examineText = "A red hot furnace.";
    actions = [
        { text: "Forge", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(scene) {
        super({
            scene: scene,
            name: "Furnace",
            varName: "furnace",
            images: [
                {
                    name: "furnace",
                    path: "src/assets/sprites/Furnace.png",
                    scale: 1.5
                },
            ],
            offsetX: -20,
            drops: [],
        });

        // Add health bar to appease Target
        this.progressBar = new ProgressBar(
            this.scene,
            this.x,
            this.y - 40,
            this.neededClicks
        );
        this.progressBar.hide();
    }

    async isClickable() {
        return false;
        return true;
    }

    getClickValue() {
        return 1;
    }

    onClick(clickValue) { }

    onCompletion() { }
}
