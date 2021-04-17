import { Resource } from "../resource.js";
import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel, getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

export class Tree extends Resource {
    requiredWCLevel;
    actions = [
        { text: "Chop", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "woodcutting";
        super(data);
        this.requiredWCLevel = data.requiredWCLevel;
    }

    isClickable() {
        let curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        let inventory = this.scene.dashboard.inventory;
        let chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        let i = inventory.getKeywordInInventory("Axe");
        let wcLevel = calcLevel(characterData.getSkillXp("woodcutting"));
        let canUseAxe = false;

        if (curWeapon.item == "Axe") {
            canUseAxe = wcLevel >= curWeapon.requiredWCLevel;
        } else if (i != -1) {
            canUseAxe =
                wcLevel >=
                getItemClass(characterData.getInventory()[i].item, this.scene)
                    .requiredWCLevel;
        } else {
            chat.writeText("This action requires an axe.");
            return false;
        }

        // Currently a small bug here that will not let you woodcut if the axe you
        // are unable to use is higher in the inventory than another axe that you can use
        if (canUseAxe) {
            if (wcLevel >= this.requiredWCLevel) {
                return true;
            } else {
                chat.writeText(
                    "You do not have the required Woodcutting level to chop this tree."
                );
                return false;
            }
        } else {
            chat.writeText(
                "You do not have the required Woodcutting level to use this axe."
            );
            return false;
        }
    }
}
