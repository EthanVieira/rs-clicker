import { Item } from "./item.js";

export default class Equipment extends Item {
    // Attack bonuses
    stabBonus = 0;
    slashBonus = 0;
    crushBonus = 0;
    rangedBonus = 0;
    magicBonus = 0;

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

    equip() {
        if (!this.equipped) {
            console.log("Equipping", this.name);

            // Remove from inventory if it was there
            if (this.index >= 0) {
                this.scene.characterData.inventory[this.index] = {};
                this.scene.inventory.obj.inventory[this.index] = {};
                this.index = -1;
            }
            
            this.actions[0] = { text: "Unequip", func: "unequip" };
            this.equipped = true;
            this.scene.equipment.obj.equipItem(this);
        } else {
            console.log("Error, trying to equip when already equipped");
        }
    }

    unequip() {
        if (this.equipped) {
            console.log("Trying to unequip", this.name, this.index);

            let wasAdded = this.scene.inventory.obj.addToInventory(this, false);
            if (wasAdded) {
                // Remove from equipment slot
                this.scene.equipment.obj.equipment[this.slot] = {};
                this.scene.characterData.equipment[this.slot] = {};

                this.actions[0] = { text: "Equip", func: "equip" };
                this.equipped = false;
                console.log("Unequipped", this.name)
            }
        } else {
            console.log("Error, trying to unequip when not equipped");
        }
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
