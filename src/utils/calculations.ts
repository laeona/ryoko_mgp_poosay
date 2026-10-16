import type {
  AbilityScores,
  AbilityScoreKey,
  Character,
} from '../types/character';
import { getRace } from '../data/races';
import { getClass } from '../data/classes';

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

export interface SkillDef {
  name: string;
  ability: AbilityScoreKey;
}

export const SKILLS: SkillDef[] = [
  { name: 'Acrobatics', ability: 'dexterity' },
  { name: 'Animal Handling', ability: 'wisdom' },
  { name: 'Arcana', ability: 'intelligence' },
  { name: 'Athletics', ability: 'strength' },
  { name: 'Deception', ability: 'charisma' },
  { name: 'History', ability: 'intelligence' },
  { name: 'Insight', ability: 'wisdom' },
  { name: 'Intimidation', ability: 'charisma' },
  { name: 'Investigation', ability: 'intelligence' },
  { name: 'Medicine', ability: 'wisdom' },
  { name: 'Nature', ability: 'intelligence' },
  { name: 'Perception', ability: 'wisdom' },
  { name: 'Performance', ability: 'charisma' },
  { name: 'Persuasion', ability: 'charisma' },
  { name: 'Religion', ability: 'intelligence' },
  { name: 'Sleight of Hand', ability: 'dexterity' },
  { name: 'Stealth', ability: 'dexterity' },
  { name: 'Survival', ability: 'wisdom' },
];

/* ---------- Basic math ---------- */

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

/* ---------- Ability scores ---------- */

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

/* ---------- Proficiencies ---------- */

export function getSavingThrowProficiencies(character: Character): AbilityScoreKey[] {
  const set = new Set<AbilityScoreKey>();
  for (const cl of character.classes) {
    const cls = getClass(cl.className);
    if (!cls) continue;
    for (const save of cls.savingThrows) {
      set.add(save as AbilityScoreKey);
    }
  }
  return [...set];
}

export function isProficientInSkill(
  character: Character,
  skill: string
): boolean {
  return (
    character.background.skills.includes(skill) ||
    character.skillProficiencies.includes(skill)
  );
}

export function hasExpertiseInSkill(
  character: Character,
  skill: string
): boolean {
  return character.skillExpertise.includes(skill);
}

/* ---------- Skill / save modifiers ---------- */

export function getSkillBonus(character: Character, skillName: string): number {
  const skill = SKILLS.find((s) => s.name === skillName);
  if (!skill) return 0;

  const totals = getTotalAbilityScores(character);
  const abilityMod = getModifier(totals[skill.ability]);
  const prof = getProficiencyBonus(character.level);

  let bonus = abilityMod;
  if (isProficientInSkill(character, skillName)) bonus += prof;
  if (hasExpertiseInSkill(character, skillName)) bonus += prof;
  return bonus;
}

export function getSavingThrowBonus(
  character: Character,
  ability: AbilityScoreKey
): number {
  const totals = getTotalAbilityScores(character);
  const abilityMod = getModifier(totals[ability]);
  const prof = getProficiencyBonus(character.level);
  const isProficient = getSavingThrowProficiencies(character).includes(ability);
  return abilityMod + (isProficient ? prof : 0);
}

export function getPassivePerception(character: Character): number {
  return 10 + getSkillBonus(character, 'Perception');
}

export function getInitiative(character: Character): number {
  const totals = getTotalAbilityScores(character);
  return getModifier(totals.dexterity);
}

/* ---------- Spellcasting ---------- */

export function getSpellcastingAbility(
  character: Character
): AbilityScoreKey | undefined {
  for (const cl of character.classes) {
    const cls = getClass(cl.className);
    if (!cls?.spellcasting) continue;
    if (cls.spellcasting.ability === 'choice') {
      const chosen = cl.choices['spellcasting-ability'] as string | undefined;
      if (chosen) return chosen.toLowerCase() as AbilityScoreKey;
    } else {
      return cls.spellcasting.ability as AbilityScoreKey;
    }
  }
  return undefined;
}

export function getSpellSaveDC(character: Character): number | undefined {
  const ability = getSpellcastingAbility(character);
  if (!ability) return undefined;
  const totals = getTotalAbilityScores(character);
  const mod = getModifier(totals[ability]);
  const prof = getProficiencyBonus(character.level);
  return 8 + prof + mod;
}

export function getSpellAttackBonus(character: Character): number | undefined {
  const ability = getSpellcastingAbility(character);
  if (!ability) return undefined;
  const totals = getTotalAbilityScores(character);
  const mod = getModifier(totals[ability]);
  const prof = getProficiencyBonus(character.level);
  return prof + mod;
}

export function getSpellcastingAbilityMod(character: Character): number {
  const ability = getSpellcastingAbility(character);
  if (!ability) return 0;
  const totals = getTotalAbilityScores(character);
  return getModifier(totals[ability]);
}

export function getHitDiceType(character: Character): number {
  // Use the hit die of the class with the most levels (primary class)
  if (character.classes.length === 0) return 8;
  const primary = [...character.classes].sort((a, b) => b.level - a.level)[0];
  const cls = getClass(primary.className);
  return cls?.hitDie ?? 8;
}

export function rollHitDie(character: Character): {
  roll: number;
  conMod: number;
  total: number;
  dieType: number;
} | null {
  if (character.combat.hitDiceUsed >= character.combat.hitDiceTotal) return null;
  const dieType = getHitDiceType(character);
  const roll = Math.floor(Math.random() * dieType) + 1;
  const totals = getTotalAbilityScores(character);
  const conMod = getModifier(totals.constitution);
  const total = Math.max(1, roll + conMod);
  return { roll, conMod, total, dieType };
}

import { getModifier as _getModifier } from './calculations';