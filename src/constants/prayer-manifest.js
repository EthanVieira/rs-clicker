export const PRAYER_MANIFEST = {
    StandardPrayers: {
        ThickSkin: {
            imagePath: "ThickSkin.png",
            imageName: "thick-skin",
            requiredLevels: { prayer: 1 },
            skillBoosts: [{ defence: 0.05 }],
            secondsPerOnePointDrained: 36,
        },
        BurstOfStrength: {
            imagePath: "BurstOfStrength.png",
            imageName: "burst-of-strength",
            requiredLevels: { prayer: 4 },
            skillBoosts: [{ strength: 0.05 }],
            secondsPerOnePointDrained: 36,
        },
    },
};
