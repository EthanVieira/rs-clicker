import StabSword from "../stab-sword.js";

export default class Dagger extends StabSword {
    // Attack animation
    animation = {
        imageName: "",
        scale: 0.5,
        curve: 0,
        startX: 200,
        startY: 430,
        alpha: 1,
        flipX: false,
    };
}
