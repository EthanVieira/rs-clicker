import { itemManifest } from "./item-manifest.js";

export async function getItemClass(itemName, material, scene) {
	let path = itemManifest[itemName + material].classPath;
	let itemClass = await import(path);

    return new itemClass.default(scene);
}

export class Item {
	// Text data
	name = "";
    item = "";
    material = "";
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
    cost = 0;
    actions = [];

    addToInventory(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;

        this.sprite = this.scene.add
            .image(x, y, this.name)
            .setDepth(4)
            .setScale(0.2)
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

    move(x, y, index) {
        this.x = x;
        this.y = y;
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
