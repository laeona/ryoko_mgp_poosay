import type { AbilityScoreKey } from '../types/character';

/** How a feat grants spells. Choices are stored in character.featChoices. */
export interface FeatSpellRule {
  feat: string;
  /** Cantrips the player picks. */
  cantrips?: number;
  /** 1st-level spells the player picks. */
  spells?: number;
  /** Picks come from these class spell lists. */
  classLists?: string[];
  /** Picks come from one element's list (Elemental Initiate). */
  elementPick?: boolean;
  /** Cantrip picks must involve a melee or unarmed attack (Magic of the Blade). */
  meleeOnly?: boolean;
  /** Cantrip picks come from this fixed list (Spell Sniper). */
  cantripOptions?: string[];
  /** Spells always granted. */
  fixed?: string[];
  /** Spellcasting ability is fixed. */
  ability?: AbilityScoreKey;
  /** Player chooses the spellcasting ability. */
  abilityChoice?: AbilityScoreKey[];
  /** Ability is the one increased by the feat (Shadowmage). */
  abilityFromFeat?: boolean;
  /** Short note on how the spells are cast. */
  note?: string;
}

const MENTAL: AbilityScoreKey[] = ['intelligence', 'wisdom', 'charisma'];

export const FEAT_SPELL_RULES: FeatSpellRule[] = [
  { feat: 'Magic Initiate: Bard', cantrips: 2, spells: 1, classLists: ['Bard'], ability: 'charisma', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Magic Initiate: Cleric', cantrips: 2, spells: 1, classLists: ['Cleric'], ability: 'wisdom', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Magic Initiate: Druid', cantrips: 2, spells: 1, classLists: ['Druid'], ability: 'wisdom', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Magic Initiate: Sorcerer', cantrips: 2, spells: 1, classLists: ['Sorcerer'], ability: 'charisma', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Magic Initiate: Warlock', cantrips: 2, spells: 1, classLists: ['Warlock'], ability: 'charisma', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Magic Initiate: Wizard', cantrips: 2, spells: 1, classLists: ['Wizard'], ability: 'intelligence', note: 'Cast the 1st-level spell once per long rest.' },
  { feat: 'Elemental Initiate', cantrips: 1, spells: 1, elementPick: true, abilityChoice: MENTAL, note: 'Cast the 1st-level spell once per long rest without a slot, or with spell slots.' },
  { feat: 'Magic of the Blade', cantrips: 2, meleeOnly: true, abilityChoice: MENTAL, note: 'Cantrips that need an unarmed strike or melee weapon attack.' },
  { feat: 'Shadowmage', cantrips: 2, classLists: ['Druid', 'Sorcerer'], abilityFromFeat: true, note: 'Cast without components while in dim light or darkness.' },
  { feat: 'Spell Sniper', cantrips: 1, cantripOptions: ['Bone Chill', 'Eldritch Blast', 'Fire Bolt', 'Ray of Frost', 'Shocking Grasp', 'Thorn Whip'], note: 'Uses your normal spellcasting ability.' },
  { feat: 'Isetsu Magic', fixed: ['Water Whip', 'Riptide', 'Water Breathing'], abilityChoice: MENTAL, note: 'Riptide and water breathing: once each per long rest without a slot, or with spell slots.' },
  { feat: 'Gift of the Lion Turtle', fixed: ['Detect Thoughts', 'Suggestion'], abilityChoice: MENTAL, note: 'Once each per long rest without a slot, or with spell slots.' },
  { feat: 'Boon of the Jorōgumo', fixed: ['Disguise Self'], note: 'Proficiency bonus times per long rest.' },
  { feat: 'Spirit Bonded', fixed: ['Find Familiar'], note: 'No components or slot; recharges on a long rest. See the Tamer tab for your familiar.' },
];

export function getFeatSpellRule(feat: string): FeatSpellRule | undefined {
  return FEAT_SPELL_RULES.find((r) => r.feat === feat);
}
