/** @type {import("../typings/phaser")} */

// I'm limiting it to 800x600 for now just to make things easier

import { LoadScene } from "./scenes/load.js"
import { Audio } from "./audio.js"
import { MenuScene } from "./scenes/menu.js"
import { CCScene }   from "./scenes/cc.js"
import { WorldMap } from "./scenes/worldMap.js"
import { Shop } from "./scenes/shop.js"
import { TutorialIsland } from "./scenes/tutorialIsland.js"
import { Lumbridge }    from "./scenes/lumbridge.js"
import { LumbridgeTree }    from "./scenes/lumbridgeTrees.js"

let game = new Phaser.Game({
    width: 765,
    height: 503,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH },
    scene:[
        LoadScene, Audio, MenuScene, CCScene, WorldMap, Shop, TutorialIsland, Lumbridge, LumbridgeTree
    ]
});