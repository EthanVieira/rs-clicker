import { itemManifest } from "./item-manifest.js";

export var itemClasses = {};
export async function getItemClass(itemName, scene) {
    let itemClass = itemClasses[itemName];

    return new itemClass.default(scene);
}
