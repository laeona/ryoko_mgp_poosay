export interface Character {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  level: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  race: {
    name: string;
    subrace?: string;
    choices: Record<string, string | string[]>;
  };
  classes: ClassLevel[];
  background: {
    name: string;
    skills: string[];
    tools: string[];
    languages: string[];
  };
  feats: string[];
  spellcasting?: SpellcastingData;
  bender?: BenderData;
  tamer?: TamerData;
  advancedTechniques: string[];
  martialLevel: number;
  inventory: InventoryItem[];
  prostheses: string[];
  combat: CombatData;
  resources: Resource[];
  features: Feature[];
  notes: string;
  backstory: string;
}

export interface ClassLevel {
  className: string;
  subclass?: string;
  level: number;
  choices: Record<string, string | string[]>;
}

export interface SpellcastingData {
  ability: 'intelligence' | 'wisdom' | 'charisma';
  spellSlots: Record<number, { max: number; used: number }>;
  spellsKnown: string[];
  cantripsKnown: string[];
}

export interface BenderData {
  affinities: Array<'air' | 'earth' | 'fire' | 'water'>;
  discipline?: string;
}

export interface TamerData {
  companions: Companion[];
  activeCompanionId?: string;
  paradigm?: string;
}

export interface Companion {
  id: string;
  name: string;
  creatureType: string;
  cr: number;
  maxHP: number;
  currentHP: number;
  ac: number;
  improvements: string[];
  notes: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  notes: string;
}

export interface CombatData {
  maxHP: number;
  currentHP: number;
  tempHP: number;
  hitDiceTotal: number;
  hitDiceUsed: number;
  armorClass: number;
  initiative: number;
  speed: number;
  conditions: string[];
}

export interface Resource {
  id: string;
  name: string;
  max: number;
  used: number;
  rechargeOn: 'short' | 'long' | 'dawn' | 'none';
}

export interface Feature {
  id: string;
  name: string;
  source: string;
  description: string;
}