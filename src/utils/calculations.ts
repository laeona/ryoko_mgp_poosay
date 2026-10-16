import type {
  AbilityScores,
  AbilityScoreKey,
  Character,
} from '../types/character';
import { getRace } from '../data/races';

export const ABILITY_KEYS: AbilityScoreKey[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const ABILITY_LABELS: Record<AbilityScoreKey, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

export const ABILITY_FULL_LABELS: Record<AbilityScoreKey, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
};

export function emptyScores(): AbilityScores {
  return {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };
}

export function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function getRacialBonuses(character: Character): AbilityScores {
  const totals = emptyScores();
  if (!character.race.name) return totals;

  const race = getRace(character.race.name);
  if (!race) return totals;

  for (const [key, val] of Object.entries(race.abilityScoreIncrease)) {
    totals[key as AbilityScoreKey] += val ?? 0;
  }

  if (character.race.subrace && race.subraces) {
    const sub = race.subraces.find((s) => s.name === character.race.subrace);
    if (sub) {
      for (const [key, val] of Object.entries(sub.abilityScoreIncrease)) {
        totals[key as AbilityScoreKey] += val ?? 0;
      }
    }
  }

  return totals;
}

export function getTotalAbilityScores(character: Character): AbilityScores {
  const bonuses = getRacialBonuses(character);
  const totals = { ...character.abilityScores };
  for (const key of ABILITY_KEYS) {
    totals[key] += bonuses[key];
  }
  return totals;
}