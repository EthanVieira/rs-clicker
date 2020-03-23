import { ITEMS } from "../constants/items.js";
import { MATERIALS } from "../constants/materials.js"

export function getItemClass(itemName, material, scene) {
	let itemData = ITEMS[itemName];
	let matData = MATERIALS[itemData.material][material];

	switch(itemName) {
		case "Bones":
			return new Bones(itemData, matData, scene);
			break;
		case "Logs":
			return new Logs(itemData, matData, scene);
			break;
	}
}

class Item {
	item = "";
	material = "";
	scene;
	examineText = "";
	name = "";
	cost = 0;
	actions = [];
	index = -1;
	x = 0;
	y = 0;
	sprite;
	selected = false;

	constructor(itemType, material, scene) {
		this.material = material.name;
		this.item = itemType.name;
		if (material.hideName) {
			this.name = itemType.name;
		}
		else {
			this.name = material.name + itemType.name;
		}
		this.examineText = itemType.examineText;
		this.scene = scene;
		this.cost = Math.floor(itemType.cost * material.cost_mult);
	}

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
	                this.scene.inventory.obj.createRightClickMenu(this.x, this.y, this, this.index);
	            }
	            else {
	                this.leftClick();
	            }
	        });
	}

	// Toggle highlighting on use
	highlightItem() {
		if (this.selected) {
			this.sprite.setAlpha(1);
		}
		else {
			this.sprite.setAlpha(.5);
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

export class Logs extends Item {

	constructor(itemData, material, scene) {
		super(itemData, material, scene);

		this.actions = ["use"];
	}

	leftClick() {this.use()}

	use() {
		super.highlightItem();
		console.log("use", this.name);
	}
}

export class Bones extends Item {
	prayerXp = 0;

	constructor(itemType, material, scene) {
		super(itemType, material, scene);

		this.prayerXp = material.prayerXp;
		this.actions = ["bury", "use"];
	}

	leftClick() {this.bury()}

	bury() {
		console.log("bury", this.name);
		this.destroy();
	}

	use() {
		super.highlightItem();
		console.log("use", this.name);
	}
}