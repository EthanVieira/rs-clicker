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
    objectType = "ITEM";

    // Inventory location
    index = -1;
    x = 0;
    y = 0;
    selected = false;

    // Objects
    sprite;
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
                    this.createRightClickMenu(pointer.x, pointer.y, this.actions);
                } else {
                    this.leftClick();
                }
            });
    }

    createShopSprite(x, y) {
        this.x = x;
        this.y = y;

        let shopActions = [
            { text: "Buy", func: "buy"}
        ]

        this.sprite = this.scene.add
            .image(x, y, itemManifest[this.type + this.item].imageName + "-model")
            .setScale(this.scale)
            .setDepth(4)
            .setInteractive()
            .on("pointerover", () => {
                this.examine();
            })
            .on("pointerdown", pointer => {
                this.createRightClickMenu(pointer.x, pointer.y, shopActions);
            });
    }

    buy() {
        if (this.scene.characterData.gold >= this.cost) {
            console.log("buying it");
        } else {
            console.log("not enough mulah");
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
        this.destroy();
    }

    move(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.index = index;
    }

    show(isVisible) {
        this.sprite.visible = isVisible;
    }

    destroy() {
        if (this.index >= 0) {
            this.scene.characterData.inventory[this.index] = "";
        }
        this.sprite.destroy();
        this.name = "";
    }
}
