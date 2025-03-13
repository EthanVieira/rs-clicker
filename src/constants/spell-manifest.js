// Todo for all max hits:
// The maximum hit for elemental spells increases to match
// the highest unlocked spell of that tier once your
// Magic level is high enough to use it.

export const AVAILABLE_INDEX = 0;
export const UNAVAILABLE_INDEX = 1;

export const SPELL_MANIFEST = {
    StandardSpellbook: {
        WindStrike: {
            imagePaths: ["WindStrike.png", "WindStrikeUnavailable.png"],
            imageNames: ["wind-strike", "wind-strike-unavailable"],
            requiredRunes: { AirRune: 1, MindRune: 1 },
            requiredLevels: { magic: 1 },
            baseMaxHit: 2,
            baseXp: 5.5,
        },
        WaterStrike: {
            imagePaths: ["WaterStrike.png", "WaterStrikeUnavailable.png"],
            imageNames: ["water-strike", "water-strike-unavailable"],
            requiredRunes: { AirRune: 1, WaterRune: 1, MindRune: 1 },
            requiredLevels: { magic: 5 },
            baseMaxHit: 4,
            baseXp: 7.5,
        },
        EarthStrike: {
            imagePaths: ["EarthStrike.png", "EarthStrikeUnavailable.png"],
            imageNames: ["earth-strike", "earth-strike-unavailable"],
            requiredRunes: { AirRune: 1, EarthRune: 2, MindRune: 1 },
            requiredLevels: { magic: 9 },
            baseMaxHit: 6,
            baseXp: 9.5,
        },
        FireStrike: {
            imagePaths: ["FireStrike.png", "FireStrikeUnavailable.png"],
            imageNames: ["fire-strike", "fire-strike-unavailable"],
            requiredRunes: { AirRune: 2, FireRune: 3, MindRune: 1 },
            requiredLevels: { magic: 13 },
            baseMaxHit: 8,
            baseXp: 11.5,
        },
    },
};
