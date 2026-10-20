/**
 * Kaiju aspects a Path of the Kaiju barbarian can channel each time they rage.
 * The rules text for each aspect isn't in the app yet: fill in `benefits` and it
 * appears on the Rage panel while that aspect is active.
 */
export interface KaijuAspect {
  name: string;
  benefits: string;
}

export const KAIJU_ASPECTS: KaijuAspect[] = [
  { name: 'Ascendant Dragon', benefits: '' },
  { name: 'Eternal Leviathan', benefits: '' },
  { name: 'Titan Earth', benefits: '' },
  { name: 'Armoured Kabuto', benefits: '' },
  { name: 'Infinite Tempest', benefits: '' },
];
