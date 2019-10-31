export class Item {
    constructor(material, item) {
        this.material = material;
        this.item = item;
        this.cost = material.cost_mult * item.cost;
        // TODO: Set damage for each material / weapon type
        this.damage = 1;
        this.image = "source\\assets\\items\\" + material.name + '_' + item.name + ".png";
    }
}