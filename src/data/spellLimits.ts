/**
 * Spell progression limits by class and level.
 * - Known casters (Bard, Sorcerer, Warlock, Ranger, Tamer): fixed table
 * - Prepared casters (Cleric, Druid, Wizard, Paladin, Bender): formula
 */

// Cantrips known by level (index 0 unused; index 1 = level 1)
const CANTRIPS_KNOWN: Record<string, number[]> = {
  //         lvl0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
  Bard:     [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  Sorcerer: [0, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  Warlock:  [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  Cleric:   [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  Druid:    [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  Wizard:   [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  Ranger:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Paladin:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Tamer:    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  // Bender uses a custom function (base 2 + unique elements picked)
  Bender:   [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
};

// Spells known (for known casters only)
const SPELLS_KNOWN: Record<string, number[]> = {
  //         lvl0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
  Bard:     [0, 4, 5, 6, 7, 8, 9,10,11,12,14,15,15,16,18,19,19,20,22,22,22],
  Sorcerer: [0, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,12,13,13,14,14,15,15,15,15],
  Warlock:  [0, 2, 3, 4, 5, 6, 7, 8, 9,10,10,11,11,12,12,13,13,14,14,15,15],
  Ranger:   [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,10,10,11,11],
  Tamer:    [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9,10,10,11,11,11],
};

export function getCantripLimit(
  className: string,
  level: number,
  benderAffinities?: string[]
): number {
  if (className === 'Bender') {
    // Base 2 + 1 per *unique* element after the first (from 6/10/14 picks)
    const affinities = benderAffinities ?? [];
    if (affinities.length === 0) return 2;
    const unique = new Set(affinities);
    return 2 + Math.max(0, unique.size - 1);
  }
  const arr = CANTRIPS_KNOWN[className];
  if (!arr) return 0;
  return arr[Math.min(level, 20)] ?? 0;
}

export function getSpellLimit(
  className: string,
  level: number,
  abilityMod: number
): number {
  const arr = SPELLS_KNOWN[className];
  if (arr) {
    return arr[Math.min(level, 20)] ?? 0;
  }
  // Prepared casters
  switch (className) {
    case 'Cleric':
    case 'Druid':
    case 'Wizard':
      return Math.max(1, abilityMod + level);
    case 'Paladin':
    case 'Bender':
      return Math.max(1, abilityMod + Math.floor(level / 2));
    default:
      return 0;
  }
}

export function isPreparedCaster(className: string): boolean {
  return ['Cleric', 'Druid', 'Wizard', 'Paladin', 'Bender'].includes(className);
}

export function isKnownCaster(className: string): boolean {
  return className in SPELLS_KNOWN;
}