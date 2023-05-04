import { Item } from "../item.js";

export default class Tool extends Item {
    canCraft = true;

    animation = {
        imageName: "",
        scale: 0.25,
        curve: 1,
        startX: 450,
        startY: 400,
        alpha: 1,
        flipX: true,
    };

    constructor() {
        super();
    }

    leftClick() {
        this.use();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }

    async craft(item) {
        console.log("Combining", this.name, item.name);
    }

    getAnimation() {
        let animation = this.animation;
        if (animation.imageName == "") {
            animation.imageName = this.sprite.texture.key + "-model";
        }
        return animation;
    }
}
