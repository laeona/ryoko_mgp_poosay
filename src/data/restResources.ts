export interface ResourceTemplate {
  name: string;
  rechargeOn: 'short' | 'long' | 'dawn' | 'none';
  /** Some resources have level-dependent max — this is a simplified default */
  defaultMax: number;
  description?: string;
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
  { name: 'Fortune Favoured', rechargeOn: 'long', defaultMax: 1, description: 'Isetsu. Reroll a missed attack or failed save.' },
  { name: 'Chest Beating', rechargeOn: 'long', defaultMax: 2, description: 'Hulking Enkoh. Resistance + Intimidation.' },
  { name: 'Ascendant Form', rechargeOn: 'long', defaultMax: 1, description: 'Kitsune. Radiate light and empower allies.' },
  { name: 'Moonblessed', rechargeOn: 'long', defaultMax: 1, description: 'Nishikin. Spend Hit Dice to heal in moonlight.' },
  { name: 'Cloudstep', rechargeOn: 'long', defaultMax: 1, description: 'Ryujin. Conjure a small cloud to fly.' },
  { name: 'Heartening Breath', rechargeOn: 'long', defaultMax: 2, description: 'Ryujin. Buff allies with a breath cone.' },
  { name: 'Boon of Ashura', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Extra reaction.' },
  { name: 'Boon of the Nue', rechargeOn: 'short', defaultMax: 2, description: 'Feat. Roll d6, bonus or poison.' },
  { name: 'Boon of the Ōmukade', rechargeOn: 'long', defaultMax: 2, description: 'Feat. Resistance reaction.' },
  { name: 'Boon of the Wanyūdō', rechargeOn: 'short', defaultMax: 2, description: 'Feat. Charging slam.' },
  { name: 'Spirit Bonded', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Summon your bonded familiar.' },
  { name: 'Lucky', rechargeOn: 'long', defaultMax: 3, description: 'Feat. Luck points: advantage on a check, attack or save, or force an enemy reroll.' },
  { name: 'Martial Adept', rechargeOn: 'short', defaultMax: 1, description: 'Feat. Superiority die for your Battle Master manoeuvres.' },
  { name: 'Magic Initiate', rechargeOn: 'long', defaultMax: 1, description: 'Feat. Cast your 1st-level spell once per long rest.' },
];