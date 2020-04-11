import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Barbarian extends Enemy {
	constructor(scene) {
		super({
			scene: scene,
			name: "Barbarian",
			varName: "barbarian",
			images: [
				{name: "maleBarbarian", path: "src/assets/sprites/MaleBarbarian.png"},
				{name: "femaleBarbarian", path: "src/assets/sprites/FemaleBarbarian.png"}
			],
			maxHealth: 20,
			killGold: 20,
			drops: [{item: NormalBones, rate: .5}]
		});
	}
}