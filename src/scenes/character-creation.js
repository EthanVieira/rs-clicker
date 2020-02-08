import { CONSTANTS } from "../constants/constants.js";

export class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({
      key: CONSTANTS.SCENES.CHARACTER_CREATION
    });
  }
  init() {
    // receieve data from other scene that initialized this scene
    // TODO: Adjust the starting positions of buttons/background by a set scale
    // let scale = 1;
  }
  preload() {
    this.load.image("unarmed", "src/assets/ui/CharacterCreationUnarmed.png");
    this.load.image("warrior", "src/assets/ui/CharacterCreationWarrior.png");
    this.load.image("ranger", "src/assets/ui/CharacterCreationRanger.png");
    this.load.image("mage", "src/assets/ui/CharacterCreationMage.png");

    this.load.image("play-button", "src/assets/ui/buttons/PlayButton.png");
  }
  create() {
    let characterClass = CONSTANTS.CLASS.UNARMED;
    // Load the default character creation screen
    this.add
      .image(0, 0, "unarmed")
      .setOrigin(0, 0)
      .setDepth(0);

    // Warrior Button
    let warriorButton = this.add.image(130, 180, "play-button").setDepth(0);
    warriorButton.setAlpha(0.01);
    warriorButton.setInteractive();

    // Mage Button
    let mageButton = this.add.image(130, 290, "play-button").setDepth(0);
    mageButton.setAlpha(0.01);
    mageButton.setInteractive();

    // Ranger Button
    let rangerButton = this.add.image(130, 405, "play-button").setDepth(0);
    rangerButton.setAlpha(0.01);
    rangerButton.setInteractive();

    // Accept Button
    let acceptButton = this.add.image(400, 455, "play-button").setDepth(0);
    acceptButton.setAlpha(0.01);
    acceptButton.setInteractive();

    // TODO: add unarmed button

    warriorButton.on("pointerup", () => {
      // Load the warrior image
      this.add
        .image(0, 0, "warrior")
        .setOrigin(0, 0)
        .setDepth(0);
      characterClass = CONSTANTS.CLASS.WARRIOR;
    });

    mageButton.on("pointerup", () => {
      // Load the mage image
      this.add
        .image(0, 0, "mage")
        .setOrigin(0, 0)
        .setDepth(0);
      characterClass = CONSTANTS.CLASS.MAGE;
    });

    rangerButton.on("pointerup", () => {
      // Load the ranger image
      this.add
        .image(0, 0, "ranger")
        .setOrigin(0, 0)
        .setDepth(0);
      characterClass = CONSTANTS.CLASS.RANGER;
    });

    acceptButton.on("pointerup", () => {
      // Start the first level if a class has been selected.
      if (characterClass != CONSTANTS.CLASS.UNARMED) {
        this.scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND, { characterClass });
        console.log("Going to Tutorial Island");
      }
    });
  }
}
