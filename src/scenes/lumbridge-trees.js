import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";

export class LumbridgeTreeScene extends LevelScene {
  constructor() {
    super({
      key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
      background: {
        name: "lumbridge",
        path: "src/assets/backgrounds/LumbridgeBackground.jpg"
      },
      minimap: {
        name: "lumbridgeMap",
        path: "src/assets/maps/LumbridgeMap.png"
      },
      clickObjects: [
        {
          name: "tree1",
          path: "src/assets/sprites/tree1.webp",
          neededClicks: 5,
          resourceType: CONSTANTS.RESOURCES.WOOD
        },
        {
          name: "tree2",
          path: "src/assets/sprites/tree2.webp",
          neededClicks: 5,
          resourceType: CONSTANTS.RESOURCES.WOOD
        }
      ],
      audio: { bgm: "harmony" }
    });
  }
}
