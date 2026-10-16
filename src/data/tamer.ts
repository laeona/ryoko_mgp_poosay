export interface CompanionProgression {
  maxCompanions: number;
  maxSize: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge';
  maxCR: number;
  /** Table: [CR½, CR1, CR2, CR3, CR4, CR5, CR6] -> improvements/hit dice */
  improvements: Record<string, { imp: number; hitDice: number }>;
}

export const TAMER_PROGRESSION: Record<number, CompanionProgression> = {
  1: { maxCompanions: 1, maxSize: 'Small', maxCR: 0.5, improvements: { '0.5': { imp: 0, hitDice: 0 } } },
  2: { maxCompanions: 1, maxSize: 'Small', maxCR: 0.5, improvements: { '0.5': { imp: 1, hitDice: 0 } } },
  3: { maxCompanions: 2, maxSize: 'Small', maxCR: 0.5, improvements: { '0.5': { imp: 2, hitDice: 0 } } },
  4: { maxCompanions: 2, maxSize: 'Small', maxCR: 1,   improvements: { '0.5': { imp: 3, hitDice: 1 }, '1': { imp: 0, hitDice: 0 } } },
  5: { maxCompanions: 2, maxSize: 'Medium', maxCR: 1,  improvements: { '0.5': { imp: 4, hitDice: 1 }, '1': { imp: 1, hitDice: 0 } } },
  6: { maxCompanions: 2, maxSize: 'Medium', maxCR: 1,  improvements: { '0.5': { imp: 5, hitDice: 1 }, '1': { imp: 2, hitDice: 0 } } },
  7: { maxCompanions: 3, maxSize: 'Medium', maxCR: 2,  improvements: { '0.5': { imp: 6, hitDice: 1 }, '1': { imp: 3, hitDice: 0 }, '2': { imp: 0, hitDice: 0 } } },
  8: { maxCompanions: 3, maxSize: 'Medium', maxCR: 2,  improvements: { '0.5': { imp: 7, hitDice: 2 }, '1': { imp: 4, hitDice: 1 }, '2': { imp: 1, hitDice: 1 } } },
  9: { maxCompanions: 3, maxSize: 'Medium', maxCR: 2,  improvements: { '0.5': { imp: 8, hitDice: 2 }, '1': { imp: 5, hitDice: 1 }, '2': { imp: 2, hitDice: 1 } } },
  10: { maxCompanions: 3, maxSize: 'Medium', maxCR: 3, improvements: { '0.5': { imp: 9, hitDice: 2 }, '1': { imp: 6, hitDice: 1 }, '2': { imp: 3, hitDice: 1 }, '3': { imp: 0, hitDice: 0 } } },
  11: { maxCompanions: 4, maxSize: 'Large', maxCR: 3,  improvements: { '0.5': { imp: 10, hitDice: 2 }, '1': { imp: 7, hitDice: 1 }, '2': { imp: 4, hitDice: 1 }, '3': { imp: 1, hitDice: 0 } } },
  12: { maxCompanions: 4, maxSize: 'Large', maxCR: 3,  improvements: { '0.5': { imp: 11, hitDice: 3 }, '1': { imp: 8, hitDice: 2 }, '2': { imp: 5, hitDice: 2 }, '3': { imp: 2, hitDice: 1 } } },
  13: { maxCompanions: 4, maxSize: 'Large', maxCR: 4,  improvements: { '0.5': { imp: 12, hitDice: 3 }, '1': { imp: 9, hitDice: 2 }, '2': { imp: 6, hitDice: 2 }, '3': { imp: 3, hitDice: 1 }, '4': { imp: 0, hitDice: 0 } } },
  14: { maxCompanions: 4, maxSize: 'Large', maxCR: 4,  improvements: { '0.5': { imp: 13, hitDice: 3 }, '1': { imp: 10, hitDice: 2 }, '2': { imp: 7, hitDice: 2 }, '3': { imp: 4, hitDice: 1 }, '4': { imp: 1, hitDice: 0 } } },
  15: { maxCompanions: 5, maxSize: 'Large', maxCR: 4,  improvements: { '0.5': { imp: 14, hitDice: 3 }, '1': { imp: 11, hitDice: 2 }, '2': { imp: 8, hitDice: 2 }, '3': { imp: 5, hitDice: 1 }, '4': { imp: 2, hitDice: 0 } } },
  16: { maxCompanions: 5, maxSize: 'Large', maxCR: 5,  improvements: { '0.5': { imp: 15, hitDice: 4 }, '1': { imp: 12, hitDice: 3 }, '2': { imp: 9, hitDice: 3 }, '3': { imp: 6, hitDice: 2 }, '4': { imp: 3, hitDice: 1 }, '5': { imp: 0, hitDice: 0 } } },
  17: { maxCompanions: 5, maxSize: 'Huge', maxCR: 5,   improvements: { '0.5': { imp: 16, hitDice: 4 }, '1': { imp: 13, hitDice: 3 }, '2': { imp: 10, hitDice: 3 }, '3': { imp: 7, hitDice: 2 }, '4': { imp: 4, hitDice: 1 }, '5': { imp: 1, hitDice: 0 } } },
  18: { maxCompanions: 5, maxSize: 'Huge', maxCR: 5,   improvements: { '0.5': { imp: 17, hitDice: 4 }, '1': { imp: 14, hitDice: 3 }, '2': { imp: 11, hitDice: 3 }, '3': { imp: 8, hitDice: 2 }, '4': { imp: 5, hitDice: 1 }, '5': { imp: 2, hitDice: 0 } } },
  19: { maxCompanions: 6, maxSize: 'Huge', maxCR: 6,   improvements: { '0.5': { imp: 18, hitDice: 5 }, '1': { imp: 15, hitDice: 4 }, '2': { imp: 12, hitDice: 4 }, '3': { imp: 9, hitDice: 3 }, '4': { imp: 6, hitDice: 2 }, '5': { imp: 3, hitDice: 1 }, '6': { imp: 0, hitDice: 0 } } },
  20: { maxCompanions: 6, maxSize: 'Huge', maxCR: 6,   improvements: { '0.5': { imp: 19, hitDice: 5 }, '1': { imp: 16, hitDice: 4 }, '2': { imp: 13, hitDice: 4 }, '3': { imp: 10, hitDice: 3 }, '4': { imp: 7, hitDice: 2 }, '5': { imp: 4, hitDice: 1 }, '6': { imp: 1, hitDice: 0 } } },
};

export function getCompanionProgression(tamerLevel: number, cr: number): {
  imp: number;
  hitDice: number;
} {
  const prog = TAMER_PROGRESSION[Math.max(1, Math.min(20, tamerLevel))];
  if (!prog) return { imp: 0, hitDice: 0 };
  // Find best matching CR key
  const keys = Object.keys(prog.improvements)
    .map(Number)
    .sort((a, b) => a - b);
  let bestKey = keys[0];
  for (const k of keys) {
    if (cr >= k) bestKey = k;
  }
  return prog.improvements[String(bestKey)] ?? { imp: 0, hitDice: 0 };
}

/* ---------- Sensei ---------- */

export const SENSEI_MARTIAL_STRIKE_DIE: Record<number, string> = {
  3: '1d6',
  7: '1d8',
  10: '1d10',
  18: '1d12',
};

export function getSenseiStrikeDie(tamerLevel: number): string {
  if (tamerLevel >= 18) return '1d12';
  if (tamerLevel >= 10) return '1d10';
  if (tamerLevel >= 7) return '1d8';
  if (tamerLevel >= 3) return '1d6';
  return '—';
}

export function getSenseiStrikeCount(tamerLevel: number): number {
  if (tamerLevel >= 14) return 3;
  if (tamerLevel >= 5) return 2;
  return 1;
}

export const SENSEI_TECHNIQUES: Array<{ id: string; name: string; description: string }> = [
  { id: 'avoid', name: 'Avoid', description: 'Bonus action: companion takes the Dodge action.' },
  { id: 'block', name: 'Block', description: 'Reaction when companion is attacked: +prof bonus to AC; if it still hits, reduce damage by 1d6 + prof.' },
  { id: 'charge', name: 'Charge', description: 'Action: companion moves up to its speed and makes one Martial Strike. If it moved 20 ft straight toward a creature and hits, extra 1d10 damage and STR save or prone.' },
  { id: 'dancing-feet', name: 'Dancing Feet', description: 'Bonus action: companion takes the Disengage action.' },
  { id: 'grapple', name: 'Grapple', description: 'Bonus action: companion attempts to grapple one creature within its reach.' },
  { id: 'sweep', name: 'Sweep', description: 'Bonus action: companion attempts to shove a creature prone (STR or DEX Athletics check).' },
  { id: 'throw', name: 'Throw', description: 'Once per turn, when companion has a creature grappled and takes Attack action, replace one attack with STR/DEX Athletics check vs target\'s STR or DEX check. On success, move creature and/or knock prone + damage equal to two Martial Strike rolls.' },
  { id: 'peoples-elbow', name: "People's Elbow", description: 'Once per turn, replace one attack when companion takes Attack action against a prone target. Melee attack; crit threshold reduced by 1 per size category larger than target. On hit, damage equal to two Martial Strike rolls. Hit or miss, companion falls prone.' },
  { id: 'uppercut', name: 'Uppercut', description: 'Once per turn, replace one attack when companion takes Attack action against a non-prone target. Melee attack; crit threshold reduced by 1 per size category smaller than target. On hit, damage equal to two Martial Strike rolls.' },
];

/* ---------- Utility ---------- */

export function getTamerLevel(classes: Array<{ className: string; level: number }>): number {
  const tamerClass = classes.find((c) => c.className === 'Tamer');
  return tamerClass?.level ?? 0;
}

export function isSensei(classes: Array<{ className: string; subclass?: string; level: number }>): boolean {
  const tamer = classes.find((c) => c.className === 'Tamer');
  return tamer?.subclass === 'Sensei';
}

export const CREATURE_TYPES = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
];

export const SIZES: Array<'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge'> = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
];