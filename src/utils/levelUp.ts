import type { Character, ClassFeature } from '../types/character';
import { getClass } from '../data/classes';
import {
  computeMartialLevel,
  getMartialProgression,
} from '../data/advancedTechniques';
import { computeSpellSlots } from '../data/spellSlots';

const ASI_LEVELS = [4, 8, 12, 16, 19];

export interface LevelUpSummary {
  classIndex: number;
  className: string;
  oldLevel: number;
  newLevel: number;
  hitDie: number;
  newClassFeatures: ClassFeature[];
  newSubclassFeatures: ClassFeature[];
  asiAvailable: boolean;
  subclassAvailable: boolean;
  subclassLabel: string;
  newTechniqueAvailable: boolean;
  martialLevelBefore: number;
  martialLevelAfter: number;
  newSpellSlotsChanged: boolean;
}

export function computeLevelUpSummary(
  character: Character,
  classIndex: number
): LevelUpSummary | null {
  const cl = character.classes[classIndex];
  if (!cl) return null;
  const cls = getClass(cl.className);
  if (!cls) return null;
  const newLevel = cl.level + 1;
  if (newLevel > 20) return null;

  const newClassFeatures = cls.features.filter((f) => f.level === newLevel);
  const subclass = cl.subclass
    ? cls.subclasses.find((s) => s.name === cl.subclass)
    : null;
  const newSubclassFeatures = subclass
    ? subclass.features.filter((f) => f.level === newLevel)
    : [];

  const asiAvailable = ASI_LEVELS.includes(newLevel);
  const subclassAvailable = !cl.subclass && newLevel >= cls.subclassLevel;

  const classesAfter = character.classes.map((c, i) =>
    i === classIndex ? { ...c, level: newLevel } : c
  );
  const oldMartialLevel = computeMartialLevel(character.classes);
  const newMartialLevel = computeMartialLevel(classesAfter);
  const oldProg = getMartialProgression(oldMartialLevel);
  const newProg = getMartialProgression(newMartialLevel);
  const newTechniqueAvailable =
    newProg.techniquesKnown > oldProg.techniquesKnown;

  const oldSlots = computeSpellSlots(character.classes);
  const newSlots = computeSpellSlots(classesAfter);
  const newSpellSlotsChanged =
    JSON.stringify(oldSlots) !== JSON.stringify(newSlots);

  return {
    classIndex,
    className: cl.className,
    oldLevel: cl.level,
    newLevel,
    hitDie: cls.hitDie,
    newClassFeatures,
    newSubclassFeatures,
    asiAvailable,
    subclassAvailable,
    subclassLabel: cls.subclassLabel ?? 'Subclass',
    newTechniqueAvailable,
    martialLevelBefore: oldMartialLevel,
    martialLevelAfter: newMartialLevel,
    newSpellSlotsChanged,
  };
}

export function getAverageHP(hitDie: number): number {
  return Math.floor(hitDie / 2) + 1;
}

export function rollHP(hitDie: number): number {
  return Math.floor(Math.random() * hitDie) + 1;
}