export const ITEMS = {
    Weapon: {
        // Melee Weapons
        Dagger: {
            name: "Dagger",
            cost: 50,
            material: "ORE",
            skill: "attack",
            examineText: "Short but pointy"
        },
        Longsword: {
            name: "Longsword",
            cost: 200,
            material: "ORE",
            skill: "attack",
            examineText: "A razor sharp longsword"
        },
        Scimitar: {
            name: "Scimitar",
            cost: 500,
            material: "ORE",
            skill: "attack",
            examineText: "A vicious, curved sword"
        },
        // WARHAMMER: ["WARHAMMER", 1000, "SMITHINGMAT"],
        // BATTLEAXE: ["BATTLEAXE", 1500, "SMITHINGMAT"],
        // HALBERD: ["HALBERD", 2000, "SMITHINGMAT"],
        // SPEAR: ["SPEAR", 3000, "SMITHINGMAT"],
        // CLAWS: ["CLAWS", 4000, "SMITHINGMAT"],
        // TWOHAND: ["TWOHAND", 5000, "SMITHINGMAT"]
        // MAUL: ["MAUL", 15000, "SPECIAL"]

        // Ranged Weapons
        Shortbow: {
            name: "Shortbow",
            cost: 100,
            material: "WOOD",
            skill: "ranged",
            examineText: "Short but affective"
        },
        Longbow: {
            name: "Longbow",
            cost: 100,
            material: "WOOD",
            skill: "ranged",
            examineText: "A nice sturdy bow"
        },
        Crossbow: {
            name: "Crossbow",
            cost: 1000,
            material: "ORE",
            skill: "ranged",
            examineText: "A crossbow"
        }
        // COMPBOW: ["COMPBOW", 1000, "FLETCHINGMAT"],
        // KNIFE: ["KNIFE", 10, "SMITHINGMAT"],
        // DART: ["DART", 10, "SMITHINGMAT"],
        // THROWNAXE: ["THROWNAXE", 25, "SMITHINGMAT"],
        // CHINCHOMPA: ["CHINCHOMPA", 100, "SPECIAL"],
        // DARKBOW: ["DARKBOW", 100000, "SPECIAL"],
        // LIGHTBALLISTA: ["LIGHTBALLISTA", 100000, "SPECIAL"],
        // HEAVYBALLISTA: ["HEAVYBALLISTA", 500000, "SPECIAL"],
        // BLOWPIPE: ["BLOWPIPE", 100000, "SPECIAL"]

        // Magic Weapons
        // STAFF: ["STAFF", 100, "SPECIAL"],
        // AIRSTAFF: ["AIRSTAFF", 250, "SPECIAL"],
        // EARTHSTAFF: ["EARTHSTAFF", 250, "SPECIAL"],
        // FIRESTAFF: ["FIRESTAFF", 250, "SPECIAL"],
        // WATERSTAFF: ["WATERSTAFF", 250, "SPECIAL"],
        // BATTLESTAFF: ["BATTLESTAFF", 1000, "SPECIAL"],
        // MYSTICSTAFF: ["MYSTICSTAFF", 5000, "SPECIAL"],
        // ANCIENTSTAFF: ["ANCIENTSTAFF", 10000, "SPECIAL"],
        // GUTHIXSTAFF: ["GUTHIXSTAFF", 25000, "SPECIAL"],
        // SARADOMINSTAFF: ["SARADOMINSTAFF", 25000, "SPECIAL"],
        // ZAMORAKSTAFF: ["ZAMORAKSTAFF", 25000, "SPECIAL"],
        // LUNARSTAFF: ["LUNARSTAFF", 40000, "SPECIAL"],
        // AHRIMSTAFF: ["AHRIMSTAFF", 100000, "SPECIAL"],
        // TRIDENT: ["TRIDENT", 150000, "SPECIAL"]
    },
    // Tool [name, base_cost, skill]
    Tool: {
        Axe: {
            name: "Axe",
            cost: 100,
            material: "ORE",
            skill: "woodcutting",
            examineText: "A woodcutter's axe"
        },
        Pickaxe: {
            name: "Pickaxe",
            cost: 100,
            material: "ORE",
            skill: "mining",
            examineText: "Used for mining"
        }
    },
    Consumable: {}
};
