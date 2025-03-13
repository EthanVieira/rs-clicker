import Thrown from "../thrown.js";
import { EQUIPMENT } from "../../../../constants/constants.js";

export default class Knife extends Thrown {
    // Attack animation
    animation = {
        imageName: "",
        scale: 0.6,
        curve: 0.1,
        startX: 350,
        startY: 400,
        alpha: 1,
        flipX: true,
    };

    equipSound = "bow-arrow-equip";
}
