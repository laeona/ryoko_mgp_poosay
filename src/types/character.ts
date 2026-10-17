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
    personalityTrait?: string;
    ideal?: string;
    bond?: string;
    flaw?: string;
    /** Which starting equipment option was taken, so it isn't added twice. */
    equipmentChoice?: 'package' | 'gold';
  };
  feats: string[];
  /** Choices made for feats (e.g. which ability a feat increases), keyed by feat name. */
  featChoices?: Record<string, string>;
  spellcasting?: SpellcastingData;
  bender?: BenderData;
  tamer?: TamerData;
  advancedTechniques: string[];
  martialLevel: number;
  inventory: InventoryItem[];
  prostheses: string[];
  currency: { gp: number; sp: number; cp: number };
  combat: CombatData;
  resources: Resource[];
  features: Feature[];
  skillProficiencies: string[];
  skillExpertise: string[];
  notes: string;
  backstory: string;
  activeTab: string;
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
  cr: number; // use 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge';
  maxHP: number;
  currentHP: number;
  tempHP?: number;
  ac: number;
  speed: string;
  improvements: string[];
  /** Bespoke familiar id (see data/familiars.ts). When set, stats are calculated automatically. */
  familiarId?: string;
  /** Improvement ids learned by a bespoke familiar (its free bonus improvement is implicit). */
  learnedImprovements?: string[];
  senseiStrikes?: number;
  senseiTechniques?: string[];
  notes: string;
}

export type ItemCategory =
  | 'weapon'
  | 'armor'
  | 'gear'
  | 'magic'
  | 'prosthesis'
  | 'other';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  notes: string;
  category?: ItemCategory;
  equipped?: boolean;
  attuned?: boolean;
  description?: string;
  damage?: string;
  properties?: string[];
  /** Where the item came from, e.g. 'background' for starting equipment. */
  source?: string;
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
  hpRolledValues: number[];
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

// Race-related types

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type AbilityScoreKey = keyof AbilityScores;

export interface RacialTrait {
  name: string;
  description: string;
}

export interface RacialChoice {
  id: string;
  label: string;
  type: 'select' | 'multi-select';
  count?: number;
  options: string[];
}

export interface Subrace {
  name: string;
  abilityScoreIncrease: Partial<AbilityScores>;
  size?: string;
  speed?: number;
  speedDescription?: string;
  traits: RacialTrait[];
  choices?: RacialChoice[];
}

export interface Race {
  name: string;
  description: string;
  abilityScoreIncrease: Partial<AbilityScores>;
  age: string;
  anatomy: string;
  size: string;
  speed: number;
  speedDescription?: string;
  creatureType: string;
  languages: string;
  traits: RacialTrait[];
  choices?: RacialChoice[];
  subraces?: Subrace[];
  /** Some races (e.g., Tatsumi) have a subrace-level choice like "Koi Dragon Colour" */
  preSubraceChoice?: RacialChoice;
}

// Class-related types

export interface ClassFeature {
  level: number;
  name: string;
  description: string;
}

export interface Subclass {
  name: string;
  description: string;
  features: ClassFeature[];
}

export interface ClassSpellcasting {
  type: 'full' | 'half' | 'third' | 'pact' | 'none';
  ability: 'intelligence' | 'wisdom' | 'charisma' | 'choice';
  ritual?: boolean;
  focus?: string;
}

export interface ClassChoice {
  id: string;
  label: string;
  type: 'select' | 'multi-select';
  count?: number;
  options: string[];
  /** Level at which this choice is made */
  level: number;
}

export interface DnDClass {
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoices: { count: number; options: string[] };
  subclassLevel: number;
  subclassLabel?: string;
  features: ClassFeature[];
  subclasses: Subclass[];
  choices?: ClassChoice[];
  spellcasting?: ClassSpellcasting;
  martialTier: 'full' | 'half' | 'none';
}

// Background types

export interface DnDBackground {
  name: string;
  description: string;
  suggestedAbilityScores: AbilityScoreKey[];
  optionalLanguage: string;
  featSuggestions: string[];
  skillProficiencies: string[];
  toolProficiency: string;
  equipment: string;
  optionalFeature: {
    name: string;
    description: string;
  };
  /** Personality/Ideal/Bond/Flaw tables (d6 rolls) */
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

// Feat types

export interface DnDFeat {
  name: string;
  description: string;
  prerequisite?: string;
  type: 'general' | 'racial';
  /** Ability scores this feat can increase by 1 (max 20). One option = automatic; several = player picks. */
  abilityIncrease?: AbilityScoreKey[];
  /** Skill proficiencies the player picks for this feat (options omitted = any skill). */
  skillChoices?: { count: number; options?: string[] };
  /** Feat grants a saving throw proficiency of the player's choice. */
  savingThrowChoice?: boolean;
  /** Feat doubles proficiency (expertise) in the chosen skill. */
  skillExpertise?: boolean;
  /** For racial feats only: which race/subrace qualifies */
  racialRequirement?: {
    race: string;
    subrace?: string;
  };
}

// Spell types

export type SpellSchool =
  | 'Abjuration'
  | 'Biomancy'
  | 'Conjuration'
  | 'Divination'
  | 'Enchantment'
  | 'Evocation'
  | 'Illusion'
  | 'Necromancy'
  | 'Transmutation';

export interface DnDSpell {
  name: string;
  level: number; // 0 for cantrips
  school: SpellSchool;
  castingTime: string;
  range: string;
  components: string; // e.g., "V, S", "V, S, M (a bit of fleece)"
  duration: string;
  concentration: boolean;
  ritual: boolean;
  classes: string[]; // class names that have this spell
  description: string;
  /** Bender-only: which elemental affinity list this spell belongs to */
  benderElement?: 'air' | 'earth' | 'fire' | 'water';
  /** Higher-level cast notes, e.g., "At Higher Levels. ..." */
  atHigherLevels?: string;
}

// Advanced Weapon Mastery types

export type WeaponProperty =
  | 'Ammunition'
  | 'Finesse'
  | 'Heavy'
  | 'Impact'
  | 'Light'
  | 'Loading'
  | 'Pugilist'
  | 'Reach'
  | 'Scourge'
  | 'Shield'
  | 'Thrown'
  | 'Versatile';

export interface AdvancedTechnique {
  /** Unique key — use `${tree}-t${tier}-${kebab-name}` */
  id: string;
  name: string;
  description: string;
  tier: 1 | 2 | 3 | 4;
  tree: WeaponProperty;
  prerequisite?: string;
}
