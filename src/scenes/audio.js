import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { runOnLoad } from "../utilities.js";

const BGM = 0;
const SFX = 1;
const ENV = 2;

export class AudioScene extends Phaser.Scene {
    bgm = {};
    sfx = {};
    audioLoaded = false;
    previousVolume = [0.5, 0.5, 0.5];
    currentSongName = "";
    queuedSongName = "";

    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO,
        });
    }

    preload() {
        // BGM
        this.load.audio("al-kharid", "assets/audio/bgm/AlKharid.ogg");
        this.load.audio("barbarianism", "assets/audio/bgm/Barbarianism.ogg");
        this.load.audio("expanse", "assets/audio/bgm/Expanse.ogg");
        this.load.audio("gnome-village", "assets/audio/bgm/GnomeVillage.ogg");
        this.load.audio("harmony", "/assets/audio/bgm/Harmony.ogg");
        this.load.audio("home-sweet-home", "assets/audio/bgm/HomeSweetHome.ogg");
        this.load.audio("newbie-melody", "assets/audio/bgm/NewbieMelody.ogg");
        this.load.audio("parade", "assets/audio/bgm/Parade.ogg");
        this.load.audio("rune-essence", "assets/audio/bgm/RuneEssence.ogg");
        this.load.audio("scape-main", "assets/audio/bgm/ScapeMain.ogg");
        this.load.audio("serene", "assets/audio/bgm/Serene.ogg");
        this.load.audio("still-night", "assets/audio/bgm/StillNight.ogg");
        this.load.audio("the-rogues-den", "assets/audio/bgm/TheRoguesDen.ogg");
        this.load.audio("the-trade-parade", "assets/audio/bgm/TheTradeParade.ogg");
        this.load.audio("unknown-land", "assets/audio/bgm/UnknownLand.ogg");

        // SFX
        this.load.audio("purchase", "assets/audio/sfx/GrandExchangeOfferComplete.mp3");
        this.load.audio("quest-complete-1", "assets/audio/sfx/QuestCompleted1.ogg");
        this.load.audio("quest-complete-2", "assets/audio/sfx/QuestCompleted2.ogg");
        this.load.audio("restore-prayer", "assets/audio/sfx/RestorePrayer.ogg");

        const skills = [
            "Agility",
            "Attack",
            "Construction",
            "Cooking",
            "Crafting",
            "Defence",
            "Farming",
            "Firemaking",
            "Fishing",
            "Fletching",
            "Herblore",
            "Hitpoints",
            "Hunter",
            "Magic",
            "Mining",
            "Prayer",
            "Ranged",
            "Runecrafting",
            "Slayer",
            "Smithing",
            "Strength",
            "Thieving",
            "Woodcutting",
        ];
        for (let skill of skills) {
            this.load.audio(
                skill.toLowerCase() + "-level-up",
                "assets/audio/sfx/level-ups/" + skill + "LevelUp.ogg"
            );
        }

        // Not currently using the commented ones
        this.load.audio("axe-equip", "assets/audio/sfx/equip/AxeEquip.ogg");
        // this.load.audio("bolt-equip", "assets/audio/sfx/equip/BoltEquip.ogg");
        // this.load.audio("boots-equip", "assets/audio/sfx/equip/BootsEquip.ogg");
        this.load.audio("bow-arrow-equip", "assets/audio/sfx/equip/BowArrowEquip.ogg");
        // this.load.audio("mace-flail-equip", "assets/audio/sfx/equip/MaceFlailEquip.ogg");
        // this.load.audio("maul-equip", "assets/audio/sfx/equip/MaulEquip.ogg");
        // this.load.audio("metal-body-equip", "assets/audio/sfx/equip/MetalBodyEquip.ogg");
        // this.load.audio("metal-helmet-equip", "assets/audio/sfx/equip/MetalHelmetEquip.ogg");
        // this.load.audio("metal-legs-equip", "assets/audio/sfx/equip/MetalLegsEquip.ogg");
        // this.load.audio("non-metal-hat-equip", "assets/audio/sfx/equip/NonMetalHatEquip.ogg");
        // this.load.audio("ranged-armor-equip", "assets/audio/sfx/equip/RangedArmorEquip.ogg");
        this.load.audio(
            "staff-spear-equip",
            "assets/audio/sfx/equip/StaffSpearEquip.ogg"
        );
        this.load.audio("sword-equip", "assets/audio/sfx/equip/SwordEquip.ogg");
        // this.load.audio("whip-equip", "assets/audio/sfx/equip/WhipEquip.ogg");
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
        this.changeVolume(BGM, characterData.getVolume(BGM));
        this.changeVolume(SFX, characterData.getVolume(SFX));
    }

    playBgm(audioName) {
        if (audioName != this.currentSongName) {
            runOnLoad(this, () => {
                console.log("playing music", audioName);
                if (this.audioLoaded) {
                    console.log("stopped prev song");
                    this.bgm.stop();
                }
                this.currentSongName = audioName;
                this.bgm = this.sound.add(audioName);
                this.bgm.setLoop(true);
                this.bgm.play();
                this.audioLoaded = true;
                this.changeVolume(BGM, characterData.getVolume(BGM));
            });
        }
    }

    // Pause BGM while playing SFX
    playSfx(audioName, stopBgm = true) {
        console.log("playing", audioName);
        if (stopBgm) {
            this.bgm.pause();
            if (this.sfx?.isPlaying) {
                this.sfx.stop();
            }
        }

        this.sfx = this.sound.add(audioName);
        this.sfx.setVolume(characterData.getVolume(SFX) / 4);
        this.sfx.play();

        this.sfx.once("complete", () => {
            if (stopBgm) {
                this.bgm.resume();
            }
        });
    }

    // 0: BGM, 1: SFX, 2: Environment
    changeVolume(volumeType, value) {
        // Set volume and show button
        characterData.setVolume(volumeType, value);

        // Lower volume of currently playing BGM
        if (volumeType == BGM && this.bgm?.isPlaying) {
            this.bgm.setVolume(value); // 0-1
        } else if (volumeType == SFX && this.sfx?.isPlaying) {
            this.sfx.setVolume(value);
        }
    }

    mute(isMuted) {
        if (isMuted) {
            this.previousVolume[BGM] = characterData.getVolume(BGM);
            this.previousVolume[SFX] = characterData.getVolume(SFX);
            this.previousVolume[ENV] = characterData.getVolume(ENV);
            this.changeVolume(BGM, 0);
            this.changeVolume(SFX, 0);
            this.changeVolume(ENV, 0);
        } else {
            this.changeVolume(BGM, this.previousVolume[BGM]);
            this.changeVolume(SFX, this.previousVolume[SFX]);
            this.changeVolume(ENV, this.previousVolume[ENV]);
        }
    }
}
