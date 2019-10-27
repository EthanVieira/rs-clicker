export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
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
    // Materials used for Smithing: [name, required_level, cost]
    SMITHINGMAT: {
        BRONZE: ["BRONZE", 1, 1.0],
        IRON: ["IRON", 5, 1.5],
        STEEL: ["STEEL", 10, 2.0],
        MITHRIL: ["MITHRIL", 20, 5.0],
        ADAMANT: ["ADAMANT", 30, 10.0],
        RUNE: ["RUNE", 40, 20.0],
        DRAGON: ["DRAGON", 60, 50.0]
    },
    // Materials Used for Fletching: [name, required_level, cost_multiplier]
    FLETCHINGMAT: {
        NORMAL: ["NORMAL", 1, 1.0],
        OAK: ["OAK", 10, 1.5],
        WILLOW: ["WILLOW", 20, 2.0],
        MAPLE: ["MAPLE", 30, 5.0],
        YEW: ["YEW", 40, 10.0],
        MAGIC: ["MAGIC", 50, 25.0]
    },
    // Tools made from normal smithing materials: [name, base_cost]
    TOOLS: {
        // Tools
        AXE: ["AXE", 100],
        PICKAXE: ["PICKAXE", 100]
    },
    MELEEITEM: {
        // Melee items made from normal smithing materials: [name, base_cost]
        MELEESMITHINGITEM: {
            DAGGER: ["DAGGER", 50],
            LONGSWORD: ["LONGSWORD", 200],
            SCIMITAR: ["SCIMITAR", 500],
            // WARHAMMER: ["WARHAMMER", 1000],
            // BATTLEAXE: ["BATTLEAXE", 1500],
            // HALBERD: ["HALBERD", 2000],
            // SPEAR: ["SPEAR", 3000],
            // CLAWS: ["CLAWS", 4000],
            // TWOHAND: ["TWOHAND", 5000]
        },
        // Melee items made from normal fletching materials: [name, base_cost] (NONE CURRENTLY)
        MELEEFLETCHINGITEM: {},
        // Melee items from godwars, slayer, etc: [name, base_cost]
        MELEESPECIALITEM: {
            MAUL: ["MAUL", 15000]
        }
    },
    RANGEDITEM: {  
        // Ranged items made from normal smithing materials: [name, base_cost]
        RANGEDSMITHINGITEM: {
            CROSSBOW: ["CROSSBOW", 5000],
            KNIFE: ["KNIFE", 10],
            DART: ["DART", 10],
            THROWNAXE: ["THROWNAXE", 25]
        },
        // Ranged items made from normal fletching materials: [name, base_cost]
        RANGEDFLETCHINGITEM: {
            SHORTBOW: ["SHORTBOW", 100],
            LONGBOW: ["LONGBOW", 100],
            COMPBOW: ["COMPBOW", 1000]
        },
        // Ranged items from godwars, slayer, etc: [name, base_cost]
        RANGEDSPECIALITEM: {
            CHINCHOMPA: ["CHINCHOMPA", 100],
            DARKBOW: ["DARKBOW", 100000],
            LIGHTBALLISTA: ["LIGHTBALLISTA", 100000],
            HEAVYBALLISTA: ["HEAVYBALLISTA", 500000],
            BLOWPIPE: ["BLOWPIPE", 100000]
        }
    },
    MAGICITEM: {
        // Magic items made from normal smithing materials: [name, base_cost] (NONE CURRENTLY)
        MAGICSMITHINGITEM: {},
        // Magic items made from normal fletching materials: [name, base_cost] (NONE CURRENTLY)
        MAGICFLETCHINGITEM: {},
        // Magic items from godwars, slayer, etc: [name, base_cost]
        MAGICSPECIALITEM: {
            STAFF: ["STAFF", 100],
            AIRSTAFF: ["AIRSTAFF", 250],
            EARTHSTAFF: ["EARTHSTAFF", 250],
            FIRESTAFF: ["FIRESTAFF", 250],
            WATERSTAFF: ["WATERSTAFF", 250],
            BATTLESTAFF: ["BATTLESTAFF", 1000],
            MYSTICSTAFF: ["MYSTICSTAFF", 5000],
            ANCIENTSTAFF: ["ANCIENTSTAFF", 10000],
            GUTHIXSTAFF: ["GUTHIXSTAFF", 25000],
            SARADOMINSTAFF: ["SARADOMINSTAFF", 25000],
            ZAMORAKSTAFF: ["ZAMORAKSTAFF", 25000],
            LUNARSTAFF: ["LUNARSTAFF", 40000],
            AHRIMSTAFF: ["AHRIMSTAFF", 100000],
            TRIDENT: ["TRIDENT", 150000]
        },
    }
}