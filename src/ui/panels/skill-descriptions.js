export function getSkillDescription(skill) {
    let description = "",
        body = "";

    switch (skill) {
        case "attack":
            description += "Increase melee damage and accuracy.\n";
            description += "Equip stronger melee weapons.";
            body += "Lv 1: Equip bronze weapons\n";
            body += "Lv 5: Equip steel weapons\n";
            break;
        case "ranged":
            description += "Increase ranged damage and accuracy.\n";
            description += "Equip stronger ranged weapons.";
            body += "Lv 1: Equip normal wood bows\n";
            body += "Lv 1: Equip bronze knives\n";
            body += "Lv 5: Equip oak bows\n";
            body += "Lv 5: Equip steel knives\n";
            break;
        case "magic":
            description += "Increase magic damage and accuracy.\n";
            description += "Equip stronger magic weapons.";
            body += "Lv 1: Equip staff\n";
            body += "Lv 5: Equip magic staff\n";
            body += "Lv 10: Equip staff of air\n";
            body += "Lv 15: Equip staff of earth\n";
            body += "Lv 20: Equip staff of water\n";
            body += "Lv 25: Equip staff of fire\n";
            break;
        case "fletching":
            description = "Create ranged weapons using a knife\nand logs";
            body += "Lv 1: Shortbow (50 Logs)\n";
            body += "Lv 5: Oak Shortbow (50 Oak Logs)\n";
            break;
        case "woodcutting":
            description += "Chop down stronger trees, faster.\n";
            description += "Use stronger axes.";
            body += "Lv 1: Normal trees\n";
            body += "Lv 1: Equip bronze axes\n";
            body += "Lv 5: Oak trees\n";
            body += "Lv 5: Equip steel axes\n";
            break;
        default:
            description = "Not currently supported";
            break;
    }
    return { description, body };
}
