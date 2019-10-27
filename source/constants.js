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
    // Materials used for smithing and their cost multipliers
    SMITHINGMAT: {
        BRONZE: ["BRONZE", 1.0],
        IRON: ["IRON", 1.5],
        STEEL: ["STEEL", 2.0],
        MITHRIL: ["MITHRIL", 5.0],
        ADAMANT: ["ADAMANT", 10.0],
        RUNE: ["RUNE", 20.0],
        DRAGON: ["DRAGON", 50.0]
    },
    // Materials Used for Fletching
    FLETCHINGMAT: {
        OAK: ["OAK", 1.0],
        WILLOW: ["WILLOW", 2.0],
        MAPLE: ["MAPLE", 5.0],
        YEW: ["YEW", 10.0],
        MAGIC: ["MAGIC", 25.0]
    },
    // Tools made from normal smithing materials (bronze -> iron -> steel -> ...)
    TOOLS: {
        // Tools
        AXE: ["AXE", 100],
        PICKAXE: ["PICKAXE", 100]
    },
    MELEEITEM: {
        // Melee items made from normal smithing materials (bronze -> iron -> steel -> ...)
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
        // Melee items not made from normal smithing/fletching materials (godwars items, slayer items, etc.)
        MELEESPECIALITEM: {
            MAUL: "MAUL"
        }
    },
    RANGEDITEM: {  
        // Ranged items made from normal smithing materials (bronze -> iron -> steel -> ...)
        RANGEDSMITHINGITEM: {
            CROSSBOW: ["CROSSBOW", 5000],
            KNIFE: ["KNIFE", 10],
            DART: ["DART", 10],
            THROWNAXE: ["THROWNAXE", 25]
        },
        // Ranged items made from normal fletching materials (oak -> willow -> maple -> ...)
        RANGEDFLETCHINGITEM: {
            SHORTBOW: ["SHORTBOW", 100],
            LONGBOW: ["LONGBOW", 100],
            COMPBOW: ["COMPBOW", 1000]
        },
        // Ranged items not made from normal smithing/fletching materials (godwars items, slayer items, etc.)
        RANGEDSPECIALITEM: {
            CHINCHOMPA: ["CHINCHOMPA", 100],
            DARKBOW: ["DARKBOW", 100000],
            LIGHTBALLISTA: ["LIGHTBALLISTA", 100000],
            HEAVYBALLISTA: ["HEAVYBALLISTA", 500000],
            BLOWPIPE: ["BLOWPIPE", 100000]
        }
    },
    MAGICITEM: {
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
    }
}