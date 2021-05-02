import Tool from "./tool.js";

export default class Hammer extends Tool {
    // Item data
    name = "Hammer";
    item = "Hammer";
    examineText = "Good for hitting things!";
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
            requires: "",
        };

        switch (itemName) {
            case "Bronze Bar":
            case "Iron Bar":
            case "Steel Bar":
                output.requires = "Anvil";
                break;
        }

        return output;
    }
}
