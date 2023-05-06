import Tool from "./tool.js";
import { getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";
import { CONSTANTS } from "../../constants/constants.js";

export default class Knife extends Tool {
    // Item data
    name = "Knife";
    item = "Knife";
    examineText = "A dangerous looking knife.";
    cost = 6;

    // Scenes
    scene;

    constructor(scene) {
        super();
        this.scene = scene;
    }

    getRecipe(itemName) {
        const output = {
            className: "",
            numRequiredItems: 0,
            xpGiven: 0,
        };

        switch (itemName) {
            case "Logs":
                output.className = "NormalShortbow";
                output.numRequiredItems = 50;
                output.xpGiven = 250;
                break;
            case "Oak Logs":
                output.className = "OakShortbow";
                output.numRequiredItems = 50;
                output.xpGiven = 500;
                break;
        }

        return output;
    }

    async craft(item) {
        let outputString = "";
        const recipe = this.getRecipe(item.name);
        console.log("Combining", this.name, item.name);

        // Fletch item if possible
        if (item.numItems >= recipe.numRequiredItems) {
            const dashboard = characterData.getScene(CONSTANTS.SCENES.DASHBOARD);

            if (recipe.className) {
                const newItem = await getItemClass(recipe.className, dashboard);

                // Get name before adding it to inventory because
                // if it's a duplicate it will be destroyed
                const newItemName = newItem.name;

                // Item was added
                if (dashboard.inventory.addToInventory(newItem)) {
                    item.setNumItems(item.numItems - recipe.numRequiredItems);

                    outputString = "Fletched " + newItemName + ".";
                    characterData.addSkillXp({ fletching: recipe.xpGiven });
                } else {
                    outputString = "There is insufficient inventory space to fletch that.";
                }
            }
            // Insufficient materials
            else if (item.numItems < recipe.numRequiredItems) {
                outputString =
                    recipe.numRequiredItems +
                    " " +
                    item.name +
                    " are needed to fletch that";
            }
        } else {
            outputString = "Not a valid fletching combination.";
        }

        // Write to chat window
        const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
        chatScene.writeText(outputString);
    }
}
