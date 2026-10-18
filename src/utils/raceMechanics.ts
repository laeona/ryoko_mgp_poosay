import { getRace } from '../data/races';
import type { Character } from '../types/character';

/** Skills a race (or subrace) grants outright, with no choice involved. */
const FIXED_RACE_SKILLS: Record<string, string[]> = {
  Haniwa: ['Religion', 'Perception'],
  Isetsu: ['Athletics', 'Perception'],
  'Red Oniborne': ['Intimidation'],
  'Blue Oniborne': ['Insight', 'Persuasion'],
  'Green Oniborne': ['Performance'],
  'Karasu Tengu': ['Deception', 'Stealth'],
};

/** Race choices that pick skill proficiencies. */
const SKILL_CHOICE_IDS = [
  'fuyoren-skill',
  'hanamori-skill',
  'kitsune-skill',
  'ryokido-skill',
  'hanataka-skill',
  'springtail-skills',
];

/** Limited-use racial traits: tracker names (from COMMON_RESOURCES) by race or subrace. */
const RACE_RESOURCE_NAMES: Record<string, string[]> = {
  Hulking: ['Chest Beating'],
  Fuyoren: ['Water Magic'],
  Hanamori: ['Essence Capture'],
  Isetsu: ['Fortune Favoured', 'Brittle Shell'],
  Kitsune: ['Ascendant Form'],
  Ryokido: ['Tough Shell (Fall)'],
  Nishikin: ['Moonblessed', 'Slumbering Dragon'],
  Ryujin: ['Cloudstep', 'Heartening Breath'],
  'Blue Oniborne': ['Compassionate Heart', 'Savage Bite'],
  'Green Oniborne': ['Ghastly Visage'],
  'Hanataka Tengu': ['Whirlwind Onslaught'],
  'Karasu Tengu': ['Psychic Battery'],
};

/** Races whose unarmoured AC is 12 + Con, and the trait that grants it. */
const NATURAL_ARMOUR: Record<string, string> = {
  Hanamori: 'Rugged',
  Isetsu: 'Natural Armour',
  Ryokido: 'Tough Shell',
};

function currentRace(character: Character) {
  const race = getRace(character.race.name);
  const subrace = race?.subraces?.find((s) => s.name === character.race.subrace);
  return { race, subrace };
}

/** Walking speed granted by the character's race / subrace (30 if no race). */
export function getRaceSpeed(character: Character): number {
  const { race, subrace } = currentRace(character);
  return subrace?.speed ?? race?.speed ?? 30;
}

/** Description of any extra movement modes (climb, swim, ...) from race / subrace. */
export function getRaceSpeedNote(character: Character): string | undefined {
  const { race, subrace } = currentRace(character);
  return subrace?.speedDescription ?? race?.speedDescription;
}

/** Skill proficiencies from race: fixed grants plus the player's racial choices. */
export function getRaceSkillProficiencies(character: Character): string[] {
  const { race, subrace } = currentRace(character);
  if (!race) return [];
  const skills = new Set<string>([
    ...(FIXED_RACE_SKILLS[race.name] ?? []),
    ...(subrace ? FIXED_RACE_SKILLS[subrace.name] ?? [] : []),
  ]);
  const ids = new Set<string>([
    ...(race.choices ?? []).map((c) => c.id),
    ...(subrace?.choices ?? []).map((c) => c.id),
  ]);
  for (const id of SKILL_CHOICE_IDS) {
    if (!ids.has(id)) continue;
    const value = character.race.choices?.[id];
    if (Array.isArray(value)) value.forEach((v) => v && skills.add(v));
    else if (value) skills.add(value);
  }
  return [...skills];
}

/** Names of resource trackers the character's race should have. */
export function getRaceResourceNames(character: Character): string[] {
  const { race, subrace } = currentRace(character);
  if (!race) return [];
  return [
    ...(RACE_RESOURCE_NAMES[race.name] ?? []),
    ...(subrace ? RACE_RESOURCE_NAMES[subrace.name] ?? [] : []),
  ];
}

/** Name of the racial trait that gives natural armour (12 + Con), if any. */
export function getNaturalArmourTrait(character: Character): string | undefined {
  return NATURAL_ARMOUR[character.race.name];
}
