import { LoadScene } from "./scenes/load.js";
import { AudioScene } from "./scenes/audio.js";
import { MainMenuScene } from "./scenes/main-menu.js";
import { CharacterCreationScene } from "./scenes/character-creation.js";
import { WorldMapScene } from "./scenes/world-map.js";
import { ShopScene } from "./scenes/shop.js";
import { Animation } from "./ui/animation.js";
import { TutorialIslandScene } from "./scenes/tutorial-island.js";
import { LumbridgeScene } from "./scenes/lumbridge.js";
import { LumbridgeTreeScene } from "./scenes/lumbridge-trees.js";
import { DraynorFishingScene } from "./scenes/draynor-fishing.js";
import { AlKharidFurnaceScene } from "./scenes/al-kharid-furnace.js";
import { VarrockAnvilScene } from "./scenes/varrock-anvil.js";
import { VarrockMineScene } from "./scenes/varrock-mine.js";
import { VarrockScene } from "./scenes/varrock.js";
import { BarbarianVillageScene } from "./scenes/barbarian-village.js";
import { DashboardScene } from "./ui/dashboard.js";
import { ChatScene } from "./ui/chat-window.js";
import { StatsScene } from "./ui/stats.js";
import { SCREEN } from "./constants/constants.js";

let game = new Phaser.Game({
    width: SCREEN.WIDTH,
    height: SCREEN.HEIGHT,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
    },
    render: {
        pixelArt: true,
    },
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
        DraynorFishingScene,
        AlKharidFurnaceScene,
        VarrockAnvilScene,
        VarrockMineScene,
        VarrockScene,
        BarbarianVillageScene,
        ChatScene,
        DashboardScene,
        Animation,
        StatsScene,
    ],
});
