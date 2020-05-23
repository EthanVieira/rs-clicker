import { itemManifest } from "./item-manifest.js";

export var itemClasses = {};
export async function getItemClass(itemName, type, scene) {
    let itemClass = itemClasses[type + itemName];

    return new itemClass.default(scene);
}
