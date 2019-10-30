export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
        AUDIO: "AUDIO",
        MENU: "MENU",
        CC: "CC",
        MAP: "MAP",
        SHOP: "SHOP",
        TUTORIAL_ISLAND: "TUTORIAL_ISLAND",
        LUMBRIDGE: "LUMBRIDGE"
    },
    CLASS: {
    	UNARMED: "UNARMED",
    	WARRIOR: "WARRIOR",
    	MAGE: "MAGE",
    	RANGER: "RANGER"
    },
    // Materials used for Smithing: [name, cost_multiplier, required_level]
    SMITHINGMAT: {
        BRONZE: ["BRONZE", 1.0, 1],
        IRON: ["IRON", 1.5, 5],
        STEEL: ["STEEL", 2.0, 10],
        MITHRIL: ["MITHRIL", 5.0, 20],
        ADAMANT: ["ADAMANT", 10.0, 30],
        RUNE: ["RUNE", 20.0, 40],
        DRAGON: ["DRAGON", 50.0, 60]
    },
    // Materials used for Fletching: [name, cost_multiplier, required_level]
    FLETCHINGMAT: {
        NORMAL: ["NORMAL", 1.0, 1],
        OAK: ["OAK", 1.5, 10],
        WILLOW: ["WILLOW", 2.0, 20],
        MAPLE: ["MAPLE", 5.0, 30],
        YEW: ["YEW", 10.0, 40],
        MAGIC: ["MAGIC", 25.0, 50]
    },
    // Melee weapons [name, base_cost, material_type]
    MELEEWEAPON: {
        DAGGER: ["DAGGER", 50, "SMITHINGMAT"],
        LONGSWORD: ["LONGSWORD", 200, "SMITHINGMAT"],
        SCIMITAR: ["SCIMITAR", 500, "SMITHINGMAT"],
        // WARHAMMER: ["WARHAMMER", 1000, "SMITHINGMAT"],
        // BATTLEAXE: ["BATTLEAXE", 1500, "SMITHINGMAT"],
        // HALBERD: ["HALBERD", 2000, "SMITHINGMAT"],
        // SPEAR: ["SPEAR", 3000, "SMITHINGMAT"],
        // CLAWS: ["CLAWS", 4000, "SMITHINGMAT"],
        // TWOHAND: ["TWOHAND", 5000, "SMITHINGMAT"]
        // MAUL: ["MAUL", 15000, "SPECIAL"]
    },
    // Ranged weapons [name, base_cost, material_type]
    RANGEDWEAPON: {  
        // Ranged weapons made from normal fletching materials:
        SHORTBOW: ["SHORTBOW", 100, "FLETCHINGMAT"],
        LONGBOW: ["LONGBOW", 100, "FLETCHINGMAT"],
        // COMPBOW: ["COMPBOW", 1000, "FLETCHINGMAT"],
        // Ranged weapons made from normal smithing materials:
        CROSSBOW: ["CROSSBOW", 5000, "SMITHINGMAT"],
        // KNIFE: ["KNIFE", 10, "SMITHINGMAT"],
        // DART: ["DART", 10, "SMITHINGMAT"],
        // THROWNAXE: ["THROWNAXE", 25, "SMITHINGMAT"],
        // Ranged items from godwars, slayer, etc: [name, base_cost]
        // CHINCHOMPA: ["CHINCHOMPA", 100, "SPECIAL"],
        // DARKBOW: ["DARKBOW", 100000, "SPECIAL"],
        // LIGHTBALLISTA: ["LIGHTBALLISTA", 100000, "SPECIAL"],
        // HEAVYBALLISTA: ["HEAVYBALLISTA", 500000, "SPECIAL"],
        // BLOWPIPE: ["BLOWPIPE", 100000, "SPECIAL"]
    },
    MAGICWEAPON: {
        // Magic items from godwars, slayer, etc: [name, base_cost]
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
    // Tools [name, base_cost]
    TOOLS: {
        AXE: ["AXE", 100],
        PICKAXE: ["PICKAXE", 100]
    },
    CONSUMABLES: {}
}