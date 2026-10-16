export interface RollResult {
  id: string;
  formula: string;
  label?: string;
  rolls: number[];
  modifier: number;
  total: number;
  timestamp: number;
  advantage?: 'advantage' | 'disadvantage' | 'normal';
}

/**
 * Parse and roll a formula like "2d6+3", "1d20", "3d8-1", "1d4+2d6+5"
 */
export function rollFormula(formula: string): { rolls: number[]; modifier: number; total: number } {
  const cleaned = formula.replace(/\s+/g, '').toLowerCase();
  const parts = cleaned.match(/[+-]?[^+-]+/g) ?? [];
  const rolls: number[] = [];
  let modifier = 0;

  for (const part of parts) {
    const sign = part.startsWith('-') ? -1 : 1;
    const body = part.replace(/^[+-]/, '');

    if (body.includes('d')) {
      const [countStr, sidesStr] = body.split('d');
      const count = parseInt(countStr) || 1;
      const sides = parseInt(sidesStr) || 6;
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
      }
    } else {
      modifier += sign * (parseInt(body) || 0);
    }
  }

  const total = rolls.reduce((s, r) => s + r, 0) + modifier;
  return { rolls, modifier, total };
}

/**
 * Roll with advantage/disadvantage for a d20-based check.
 */
export function rollD20(modifier: number, mode: 'normal' | 'advantage' | 'disadvantage' = 'normal'): {
  rolls: number[];
  kept: number;
  modifier: number;
  total: number;
} {
  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  let kept: number;

  if (mode === 'advantage') kept = Math.max(r1, r2);
  else if (mode === 'disadvantage') kept = Math.min(r1, r2);
  else kept = r1;

  const rolls = mode === 'normal' ? [r1] : [r1, r2];
  return { rolls, kept, modifier, total: kept + modifier };
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}