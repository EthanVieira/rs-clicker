export const MATERIALS = {
    // Materials used for Smithing: [name, cost_multiplier, required_level]
    ORE: {
        Bronze: {
            name: "Bronze",
            cost_mult: 1.0,
            level: 1
        },
        Iron: {
            name: "Iron",
            cost_mult: 1.5,
            level: 5
        },
        Steel: {
            name: "Steel",
            cost_mult: 2.0,
            level: 10
        },
        Mithril: {
            name: "Mithril",
            cost_mult: 5.0,
            level: 20
        },
        Adamant: {
            name: "Adamant",
            cost_mult: 10.0,
            level: 30
        },
        Rune: {
            name: "Rune",
            cost_mult: 20.0,
            level: 40
        },
        Dragon: {
            name: "Dragon",
            cost_mult: 50.0,
            level: 60
        }
    },
    // Materials used for Fletching: [name, cost_multiplier, required_level]
    WOOD: {
        Normal: {
            name: "Normal",
            hideName: true,
            cost_mult: 1.0,
            level: 1
        },
        Oak: {
            name: "Oak",
            cost_mult: 1.5,
            level: 10
        },
        Willow: {
            name: "Willow",
            cost_mult: 2.0,
            level: 20
        },
        Maple: {
            name: "Maple",
            cost_mult: 5.0,
            level: 30
        },
        Yew: {
            name: "Yew",
            cost_mult: 10.0,
            level: 40
        },
        Magic: {
            name: "Magic",
            cost_mult: 25.0,
            level: 50
        }
    },
    BONE: {
        Normal: {
            name: "Normal",
            hideName: true,
            cost_mult: 1.0,
            prayerXp: 5,
        },
        Big: {
            name: "Big",
            cost_mult: 10,
            prayerXp: 15
        }
    }
};
