import Tool from "./tool.js";
import { characterData } from "../../cookie-io.js";
import { CONSTANTS } from "../../constants/constants.js";

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
            className: null,
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

    async craft(item) {
        let outputString = "";
        const recipe = this.getRecipe(item.name);
        console.log("Combining", this.name, item.name);

        // Burn log if possible
        if (item.numItems >= recipe.numRequiredItems) {
            item.setNumItems(item.numItems - recipe.numRequiredItems);
            outputString = "Firemaked " + item.name + ".";
            characterData.addSkillXp({ firemaking: recipe.xpGiven });
        }
        // Insufficient materials
        else if (item.numItems < recipe.numRequiredItems) {
            outputString =
                recipe.numRequiredItems +
                " " +
                item.name +
                " are needed to firemake that that";
        } else {
            outputString = "Not a valid firemaking combination.";
        }

        // Write to chat window
        const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
        chatScene.writeText(outputString);
    }
}
