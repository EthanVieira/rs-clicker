import { CONSTANTS, EQUIPMENT } from "../constants/constants.js";
import { getItemClass } from "../utilities.js";

export class Equipment {
    scene;

    // Pointer to cookies, stores item name/type
    playerEquipment = {};

    // Images
    equipment = {
        WEAPON: {},
    };
    bg = {
        WEAPON: {},
    };

    constructor(scene, equipment) {
        this.scene = scene;
        this.playerEquipment = equipment;

        this.bg.WEAPON = scene.add
            .image(587, 304, "equipment-background")
            .setDepth(2)
            .setVisible(false);

        // Update and show equipment on startup
        this.refreshEquipment();
    }

    // Load equipment on startup
    async refreshEquipment() {
        for (let i in this.playerEquipment) {
            if (Object.keys(this.playerEquipment[i]).length) {
                let newEquipment = await getItemClass(
                    this.playerEquipment[i].item,
                    this.playerEquipment[i].type,
                    this.scene
                );
                newEquipment.createSprite(0, 0);
                newEquipment.equip();
            }
        }
    }

    // Add to specific index
    equipItem(item) {
        // Remove previously equipped item if there is one
        if (Object.keys(this.equipment[item.slot]).length) {
            console.log("Unequiping previous item", this.equipment[item.slot].name);
            this.equipment[item.slot].unequip();
        }

        // Add to saved data
        this.playerEquipment[item.slot] = {
            item: item.item,
            type: item.type,
        };

        // Put into the right position
        switch (item.slot) {
            case EQUIPMENT.SLOTS.WEAPON:
                item.move(587, 303);
                break;
            default:
                console.log("Bad equipment slot", item.slot);
                item.move(587, 303);
                break;
        }

        // Hide if equipment is not selected
        let showItem = this.scene.currentPanel == CONSTANTS.PANEL.EQUIPMENT;
        item.setVisible(showItem);
        this.bg[item.slot].visible = showItem;

        // Add object to the scene
        this.equipment[item.slot] = item;
    }

    unequipItem(slot) {
        this.bg[slot].visible = false;
        this.equipment[slot] = {};
        this.playerEquipment[slot] = {};
    }

    showEquipment(isVisible) {
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.EQUIPMENT;
        }
        Object.entries(this.equipment).forEach(([item, itemObj]) => {
            if (Object.keys(itemObj).length) {
                itemObj.setVisible(isVisible);
                this.bg[item].setVisible(isVisible);
            } else {
                this.bg[item].setVisible(false);
            }
        });
    }

    destroy() {
        Object.entries(this.equipment).forEach(([item, itemObj]) => {
            if (Object.keys(itemObj).length) {
                itemObj.destroy(false);
            }
        });
    }
}
