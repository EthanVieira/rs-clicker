import { itemManifest } from "./item-manifest.js";
//import { FONTS } from "../constants/constants.js";
import { ClickableObject } from "../clickable-object.js";

export async function getItemClass(itemName, type, scene) {
    //console.log(itemName, type);
    let path = itemManifest[type + itemName].classPath;
    //console.log(path);
    let itemClass = await import(path);

    return new itemClass.default(scene);
}

export class Item extends ClickableObject {
    // Text data
    name = "";
    item = "";
    type = "";
    examineText = "";

    // Inventory location
    index = -1;
    x = 0;
    y = 0;
    selected = false;
    stackable = true;
    numItems = 1;

    // Objects
    sprite;
    numItemsText;
    scene;

    // Others
    scale = 1;
    cost = 0;
    actions = [
        { text: "Use", func: "use" },
        { text: "Drop", func: "drop" },
        { text: "Examine", func: "examine" }
    ];

    createSprite(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.index = index;

        this.sprite = this.scene.add
            .image(x, y, itemManifest[this.type + this.item].imageName)
            .setScale(this.scale)
            .setDepth(4)
            .setInteractive()
            .on("pointerdown", pointer => {
                if (pointer.rightButtonDown()) {
                    this.createRightClickMenu(pointer.x, pointer.y);
                } else {
                    this.leftClick();
                }
            });
        
        // Add text in top left for stackable items
        this.numItemsText = this.scene.add
            .text(x, y, this.numItems, { 
                font: "10px runescape",
                fill: "orange"
            });
        }
        
        // Hide unless item is stacked
        if (this.numItems <= 1) {
            this.numItemsText.visible = false;
        }
    }

    // Toggle highlighting on use
    highlightItem() {
        if (this.selected) {
            this.sprite.setAlpha(1);
        } else {
            this.sprite.setAlpha(0.5);
        }
        this.selected = !this.selected;

        // Un-highlight prev item
        this.scene.inventory.obj.highlightItem(this.index);
    }

    drop() {
        console.log("Drop", this.name);
        
        if (this.numItems <= 1) {
            this.destroy();
        } else {
            this.setNumItems(this.numItems - 1);
        }
    }

    move(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.index = index;
    }

    setNumItems(num) {
        this.numItems = num;
        
        // Update text and make visible if item is visible
        this.numItemsText.text = num;
        if (num <= 1) {
            this.numItemsText.visible = false;
        } else if (this.sprite.visible) {
            this.numItemsText.visible = true;
        }
    }

    show(isVisible) {
        this.sprite.visible = isVisible;
        
        // Show/hide if stacked
        if (this.numItems > 1) {
            this.numItemsText.visible = isVisible;
        }
    }

    destroy() {
        if (this.index >= 0) {
            this.scene.characterData.inventory[this.index] = "";
        }
        this.sprite.destroy();
        this.numItemsText.destroy();
        this.name = "";
    }
}
