import { itemManifest } from "./item-manifest.js";

var itemClasses = {};
export async function loadItems() {
    for (let i in itemManifest) {
        itemClasses[i] = await import(itemManifest[i].classPath);
    }
}

export async function getItemClass(itemName, type, scene) {
    let itemClass = itemClasses[type + itemName];
    return new itemClass.default(scene);
}
