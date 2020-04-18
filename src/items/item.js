import { itemManifest } from "./item-manifest.js";

export async function getItemClass(itemName, type, scene) {
    console.log(type, itemName);
    let path = itemManifest[type + itemName].classPath;
    console.log(path);
    let itemClass = await import(path);

    return new itemClass.default(scene);
}

export class Item {
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
                    this.scene.inventory.obj.createRightClickMenu(
                        this.x,
                        this.y,
                        this,
                        this.index
                    );
                } else {
                    this.leftClick();
                }
            });
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

    examine() {
        console.log(this.examineText);
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
        this.scene.characterData.inventory[this.index] = "";
        this.sprite.destroy();
        this.name = "";
    }
}
