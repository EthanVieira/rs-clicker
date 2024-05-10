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
import { RoguesDenCookingScene } from "./scenes/rogues-den-cooking.js";
import { AlKharidFurnaceScene } from "./scenes/al-kharid-furnace.js";
import { AlKharidPalaceScene } from "./scenes/al-kharid-palace.js";
import { VarrockAnvilScene } from "./scenes/varrock-anvil.js";
import { VarrockMineScene } from "./scenes/varrock-mine.js";
import { VarrockScene } from "./scenes/varrock.js";
import { BarbarianVillageScene } from "./scenes/barbarian-village.js";
import { GnomeVillageAgilityScene } from "./scenes/gnome-village-agility.js";
import { RuneEssenceMineScene } from "./scenes/rune-essence-mine.js";
import { AirAltarScene } from "./scenes/air-altar.js";
import { SawmillScene } from "./scenes/sawmill.js";
import { PlayerOwnedHouseScene } from "./scenes/player-owned-house.js";
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
        RoguesDenCookingScene,
        AlKharidFurnaceScene,
        AlKharidPalaceScene,
        VarrockAnvilScene,
        VarrockMineScene,
        VarrockScene,
        BarbarianVillageScene,
        GnomeVillageAgilityScene,
        RuneEssenceMineScene,
        AirAltarScene,
        SawmillScene,
        PlayerOwnedHouseScene,
        ChatScene,
        DashboardScene,
        Animation,
        StatsScene,
    ],
});
