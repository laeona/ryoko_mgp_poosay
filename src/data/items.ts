import type { ItemCategory } from '../types/character';

export interface ItemTemplate {
  name: string;
  category: ItemCategory;
  weight: number;
  cost?: string;
  damage?: string;
  properties?: string[];
  description?: string;
}

export const WEAPONS: ItemTemplate[] = [
  // Simple Melee
  { name: 'Club', category: 'weapon', weight: 2, damage: '1d4 bludgeoning', properties: ['Light'] },
  { name: 'Dagger', category: 'weapon', weight: 1, damage: '1d4 piercing', properties: ['Finesse', 'Light', 'Thrown (20/60)'] },
  { name: 'Greatclub', category: 'weapon', weight: 10, damage: '1d8 bludgeoning', properties: ['Two-handed'] },
  { name: 'Handaxe', category: 'weapon', weight: 2, damage: '1d6 slashing', properties: ['Light', 'Thrown (20/60)'] },
  { name: 'Javelin', category: 'weapon', weight: 2, damage: '1d6 piercing', properties: ['Thrown (30/120)'] },
  { name: 'Light Hammer', category: 'weapon', weight: 2, damage: '1d4 bludgeoning', properties: ['Light', 'Thrown (20/60)'] },
  { name: 'Mace', category: 'weapon', weight: 4, damage: '1d6 bludgeoning', properties: [] },
  { name: 'Quarterstaff', category: 'weapon', weight: 4, damage: '1d6 bludgeoning', properties: ['Versatile (1d8)'] },
  { name: 'Sickle', category: 'weapon', weight: 2, damage: '1d4 slashing', properties: ['Light'] },
  { name: 'Spear', category: 'weapon', weight: 3, damage: '1d6 piercing', properties: ['Thrown (20/60)', 'Versatile (1d8)'] },
  // New Ryoko's Guide simple
  { name: 'Claw', category: 'weapon', weight: 2, damage: '1d6 slashing', properties: ['Attached', 'Light'] },
  { name: 'Knuckle Duster', category: 'weapon', weight: 1, damage: '1d4 bludgeoning', properties: ['Attached', 'Light', 'Pugilist'] },
  { name: 'Spiked Cestus', category: 'weapon', weight: 2, damage: '1d6 bludgeoning', properties: ['Adaptable (piercing)', 'Attached', 'Pugilist'] },
  { name: 'Tonfa', category: 'weapon', weight: 2, damage: '1d6 bludgeoning', properties: ['Light', 'Parry'] },
  { name: 'War Crescent', category: 'weapon', weight: 3, damage: '1d6 slashing', properties: ['Versatile (1d8)'] },
  // Martial Melee
  { name: 'Battleaxe', category: 'weapon', weight: 4, damage: '1d8 slashing', properties: ['Versatile (1d10)'] },
  { name: 'Flail', category: 'weapon', weight: 2, damage: '1d8 bludgeoning', properties: [] },
  { name: 'Glaive', category: 'weapon', weight: 6, damage: '1d10 slashing', properties: ['Heavy', 'Reach', 'Two-handed'] },
  { name: 'Greataxe', category: 'weapon', weight: 7, damage: '1d12 slashing', properties: ['Heavy', 'Two-handed'] },
  { name: 'Greatsword', category: 'weapon', weight: 6, damage: '2d6 slashing', properties: ['Heavy', 'Two-handed'] },
  { name: 'Halberd', category: 'weapon', weight: 6, damage: '1d10 slashing', properties: ['Heavy', 'Reach', 'Two-handed'] },
  { name: 'Lance', category: 'weapon', weight: 6, damage: '1d12 piercing', properties: ['Reach', 'Special'] },
  { name: 'Longsword', category: 'weapon', weight: 3, damage: '1d8 slashing', properties: ['Versatile (1d10)'] },
  { name: 'Maul', category: 'weapon', weight: 10, damage: '2d6 bludgeoning', properties: ['Heavy', 'Two-handed'] },
  { name: 'Morningstar', category: 'weapon', weight: 4, damage: '1d8 piercing', properties: [] },
  { name: 'Pike', category: 'weapon', weight: 18, damage: '1d10 piercing', properties: ['Heavy', 'Reach', 'Two-handed'] },
  { name: 'Rapier', category: 'weapon', weight: 2, damage: '1d8 piercing', properties: ['Finesse'] },
  { name: 'Scimitar', category: 'weapon', weight: 3, damage: '1d6 slashing', properties: ['Finesse', 'Light'] },
  { name: 'Shortsword', category: 'weapon', weight: 2, damage: '1d6 piercing', properties: ['Finesse', 'Light'] },
  { name: 'Trident', category: 'weapon', weight: 4, damage: '1d6 piercing', properties: ['Thrown (20/60)', 'Versatile (1d8)'] },
  { name: 'War Pick', category: 'weapon', weight: 2, damage: '1d8 piercing', properties: ['Versatile (1d10)'] },
  { name: 'Warhammer', category: 'weapon', weight: 2, damage: '1d8 bludgeoning', properties: ['Versatile (1d10)'] },
  { name: 'Whip', category: 'weapon', weight: 3, damage: '1d4 slashing', properties: ['Finesse', 'Scourge'] },
  // New Ryoko's Guide martial
  { name: 'Chakram', category: 'weapon', weight: 1, damage: '1d4 slashing', properties: ['Finesse', 'Light', 'Thrown (30/90)', 'Thrown Versatility (1d6)'] },
  { name: 'Kusarigama', category: 'weapon', weight: 2, damage: '1d4 slashing', properties: ['Special: Counterweight', 'Versatile (1d6)'] },
  { name: 'Meteor Hammer', category: 'weapon', weight: 3, damage: '1d6 bludgeoning', properties: ['Finesse', 'Scourge', 'Two-handed'] },
  { name: 'Nunchaku', category: 'weapon', weight: 2, damage: '1d6 bludgeoning', properties: ['Finesse', 'Special: Flourish', 'Versatile (1d8)'] },
  { name: 'Rope Dart', category: 'weapon', weight: 3, damage: '1d6 piercing', properties: ['Finesse', 'Scourge', 'Two-handed'] },
  { name: 'Sai', category: 'weapon', weight: 1, damage: '1d4 piercing', properties: ['Finesse', 'Light', 'Parry'] },
  { name: 'Tessen', category: 'weapon', weight: 1, damage: '1d4 slashing', properties: ['Adaptable (bludgeoning)', 'Finesse', 'Light', 'Special: Fan Shield'] },
  { name: 'Twinblade', category: 'weapon', weight: 6, damage: '1d6 slashing', properties: ['Heavy', 'Reach', 'Two-handed'] },
  // Ranged
  { name: 'Light Crossbow', category: 'weapon', weight: 5, damage: '1d8 piercing', properties: ['Ammunition (80/320)', 'Loading', 'Two-handed'] },
  { name: 'Hand Crossbow', category: 'weapon', weight: 3, damage: '1d6 piercing', properties: ['Ammunition (30/120)', 'Light', 'Loading'] },
  { name: 'Heavy Crossbow', category: 'weapon', weight: 18, damage: '1d10 piercing', properties: ['Ammunition (100/400)', 'Heavy', 'Loading', 'Two-handed'] },
  { name: 'Longbow', category: 'weapon', weight: 2, damage: '1d8 piercing', properties: ['Ammunition (150/600)', 'Heavy', 'Two-handed'] },
  { name: 'Shortbow', category: 'weapon', weight: 2, damage: '1d6 piercing', properties: ['Ammunition (80/320)', 'Two-handed'] },
  { name: 'Blowgun', category: 'weapon', weight: 1, damage: '1 piercing', properties: ['Ammunition (25/100)', 'Loading'] },
  { name: 'Sling', category: 'weapon', weight: 0, damage: '1d4 bludgeoning', properties: ['Ammunition (30/120)'] },
  { name: 'Dart', category: 'weapon', weight: 0.25, damage: '1d4 piercing', properties: ['Finesse', 'Thrown (20/60)'] },
  { name: 'Net', category: 'weapon', weight: 3, damage: '—', properties: ['Special', 'Thrown (5/15)'] },
  { name: 'Shuriken', category: 'weapon', weight: 0.25, damage: '1d4 piercing', properties: ['Finesse', 'Light', 'Thrown (20/60)'] },
  { name: 'Ödzutsu', category: 'weapon', weight: 25, damage: '2d10 bludgeoning', properties: ['Ammunition (150/600)', 'Two-handed', 'Special: Long Reload'] },
];

export const ARMOR: ItemTemplate[] = [
  // Light
  { name: 'Padded Armor', category: 'armor', weight: 8, properties: ['Light', 'AC 11 + DEX'] },
  { name: 'Leather Armor', category: 'armor', weight: 10, properties: ['Light', 'AC 11 + DEX'] },
  { name: 'Studded Leather', category: 'armor', weight: 13, properties: ['Light', 'AC 12 + DEX'] },
  // Medium
  { name: 'Hide Armor', category: 'armor', weight: 12, properties: ['Medium', 'AC 12 + DEX (max 2)'] },
  { name: 'Chain Shirt', category: 'armor', weight: 20, properties: ['Medium', 'AC 13 + DEX (max 2)'] },
  { name: 'Scale Mail', category: 'armor', weight: 45, properties: ['Medium', 'AC 14 + DEX (max 2)', 'Stealth Disadvantage'] },
  { name: 'Breastplate', category: 'armor', weight: 20, properties: ['Medium', 'AC 14 + DEX (max 2)'] },
  { name: 'Half Plate', category: 'armor', weight: 40, properties: ['Medium', 'AC 15 + DEX (max 2)', 'Stealth Disadvantage'] },
  // Heavy
  { name: 'Ring Mail', category: 'armor', weight: 40, properties: ['Heavy', 'AC 14', 'Stealth Disadvantage'] },
  { name: 'Chain Mail', category: 'armor', weight: 55, properties: ['Heavy', 'AC 16', 'STR 13', 'Stealth Disadvantage'] },
  { name: 'Splint Armor', category: 'armor', weight: 60, properties: ['Heavy', 'AC 17', 'STR 15', 'Stealth Disadvantage'] },
  { name: 'Plate Armor', category: 'armor', weight: 65, properties: ['Heavy', 'AC 18', 'STR 15', 'Stealth Disadvantage'] },
  // Shield
  { name: 'Shield', category: 'armor', weight: 6, properties: ['+2 AC'] },
];

export const GEAR: ItemTemplate[] = [
  // Ryoko's Guide additions
  { name: 'Fire Charge', category: 'gear', weight: 2, cost: '5 gp', description: 'Attach to a polearm to make a firelance. Bonus action ignite; next attack detonates for 1d10 fire + 1d10 piercing (DC 13 DEX half).' },
  { name: 'Firecrackers', category: 'gear', weight: 0.25, cost: '1 gp', description: 'Action: light and throw at a point within 30 ft. Loud noise; investigating creatures have disadvantage on Perception.' },
  { name: 'Hookshot', category: 'gear', weight: 5, cost: '50 gp', description: 'Bonus action or reaction when falling: shoot hook at fixed surface within 30 ft. Also usable to attach to a Large+ creature.' },
  { name: 'Ödzutsu Shot (20)', category: 'gear', weight: 4, cost: '10 gp', description: 'Ammunition for the ödzutsu.' },
  { name: 'Parachute', category: 'gear', weight: 15, cost: '50 gp', description: 'Reaction when falling 100+ ft: slow descent to 60 ft/round, no fall damage. Refolding takes 10 min.' },
  { name: 'Smokebomb', category: 'gear', weight: 0.2, cost: '25 gp', description: 'Action: 5-ft radius heavily obscured smoke within 30 ft. Lasts until end of your next turn or dispersed by moderate wind.' },
  // Essentials
  { name: 'Backpack', category: 'gear', weight: 5 },
  { name: 'Bedroll', category: 'gear', weight: 7 },
  { name: 'Rope (50 ft, hempen)', category: 'gear', weight: 10 },
  { name: 'Rope (50 ft, silk)', category: 'gear', weight: 5 },
  { name: 'Torch', category: 'gear', weight: 1 },
  { name: 'Lantern (hooded)', category: 'gear', weight: 2 },
  { name: 'Oil (flask)', category: 'gear', weight: 1 },
  { name: "Thieves' Tools", category: 'gear', weight: 1 },
  { name: "Herbalism Kit", category: 'gear', weight: 3 },
  { name: "Healer's Kit", category: 'gear', weight: 3 },
  { name: 'Potion of Healing', category: 'gear', weight: 0.5, description: 'Restores 2d4+2 HP.' },
  { name: 'Antitoxin', category: 'gear', weight: 0 },
  { name: 'Rations (1 day)', category: 'gear', weight: 2 },
  { name: 'Waterskin', category: 'gear', weight: 5 },
];

export const PROSTHESES: ItemTemplate[] = [
  // Mundane
  { name: 'Basic Prosthesis', category: 'prosthesis', weight: 5, description: 'Mundane replacement for a lost limb. No magical properties.' },
  { name: 'Advanced Prosthesis (Arm)', category: 'prosthesis', weight: 8, description: 'Mundane prosthesis with one integrated property (Blast, Hookshot, Integrated, Launch, Melee, Mobility, or Obscure).' },
  { name: 'Advanced Prosthesis (Leg)', category: 'prosthesis', weight: 10, description: 'As above, mounted on a leg.' },
  // Magical
  { name: 'All-Terrain Leg', category: 'prosthesis', weight: 8, description: 'Uncommon. Melee (1d6 slashing, Finesse, Hamstring). Modular: Blade/Claw/Fin forms for speed/climb/swim.' },
  { name: 'Draakannon', category: 'prosthesis', weight: 10, description: 'Uncommon. Arm prosthesis with Blast (1d6 fire, 20 ft). 4 charges. Draconic Versatility (change damage type). Blast Zone.' },
  { name: 'Earthpiercer', category: 'prosthesis', weight: 12, description: 'Uncommon. Arm prosthesis. Hookshot (20 ft), Launch (1d6 piercing), Melee (1d6, Impact). Tunneler (burrow 5 ft). Deep Drilling.' },
  { name: 'G.R.A.P.P.L.E.R.', category: 'prosthesis', weight: 6, description: 'Uncommon. Arm prosthesis. Hookshot (40 ft). Improved Hookshot (reel in). Hooked In (1d6 piercing attach/detach).' },
  { name: 'Hanabi Kicker', category: 'prosthesis', weight: 8, description: 'Rare. Leg prosthesis. Melee (1d6 bludgeoning, Pugilist, Reeling Blow). Pyrotechnic Kicks (1d6 fire, may blind). Rocket-Assisted Leap.' },
  { name: 'Helping Hand', category: 'prosthesis', weight: 5, description: 'Uncommon. Arm prosthesis. Hookshot (40 ft) with 3 puppets. Assistance at a Distance (Help action at range or feed potion).' },
  { name: 'Iron Kasa', category: 'prosthesis', weight: 10, description: 'Uncommon. Arm prosthesis. Hookshot (15 ft) with shield. Integrated (shield). Launch (1d6 bludgeoning). Saving Throw reaction.' },
  { name: 'Kageboshi', category: 'prosthesis', weight: 6, description: 'Uncommon. Arm prosthesis. Hookshot (30 ft), Launch (1d6 slashing, Battery Strike). Shadow Trick (throw extra Light/Thrown weapon).' },
  { name: "Reaper's Kama", category: 'prosthesis', weight: 8, description: 'Uncommon. Arm prosthesis. Hookshot (30 ft), Integrated (kusarigama), Launch (1d6 slashing). Slicestorm (4d6 slashing in 10 ft).' },
  { name: "Scorpion's Wartail", category: 'prosthesis', weight: 12, description: "Uncommon. Tail prosthesis. Melee (1d6 piercing, Scourge, Skewer). Reach 15 ft. Get Over Here! (pull target 10 ft)." },
  { name: 'Windweaver', category: 'prosthesis', weight: 6, description: 'Uncommon. Arm prosthesis. Blast (2d6 bludgeoning, 30 ft). Integrated (tessen). Stick the Landing (no fall damage).' },
  { name: 'Wraithclaw', category: 'prosthesis', weight: 4, description: 'Uncommon. Arm prosthesis. Hookshot (20 ft). Melee (2d6 necrotic, Pugilist, Flurry). Ghostly Reach (+5 ft). Hundred Claws.' },
];

export const MAGIC_ITEMS: ItemTemplate[] = [
  { name: 'Potion of Greater Healing', category: 'magic', weight: 0.5, description: 'Restores 4d4+4 HP.' },
  { name: 'Potion of Superior Healing', category: 'magic', weight: 0.5, description: 'Restores 8d4+8 HP.' },
  { name: '+1 Weapon', category: 'magic', weight: 0, description: '+1 to attack and damage rolls.' },
  { name: '+1 Shield', category: 'magic', weight: 6, description: '+1 AC in addition to normal shield bonus.' },
  { name: '+1 Armor', category: 'magic', weight: 0, description: '+1 AC while worn.' },
  { name: 'Bag of Holding', category: 'magic', weight: 15, description: 'Holds up to 500 lbs / 64 cubic ft. Weighs 15 lbs regardless.' },
  { name: 'Cloak of Protection', category: 'magic', weight: 1, description: '+1 AC and saving throws. Requires attunement.' },
  { name: 'Ring of Protection', category: 'magic', weight: 0, description: '+1 AC and saving throws. Requires attunement.' },
  { name: 'Boots of Elvenkind', category: 'magic', weight: 1, description: 'Advantage on Stealth checks for silent movement.' },
  { name: 'Bracers of Defense', category: 'magic', weight: 1, description: '+2 AC if not wearing armour or a shield. Requires attunement.' },
  { name: 'Amulet of Health', category: 'magic', weight: 1, description: 'CON score becomes 19. Requires attunement.' },
  { name: 'Cloak of Elvenkind', category: 'magic', weight: 1, description: 'Advantage on Stealth, disadvantage on Perception vs you. Requires attunement.' },
  { name: 'Winged Boots', category: 'magic', weight: 1, description: 'Flying speed equal to walking speed, up to 4 hours per day. Requires attunement.' },
  { name: 'Ring of Spell Storing', category: 'magic', weight: 0, description: 'Stores up to 5 levels of spells. Requires attunement.' },
  { name: 'Staff of Power', category: 'magic', weight: 4, description: '+2 weapon, +2 AC/saves/attack. 20 charges for various spells. Requires attunement by a spellcaster.' },
];

export interface ItemTemplateGroup {
  label: string;
  items: ItemTemplate[];
}

export const ITEM_GROUPS: ItemTemplateGroup[] = [
  { label: 'Weapons', items: WEAPONS },
  { label: 'Armor', items: ARMOR },
  { label: 'Adventuring Gear', items: GEAR },
  { label: 'Magic Items', items: MAGIC_ITEMS },
  { label: 'Prostheses', items: PROSTHESES },
];