import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { capitalize, getItemText, getGoldStackType } from "../utilities.js";

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

    create() {
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);
    }

    // map of skill: xp as input
    showXp(skillXpMap) {
        if (
            !this.dashboard.xpCounterOn ||
            skillXpMap === undefined ||
            skillXpMap.length == 0
        ) {
            return;
        }

        let targets = [];
        let totalXp = 0;

        const xpStartX = 470;
        let iconStartX = xpStartX - 35;
        const startY = 100;
        const endY = 20;

        for (var skill of Object.keys(skillXpMap)) {
            const xp = skillXpMap[skill];
            if (xp <= 0) {
                continue;
            }

            // Moving skill icon
            const skillIcon = this.add
                .image(iconStartX, startY, skill + "Icon")
                .setOrigin(0.5, 0.5)
                .setDepth(1);

            targets.push(skillIcon);
            totalXp += xp;
            iconStartX -= 20;
        }

        if (totalXp <= 0) {
            return;
        }

        // Gold runescape font
        const font = {
            font: "18px runescape",
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
            .text(xpStartX, startY, totalXp + " xp", font)
            .setOrigin(0.5, 0.5);

        targets.push(xpText);

        this.tweens.add({
            targets: targets,
            y: endY,
            duration: 1000,
            ease: (t) => {
                return Math.pow(Math.sin(t * 3), 3);
            },
            onComplete: () => {
                targets.forEach((target) => target.destroy());
            },
            onUpdate: () => {
                // Destroy if within 1 pixel of end point
                // Otherwise image will return to origin
                if (xpText.y >= endY - 1 && xpText.y <= endY + 1) {
                    targets.forEach((target) => target.destroy());
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

    purchaseAnimation(price) {
        const iconName = getGoldStackType(price) + "-stack";

        const startX = 300;
        const startY = 200;
        const endX = startX;
        const endY = 20;

        // Red runescape font
        const font = {
            font: "24px runescape",
            fill: "red",
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: "black",
                fill: true,
            },
        };

        // Moving purchase text
        const purchaseText = this.add
            .text(startX, startY, "-" + getItemText(price)[0], font)
            .setOrigin(0.5, 0.5);

        const goldIcon = this.add
            .image(startX + 10, startY + 25, iconName)
            .setOrigin(0.5, 0.5)
            .setDepth(1);

        this.tweens.add({
            targets: [purchaseText, goldIcon],
            x: endX,
            y: endY,
            duration: 1000,
            ease: (t) => {
                return Math.pow(Math.sin(t * 3), 3);
            },
            onComplete: () => {
                purchaseText.destroy();
                goldIcon.destroy();
            },
            onUpdate: () => {
                // Destroy if within 1 pixel of end point
                // Otherwise image will return to origin
                if (
                    purchaseText.x >= endX - 1 &&
                    purchaseText.x <= endX + 1 &&
                    purchaseText.y >= endY - 1 &&
                    purchaseText.y <= endY + 1
                ) {
                    purchaseText.destroy();
                    goldIcon.destroy();
                } else {
                    purchaseText.scale -= 0.0005;
                }
            },
            repeat: 0,
            delay: 50,
        });
    }
}
