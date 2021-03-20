import { Item } from "./item.js";
import { getItemClass } from "../utilities.js";
import { characterData } from "../cookie-io.js";
import { CONSTANTS } from "../constants/constants.js";

export default class Tool extends Item {
    canCraft = true;

    constructor() {
        super();
    }

    leftClick() {
        this.use();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }

    async craft(item) {
        let outputString = "";
        const recipe = this.getRecipe(item.name);
        console.log("Combining", this.name, item.name);

        // Craft item if possible
        if (recipe.className != "" && item.numItems >= recipe.numRequiredItems) {
            const dashboard = characterData.getScene(CONSTANTS.SCENES.DASHBOARD);
            let newItem = await getItemClass(recipe.className, dashboard);

            // Get name before adding it to inventory because 
            // if it's a duplicate it will be destroyed
            const newItemName = newItem.name;   

            // Item was added
            if (dashboard.inventory.obj.addToInventory(newItem)) {
                item.setNumItems(item.numItems - recipe.numRequiredItems);

                outputString = "Crafted " + newItemName + ", added " + recipe.xpGiven + "xp";
                characterData.addSkillXp("fletching", recipe.xpGiven);
            }
        }
        // Insufficient materials 
        else if (recipe.className != "" && item.numItems < recipe.numRequiredItems) {
            outputString = recipe.numRequiredItems + " " + item.name + " are needed to craft that";
        }
        // Invalid selection
        else {
            outputString = "Not a valid crafting combination.";
        }

        // Write to chat window
        const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
        chatScene.writeText(outputString);
    }
}
