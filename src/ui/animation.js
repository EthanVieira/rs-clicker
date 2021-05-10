import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { capitalize } from "../utilities.js";

export class Animation extends Phaser.Scene {
    constructor() {
        super({ key: CONSTANTS.SCENES.ANIMATION });
    }

    preload() {
        // Load icons for all skills
        for (const skill in characterData.getSkills()) {
            this.load.image(
                skill + "Icon",
                "src/assets/ui/icons/" + capitalize(skill) + ".png"
            );
        }
    }

    showXp(skill, xp) {
        if (xp <= 0) {
            return;
        }

        const startX = 470;
        const startY = Math.floor(this.cameras.main.height / 2);
        const endX = startX;
        const endY = 20;

        // Gold runescape font
        const font = {
            font: "24px runescape",
            fill: "gold",
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: "black",
                fill: true,
            },
        };

        // Moving xp text
        const xpText = this.add
            .text(startX, startY, xp + " xp", font)
            .setOrigin(0.5, 0.5);

        // Fixed skill text
        const skillIcon = this.add
            .image(startX, 25, skill + "Icon")
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        // Skill background
        const shape = new Phaser.Geom.Circle(startX, 25, 20);
        const graphics = this.add
            .graphics({
                lineStyle: { width: 1, color: 0x000000 },
                fillStyle: { color: 0x707070 },
            })
            .fillCircleShape(shape)
            .strokeCircleShape(shape);

        this.tweens.add({
            targets: xpText,
            x: endX,
            y: endY,
            duration: 1000,
            ease: (t) => {
                return Math.pow(Math.sin(t * 3), 3);
            },
            onComplete: () => {
                xpText.destroy();
                skillIcon.destroy();
                graphics.destroy();
            },
            onUpdate: () => {
                // Destroy if within 1 pixel of end point
                // Otherwise image will return to origin
                if (
                    xpText.x >= endX - 1 &&
                    xpText.x <= endX + 1 &&
                    xpText.y >= endY - 1 &&
                    xpText.y <= endY + 1
                ) {
                    xpText.destroy();
                    skillIcon.destroy();
                    graphics.destroy();
                } else {
                    xpText.scale -= 0.0005;
                }
            },
            repeat: 0,
            delay: 50,
        });
    }

    clickAnimation({ imageName, startX, startY, scale, curve, alpha, flipX }) {
        // Add animation image
        const image = this.add
            .image(startX, startY, imageName)
            .setScale(scale)
            .setDepth(4)
            .setAlpha(alpha)
            .setFlipX(flipX);

        // Move animation
        const endX = Math.floor(this.cameras.main.width / 2) - 100,
            endY = Math.floor(this.cameras.main.height / 2);
        this.tweens.add({
            targets: image,
            x: endX,
            y: endY,
            duration: 500,
            ease: (t) => {
                return Math.pow(Math.sin(t * 3), 3);
            },
            onComplete: () => {
                image.destroy();
            },
            onUpdate: () => {
                // Destroy if within 1 pixel of end point
                // Otherwise image will return to origin
                if (
                    image.x >= endX - 1 &&
                    image.x <= endX + 1 &&
                    image.y >= endY - 1 &&
                    image.y <= endY + 1
                ) {
                    image.destroy();
                } else {
                    image.scale -= 0.005;
                    image.angle -= curve;
                    if (image.alpha < 1) {
                        image.alpha += 0.03;
                    }
                }
            },
            repeat: 0,
            delay: 50,
        });
    }
}
