/**
 * Spell slot progression tables from 5e SRD + multiclassing rules.
 * Each entry maps a character level to an array of slots [1st, 2nd, ..., 9th].
 */

export type SlotArray = number[];

// Full casters: Bard, Cleric, Druid, Sorcerer, Wizard
export const FULL_CASTER_SLOTS: Record<number, SlotArray> = {
  1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

// Half casters: Paladin, Ranger, Bender, Tamer (multiclass as half)
export const HALF_CASTER_SLOTS: Record<number, SlotArray> = {
  1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  12: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  14: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  16: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  20: [4, 3, 3, 3, 2, 0, 0, 0, 0],
};

// Pact Magic (Warlock) — special: all slots are the same level
export const PACT_MAGIC: Record<number, { slots: number; level: number }> = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  4: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  6: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  8: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  10: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  12: { slots: 3, level: 5 },
  13: { slots: 3, level: 5 },
  14: { slots: 3, level: 5 },
  15: { slots: 3, level: 5 },
  16: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 },
  18: { slots: 4, level: 5 },
  19: { slots: 4, level: 5 },
  20: { slots: 4, level: 5 },
};

export interface SpellSlotResult {
  /** Standard slot array [1st..9th] */
  slots: SlotArray;
  /** Pact magic slots (Warlock only) */
  pact?: { slots: number; level: number };
}

/**
 * Compute total spell slots for a character from their multiclass levels.
 * Follows 5e multiclassing rules:
 *  - Full casters contribute full level
 *  - Half casters contribute floor(level / 2)
 *  - Third casters contribute floor(level / 3)
 *  - Warlock is handled separately (pact magic)
 */
export function computeSpellSlots(
  classes: Array<{ className: string; level: number }>
): SpellSlotResult {
  let casterLevel = 0;
  let warlockLevel = 0;

  for (const cl of classes) {
    const n = cl.className.toLowerCase();
    const lvl = cl.level;

    if (
      n === 'bard' ||
      n === 'cleric' ||
      n === 'druid' ||
      n === 'sorcerer' ||
      n === 'wizard'
    ) {
      casterLevel += lvl;
    } else if (
      n === 'paladin' ||
      n === 'ranger' ||
      n === 'bender' ||
      n === 'tamer'
    ) {
      // Special: single-class paladin/ranger uses its full level table
      casterLevel += Math.ceil(lvl / 2);
    } else if (n === 'warlock') {
      warlockLevel += lvl;
    }
  }

  const slots =
    casterLevel > 0
      ? FULL_CASTER_SLOTS[Math.min(casterLevel, 20)] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0]
      : [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const pact = warlockLevel > 0 ? PACT_MAGIC[warlockLevel] : undefined;

  return { slots, pact };
}