export class Item {
    constructor(material, type) {
        this.material = material;
        this.type = type;
        this.cost = material[1] * type[1];
        // TODO: Set damage for each material / weapon type
        this.damage = 1;
        this.image = "source\\assets\\items\\" + material[0] + '_' + type[0] + ".png";
    }
}