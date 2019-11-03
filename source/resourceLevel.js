import { Level } from "./level.js";
import { CONSTANTS } from "./constants.js";
import { Resource } from "./resource.js";
import { AutoClicker } from "./autoClicker.js";

// Parent level class
export class ResourceLevel extends Level{
    // Autoclickers
    autoClickers = [];
    
    constructor(data) {
        super(data);

        this.resourceType = data.resourceType;
    }

    childPreload() {
    }

    childCreate() {
    	// Create click objects
        this.clickObjectMetaData.forEach((clickObject) => {
            this.clickObjects.push(
                new Resource({
                    scene: this,
                    x: this.width/2-100,
                    y: this.height/2-150,
                    neededClicks: clickObject.neededClicks,
                    name: clickObject.name,
                    resourceType: this.resourceType
                })
            );
        });
    }

    resourceCompleted() {
    	console.log('Got', this.resourceType);
        // TODO: put resource in inventory, add XP
    	this.showRandomClickObject();
    }
}