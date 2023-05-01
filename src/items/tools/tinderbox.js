import Tool from "./tool.js";

export default class Tinderbox extends Tool {
    // Item data
    name = "Tinderbox";
    item = "Tinderbox";
    examineText = "Useful for lighting a fire.";
    cost = 1;

    // Scenes
    scene;

    constructor(scene) {
        super();
        this.scene = scene;
    }

    getRecipe(itemName) {
        let output = {
            className: "",
            numRequiredItems: 0,
            xpGiven: 0,
        };

        switch (itemName) {
            case "Logs":
                output.numRequiredItems = 1;
                output.xpGiven = 40;
                break;
            case "Oak Logs":
                output.numRequiredItems = 1;
                output.xpGiven = 60;
                break;
        }

        return output;
    }
}
