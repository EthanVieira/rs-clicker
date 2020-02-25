/** @type {import("../typings/phaser")} */

import { LoadScene } from "./scenes/load.js";
import { AudioScene } from "./scenes/audio.js";
import { MainMenuScene } from "./scenes/main-menu.js";
import { CharacterCreationScene } from "./scenes/character-creation.js";
import { WorldMapScene } from "./scenes/world-map.js";
import { ShopScene } from "./scenes/shop.js";
import { TutorialIslandScene } from "./scenes/tutorial-island.js";
import { LumbridgeScene } from "./scenes/lumbridge.js";
import { LumbridgeTreeScene } from "./scenes/lumbridge-trees.js";
import { VarrockScene } from "./scenes/varrock.js";
import { SCREEN } from "./constants/constants.js";

let game = new Phaser.Game({
    width: SCREEN.WIDTH,
    height: SCREEN.HEIGHT,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [
        LoadScene,
        AudioScene,
        MainMenuScene,
        CharacterCreationScene,
        WorldMapScene,
        ShopScene,
        TutorialIslandScene,
        LumbridgeScene,
        LumbridgeTreeScene,
        VarrockScene
    ]
});
