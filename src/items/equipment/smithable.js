import Equipment from "./equipment.js";

export default class Smithable extends Equipment {
    xp = 0;
    bars = [];
    smithingErrorMessage = "Insufficient ingredients.";
}