export class Item {
    constructor(material, item, x, y) {
        this.material = material;
        this.item = item;
        this.x = x;
        this.y = y;
        this.name = material.name + item.name;
        this.cost = material.cost_mult * item.cost;
        this.skill = item.skill;
        // TODO: Set damage for each material / weapon type
        this.damage = 1;
    }
}
