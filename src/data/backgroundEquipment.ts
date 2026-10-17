import type { Character, InventoryItem, ItemCategory } from '../types/character';
import { ITEM_GROUPS } from './items';
import { getBackground } from './backgrounds';

export interface StartingItem {
  name: string;
  quantity?: number;
  category?: ItemCategory;
  weight?: number;
  description?: string;
  /** This slot is filled with the tool the player chose for their tool proficiency. */
  toolChoice?: boolean;
}

export interface BackgroundEquipment {
  /** When set, the player picks one of these as their tool proficiency. */
  toolOptions?: string[];
  items: StartingItem[];
  gold: number;
}

export const ARTISAN_TOOLS = [
  "Alchemist's supplies",
  "Brewer's supplies",
  "Calligrapher's supplies",
  "Carpenter's tools",
  "Cartographer's tools",
  "Cobbler's tools",
  "Cook's utensils",
  "Glassblower's tools",
  "Jeweler's tools",
  "Leatherworker's tools",
  "Mason's tools",
  "Painter's supplies",
  "Potter's tools",
  "Smith's tools",
  "Tinker's tools",
  "Weaver's tools",
  "Woodcarver's tools",
];

export const GAMING_SETS = [
  'Dice set',
  'Go set',
  'Shogi set',
  'Hanafuda cards',
  'Playing cards',
];

export const ALTERNATIVE_GOLD = 50;

const CLOTHES: StartingItem = { name: "Traveler's clothes", category: 'gear', weight: 4 };
const POUCH: StartingItem = { name: 'Pouch', category: 'gear', weight: 1 };

export const BACKGROUND_EQUIPMENT: Record<string, BackgroundEquipment> = {
  Elementalist: {
    toolOptions: ARTISAN_TOOLS,
    items: [{ name: '', toolChoice: true, category: 'gear', weight: 5 }, { name: 'Backpack' }, CLOTHES, { name: "Healer's Kit" }],
    gold: 15,
  },
  'Hanabi Engineer': {
    toolOptions: ARTISAN_TOOLS,
    items: [
      { name: '', toolChoice: true, category: 'gear', weight: 5 },
      { ...POUCH, quantity: 2 },
      CLOTHES,
      {
        name: 'Basic prosthesis (integrated weapon)',
        category: 'prosthesis',
        weight: 5,
        description: 'Starting prosthesis with an integrated weapon.',
      },
    ],
    gold: 5,
  },
  'Kaiju Tracker': {
    items: [
      { name: 'Herbalism Kit' },
      { name: 'Backpack' },
      CLOTHES,
      { name: 'Hunting trap', category: 'gear', weight: 25 },
      { name: 'Grappling hook prosthesis', category: 'prosthesis', weight: 4 },
      { name: 'Rope (50 ft, hempen)' },
    ],
    gold: 5,
  },
  'Raised by Yokai': {
    items: [
      { name: 'Dagger' },
      { name: "Poisoner's kit", category: 'gear', weight: 2 },
      { ...POUCH, quantity: 2 },
      CLOTHES,
      { name: 'Lamp', category: 'gear', weight: 1 },
      { name: 'Vial of basic poison', category: 'gear', weight: 0.1 },
      { name: 'Rare gem', category: 'other', weight: 0, description: 'Worth 10 gp.' },
    ],
    gold: 0,
  },
  'Shrine Keeper': {
    items: [
      { name: "Calligrapher's supplies", category: 'gear', weight: 5 },
      { name: 'Ceremonial robes', category: 'gear', weight: 4 },
      { name: 'Small bell', category: 'gear', weight: 0.5 },
      { name: 'Incense (bundle)', category: 'gear', weight: 0.5 },
      { name: 'Prayer-slip book', category: 'gear', weight: 1 },
    ],
    gold: 10,
  },
  'Wandering Ronin': {
    toolOptions: GAMING_SETS,
    items: [
      { name: '', toolChoice: true, category: 'gear', weight: 1 },
      { name: 'Travel-worn cloak', category: 'gear', weight: 4 },
      { name: 'Bedroll' },
      { name: 'Lantern (hooded)' },
      { name: 'Whetstone', category: 'gear', weight: 1 },
    ],
    gold: 8,
  },
  'Kabuki Performer': {
    items: [
      { name: 'Disguise kit', category: 'gear', weight: 3 },
      { name: 'Stage costume', category: 'gear', weight: 4 },
      { name: 'Painted mask', category: 'gear', weight: 1 },
      { name: 'Folding fan', category: 'gear', weight: 0.5 },
      { name: 'Face paints', category: 'gear', weight: 1 },
    ],
    gold: 12,
  },
  'Floating Market Trader': {
    items: [
      { name: "Navigator's tools", category: 'gear', weight: 2 },
      { name: 'Small abacus', category: 'gear', weight: 1 },
      { name: 'Lacquered strongbox', category: 'gear', weight: 3 },
      { name: 'Fine clothes', category: 'gear', weight: 6 },
      { name: 'Trade goods (sampler)', category: 'other', weight: 5 },
    ],
    gold: 15,
  },
  'Mountain Hermit': {
    items: [
      { name: 'Herbalism Kit' },
      { name: 'Walking staff', category: 'gear', weight: 4 },
      { name: 'Sturdy cloak', category: 'gear', weight: 3 },
      { name: 'Clay teapot', category: 'gear', weight: 2 },
      { name: 'Scroll case of notes', category: 'gear', weight: 1 },
    ],
    gold: 5,
  },
  'Yokai Hunter': {
    items: [
      { name: "Poisoner's kit", category: 'gear', weight: 2 },
      { name: 'Rope (50 ft, hempen)' },
      { name: 'Paper wards (set)', category: 'gear', weight: 0.5 },
      { name: 'Notebook of sketched creatures', category: 'gear', weight: 1 },
      { name: "Hunter's cloak", category: 'gear', weight: 4 },
    ],
    gold: 10,
  },
};

/** The tool proficiencies a character's background gives. */
export function getBackgroundTools(character: Character): string[] {
  const bg = getBackground(character.background.name);
  if (!bg) return [];
  const eq = BACKGROUND_EQUIPMENT[bg.name];
  if (eq?.toolOptions) return character.background.tools.slice(0, 1);
  // "Herbalism kit", "Disguise kit"... fixed tool: strip any leading "A"/"One" wording
  return [bg.toolProficiency];
}

function findTemplate(name: string) {
  const lower = name.toLowerCase();
  for (const group of ITEM_GROUPS) {
    const hit = group.items.find((i) => i.name.toLowerCase() === lower);
    if (hit) return hit;
  }
  return undefined;
}

/** Inventory items for a background's starting equipment package. */
export function buildStartingItems(
  backgroundName: string,
  chosenTool?: string
): Array<Omit<InventoryItem, 'id'>> {
  const eq = BACKGROUND_EQUIPMENT[backgroundName];
  if (!eq) return [];
  return eq.items.map((it) => {
    const name = it.toolChoice ? chosenTool || 'Tool (choose on the Background tab)' : it.name;
    const tmpl = findTemplate(name);
    return {
      name: tmpl?.name ?? name,
      quantity: it.quantity ?? 1,
      weight: it.weight ?? tmpl?.weight ?? 1,
      notes: '',
      category: it.category ?? tmpl?.category ?? 'gear',
      description: it.description ?? tmpl?.description,
      damage: tmpl?.damage,
      properties: tmpl?.properties,
      source: 'background',
    };
  });
}
