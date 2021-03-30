import { Item } from "./item.js";
import { CONSTANTS, FONTS, OBJECT_TYPES, EQUIPMENT } from "../constants/constants.js";
import { calcLevel, getItemClass, capitalize, aOrAn } from "../utilities.js";
import { characterData } from "../cookie-io.js";

export default class Equipment extends Item {
    // Attack bonuses
    stabBonus = 0;
    slashBonus = 0;
    crushBonus = 0;
    magicBonus = 0;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 0;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

    // Other bonuses
    strengthBonus = 0;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Equipment details
    slot = "";
    equipped = false;
    style = "";
    skill = "";
    objectType = OBJECT_TYPES.EQUIPMENT;

    constructor() {
        super();
        // Add to front of actions array
        this.actions.unshift({ text: "Equip", func: "equip" });
    }

    leftClick() {
        if (this.equipped) {
            this.unequip();
        } else {
            this.equip();
        }
    }

    async equip() {
        if (!this.equipped) {
            if (this.checkRequiredLevel()) {
                console.log("Equipping", this.name);

                // Move item into equipment
                let equippedItem = {};
                if (this.numItems == 1) {
                    // Remove from inventory if it was there
                    if (this.index >= 0) {
                        characterData.setInventory(this.index, {});
                        this.scene.inventory.obj.inventory[this.index] = {};
                        this.index = -1;
                    }
                    equippedItem = this;
                }
                // Reduce count and copy to equipment
                else {
                    this.setNumItems(this.numItems - 1);
                    equippedItem = await getItemClass(this.constructor.name, this.scene);
                    equippedItem.createSprite(0, 0);
                }

                equippedItem.equipped = true;
                equippedItem.actions[0] = { text: "Unequip", func: "unequip" };
                equippedItem.scene.equipment.obj.equipItem(equippedItem);
            } else {
                console.log("Not high enough level to equip that.");
                let skillText = this.getRequiredCombatSkill();
                this.scene.scene
                    .get(CONSTANTS.SCENES.CHAT)
                    .writeText(
                        "You need " +
                            aOrAn(skillText) +
                            " " +
                            capitalize(skillText) +
                            " level of " +
                            this.requiredLevel +
                            " to equip this item."
                    );
            }
        } else {
            console.log("Error, trying to equip when already equipped");
        }
    }

    unequip() {
        if (this.equipped) {
            console.log("Trying to unequip", this.name, this.index);

            let wasAdded = this.scene.inventory.obj.addToInventory(this, false);
            if (wasAdded) {
                this.scene.equipment.obj.unequipItem(this.slot);

                this.actions[0] = { text: "Equip", func: "equip" };
                this.equipped = false;
                console.log("Unequipped", this.name);
            }
        } else {
            console.log("Error, trying to unequip when not equipped");
        }
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }

    checkRequiredLevel() {
        return (
            calcLevel(characterData.getSkillXp(this.getRequiredCombatSkill())) >=
            this.requiredLevel
        );
    }

    getRequiredCombatSkill() {
        let skill = "";
        switch (this.skill) {
            case EQUIPMENT.WEAPON_TYPES.MELEE:
                skill = "attack";
                break;
            case EQUIPMENT.WEAPON_TYPES.RANGED:
                skill = "ranged";
                break;
            case EQUIPMENT.WEAPON_TYPES.MAGIC:
                skill = "magic";
        }
        return skill;
    }
}
