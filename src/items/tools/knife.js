import Tool from "../tool.js";
import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

export default class Knife extends Tool {
    // Item data
    name = "Knife";
    item = "Knife";
    examineText = "A dangerous looking knife.";
    cost = 6;
    
    // Scenes
    scene;
    dashboard;
    chat;

    constructor(scene) {
        super();
        this.scene = scene;
    }

    async craft(item) {
        if (this.chat == undefined) {
            this.chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        }

        console.log("Combining", this.name, item.name);
        let className = "";
        let numRequiredItems = 0;
        let xpGiven = 0;
        let outputString = "";
        switch (item.name) {
            case "Logs":
                className = "NormalShortbow";
                numRequiredItems = 50;
                xpGiven = 250;
                break;
            case "Oak Logs":
                className = "OakShortbow";
                numRequiredItems = 50;
                xpGiven = 500;
                break;
            default:
                outputString = "Not a valid crafting combination.";
                break;
        }

        // Craft item if possible
        if (className != "" && item.numItems >= numRequiredItems) {
            if (this.dashboard == undefined) {
                this.dashboard = this.scene.scene.get(CONSTANTS.SCENES.DASHBOARD);
            }

            let newItem = await getItemClass(className, this.dashboard);
            if (this.dashboard.inventory.obj.addToInventory(newItem)) {
                item.setNumItems(item.numItems - numRequiredItems);
                characterData.addSkillXp("fletching", xpGiven);

                outputString = "Crafted " + item.name + ", added " + xpGiven + "xp";
            }
        }
        // Insufficient materials 
        else if (className != "" && item.numItems < numRequiredItems) {
            outputString = numRequiredItems + " " + item.name + " are needed to craft that";
        }

        // Write to chat window
        this.chat.writeText(outputString);
        console.log(outputString);
    }
}
