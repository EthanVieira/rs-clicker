import { Resource } from "../resource.js";
import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel, getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

export class Rock extends Resource {
    requiredMiningLevel;
    actions = [
        { text: "Mine", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "mining";
        super(data);
        this.requiredMiningLevel = data.requiredMiningLevel;
    }

    isClickable() {
        let curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        let inventory = this.scene.dashboard.inventory;
        let chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        let i = inventory.getKeywordInInventory("Pickaxe");
        let miningLevel = calcLevel(characterData.getSkillXp("mining"));
        let canUsePickaxe = false;

        if (curWeapon.item == "Pickaxe") {
            canUsePickaxe = miningLevel >= curWeapon.requiredMiningLevel;
        } else if (i != -1) {
            canUsePickaxe =
                miningLevel >=
                getItemClass(characterData.getInventory()[i].item, this.scene)
                    .requiredMiningLevel;
        } else {
            chat.writeText("This action requires a pickaxe.");
            return false;
        }

        // Currently a small bug here that will not let you mine if the pickaxe you
        // are unable to use is higher in the inventory than another pickaxe that you can use
        if (canUsePickaxe) {
            if (miningLevel >= this.requiredMiningLevel) {
                return true;
            } else {
                chat.writeText(
                    "You do not have the required Mining level to chop this tree."
                );
                return false;
            }
        } else {
            chat.writeText(
                "You do not have the requied Mining level to use this pickaxe."
            );
            return false;
        }
    }
}
