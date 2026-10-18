import { getProficiencyBonus } from '../utils/calculations';

export interface ResourceTemplate {
  name: string;
  rechargeOn: 'short' | 'long' | 'dawn' | 'none';
  /** Some resources have level-dependent max — this is a simplified default */
  defaultMax: number;
  description?: string;
  /** Feats that grant this resource (it is added when the feat is added). */
  feats?: string[];
  /** Max equals your proficiency bonus and follows it as you level. */
  scalesWithProficiency?: boolean;
  /** Max equals half your proficiency bonus (rounded down, minimum 1). */
  scalesWithHalfProficiency?: boolean;
}

/** Starting maximum for a resource, given the character's level. */
export function getResourceMax(tmpl: ResourceTemplate, level: number): number {
  if (tmpl.scalesWithProficiency) return getProficiencyBonus(level);
  if (tmpl.scalesWithHalfProficiency) return Math.max(1, Math.floor(getProficiencyBonus(level) / 2));
  return tmpl.defaultMax;
}

export const COMMON_RESOURCES: ResourceTemplate[] = [
  // Barbarian
  { name: 'Rage', rechargeOn: 'long', defaultMax: 2, description: 'Barbarian. Bonus action to enter rage.' },
  // Bard
  { name: 'Bardic Inspiration', rechargeOn: 'long', defaultMax: 3, description: 'Bard. Bonus action to inspire. Regains on short rest at level 5+.' },
  // Cleric
  { name: 'Channel Divinity', rechargeOn: 'short', defaultMax: 1, description: 'Cleric. Turn Undead + domain effect. 2 uses at 6th, 3 at 18th.' },
  // Druid
  { name: 'Wild Shape', rechargeOn: 'short', defaultMax: 2, description: 'Druid. Transform into a beast. Unlimited at 20th.' },
  // Fighter
  { name: 'Action Surge', rechargeOn: 'short', defaultMax: 1, description: 'Fighter. Take one additional action. 2 uses at 17th.' },
  { name: 'Second Wind', rechargeOn: 'short', defaultMax: 1, description: 'Fighter. Bonus action, regain 1d10 + fighter level HP.' },
  { name: 'Indomitable', rechargeOn: 'long', defaultMax: 1, description: 'Fighter. Reroll a failed save. 2 uses at 13th, 3 at 17th.' },
  // Monk
  { name: 'Ki Points', rechargeOn: 'short', defaultMax: 3, description: 'Monk. Fuel for Flurry, Patient Defense, Step of the Wind, Stunning Strike.' },
  // Paladin
  { name: 'Channel Divinity (Paladin)', rechargeOn: 'short', defaultMax: 1, description: 'Paladin. Sacred oath abilities.' },
  { name: 'Lay on Hands', rechargeOn: 'long', defaultMax: 5, description: 'Paladin. Pool of HP = 5 × paladin level.' },
  // Sorcerer
  { name: 'Sorcery Points', rechargeOn: 'long', defaultMax: 2, description: 'Sorcerer. Max = sorcerer level. Fuel for Metamagic.' },
  // Warlock
  { name: 'Mystic Arcanum', rechargeOn: 'long', defaultMax: 1, description: 'Warlock. Cast a spell of 6th+ level once per long rest.' },
  // Racial / Feats
  { name: 'Essence Capture', rechargeOn: 'long', defaultMax: 1, description: 'Hanamori. Capture essence from a dying creature.' },
  { name: 'Fortune Favoured', rechargeOn: 'long', defaultMax: 1, description: 'Isetsu. Reroll a missed attack, failed check or failed save. Uses equal to half your proficiency bonus.', scalesWithHalfProficiency: true },
  { name: 'Chest Beating', rechargeOn: 'long', defaultMax: 2, description: 'Hulking Enkoh. Bonus action: resistance to bludgeoning, piercing and slashing until your next turn, plus advantage on Intimidation.', scalesWithProficiency: true },
  { name: 'Ascendant Form', rechargeOn: 'long', defaultMax: 1, description: 'Kitsune. Radiate light and empower allies.' },
  { name: 'Water Magic', rechargeOn: 'long', defaultMax: 2, description: 'Fuyoren. 10-minute ritual to imbue a vial of water (holy water, antidote, hydration or 1d4 healing). Uses equal to proficiency bonus.', scalesWithProficiency: true },
  { name: 'Brittle Shell', rechargeOn: 'short', defaultMax: 1, description: 'Isetsu. +2 AC after a short or long rest. Mark it used when an attack hits you; it returns on a short rest.' },
  { name: 'Tough Shell (Fall)', rechargeOn: 'long', defaultMax: 1, description: 'Ryokido. Reaction: subtract up to 100 feet from a fall when calculating damage.' },
  { name: 'Slumbering Dragon', rechargeOn: 'short', defaultMax: 2, description: 'Nishikin. Reaction: add 1d6 to an attack, check or save using your Koi Dragon Colour ability. Uses equal to proficiency bonus, per short or long rest.', scalesWithProficiency: true },
  { name: 'Compassionate Heart', rechargeOn: 'long', defaultMax: 2, description: 'Blue Oniborne. Take the Help action as a bonus action; may spend a Hit Die to grant temp HP. Uses equal to proficiency bonus.', scalesWithProficiency: true },
  { name: 'Savage Bite', rechargeOn: 'long', defaultMax: 2, description: 'Blue Oniborne. Reaction bite when damaged by a creature within 5 ft; crits on 18-20. Uses equal to proficiency bonus.', scalesWithProficiency: true },
  { name: 'Ghastly Visage', rechargeOn: 'long', defaultMax: 2, description: 'Green Oniborne. Bonus action after Attack: frighten a creature within 5 ft (Wis save, DC 8 + Con + proficiency). Uses equal to proficiency bonus.', scalesWithProficiency: true },
  { name: 'Whirlwind Onslaught', rechargeOn: 'short', defaultMax: 1, description: 'Hanataka Tengu. Bonus action after Attack: cast a cantrip or make melee attacks against several creatures.' },
  { name: 'Psychic Battery', rechargeOn: 'short', defaultMax: 1, description: 'Karasu Tengu. Replace one attack with a psychic assault (DC 8 + Con + proficiency) that confuses on a fail.' },
  { name: 'Moonblessed', rechargeOn: 'long', defaultMax: 1, description: 'Nishikin. Spend Hit Dice to heal in moonlight.' },
  { name: 'Cloudstep', rechargeOn: 'long', defaultMax: 1, description: 'Ryujin. Conjure a small cloud to fly.' },
  { name: 'Heartening Breath', rechargeOn: 'long', defaultMax: 2, description: 'Ryujin. Action: 30 ft cone, add 1d4 to your colour ability for you and chosen allies. Uses equal to proficiency bonus.', scalesWithProficiency: true },
  { name: 'Boon of Ashura', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Extra reaction.', feats: ['Boon of Ashura'], scalesWithProficiency: true },
  { name: 'Boon of the Nue', rechargeOn: 'short', defaultMax: 2, description: 'Feat. Roll d6, bonus or poison.', feats: ['Boon of the Nue'], scalesWithProficiency: true },
  { name: 'Boon of the Ōmukade', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Resistance reaction.', feats: ['Boon of the Ōmukade'], scalesWithProficiency: true },
  { name: 'Boon of the Wanyūdō', rechargeOn: 'short', defaultMax: 2, description: 'Feat. Charging slam.', feats: ['Boon of the Wanyūdō'], scalesWithProficiency: true },
  { name: 'Spirit Bonded', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Summon your bonded familiar.', feats: ['Spirit Bonded'] },
  { name: 'Lucky', rechargeOn: 'long', defaultMax: 3, description: 'Feat. Luck points: advantage on a check, attack or save, or force an enemy reroll.', feats: ['Lucky'] },
  { name: 'Martial Adept', rechargeOn: 'short', defaultMax: 1, description: 'Feat. Superiority die for your Battle Master manoeuvres.', feats: ['Martial Adept'] },
  { name: 'Magic Initiate', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Cast your 1st-level spell once per long rest.', feats: ['Magic Initiate: Bard', 'Magic Initiate: Cleric', 'Magic Initiate: Druid', 'Magic Initiate: Sorcerer', 'Magic Initiate: Warlock', 'Magic Initiate: Wizard'] },
  { name: 'Boon of the Nue: Flight', rechargeOn: 'short', defaultMax: 2, description: 'Feat. Bonus action: flying speed equal to walking speed until end of turn.', feats: ['Boon of the Nue'], scalesWithProficiency: true },
  { name: 'Boon of the Komainu', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Radiant mane and stone body.', feats: ['Boon of the Komainu'], scalesWithProficiency: true },
  { name: 'Boon of the Jorōgumo', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Cast disguise self.', feats: ['Boon of the Jorōgumo'], scalesWithProficiency: true },
  { name: 'Hanamori Physiology', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Reaction: resistance to acid, cold, fire, lightning or thunder.', feats: ['Hanamori Physiology'], scalesWithProficiency: true },
  { name: 'Oni Regeneration', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Reaction: spend Hit Dice (up to proficiency bonus) to heal.', feats: ['Oni Regeneration'], scalesWithProficiency: true },
  { name: "Enkoh's Might", rechargeOn: 'long', defaultMax: 2, description: 'Feat. Bonus action shove.', feats: ["Enkoh's Might"], scalesWithProficiency: true },
  { name: 'Springtail Agility', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Bonus action leap of 5 x proficiency bonus feet.', feats: ['Springtail Agility'], scalesWithProficiency: true },
  { name: 'Tengu Training', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Reaction attack when a creature misses you.', feats: ['Tengu Training'], scalesWithProficiency: true },
  { name: 'Extra Attack Tactician', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Use a chosen class\'s Improved Extra Attack.', feats: ['Extra Attack Tactician'], scalesWithProficiency: true },
  { name: 'Karasu Trickery', rechargeOn: 'short', defaultMax: 1, description: 'Feat. Swap your d20 result with another creature\'s.', feats: ['Karasu Trickery'] },
  { name: 'Combo Striker', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Extra combo attack collaboration.', feats: ['Combo Striker'] },
  { name: 'Elemental Initiate', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Cast your 1st-level element spell without a slot.', feats: ['Elemental Initiate'] },
  { name: 'Gift of the Lion Turtle', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Detect thoughts and suggestion, once each.', feats: ['Gift of the Lion Turtle'] },
  { name: 'Isetsu Magic', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Riptide and water breathing, once each.', feats: ['Isetsu Magic'] },
  { name: 'Seasonal Determinism (Summer)', rechargeOn: 'long', defaultMax: 2, description: 'Feat, Summer. Bonus action: advantage on next attack or check.', scalesWithProficiency: true },
];
