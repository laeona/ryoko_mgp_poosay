import type { Companion } from '../types/character';
import { getCompanionProgression } from './tamer';

/* ============================================================
 * Bespoke familiars (Ryoko's Guide, Chapter 11 "Familiars")
 *
 * Each familiar has a fixed stat block, a free "Bonus Tamer
 * Improvement", and a tree of improvements unlocked by tamer
 * level. Descriptions here are short paraphrased summaries;
 * see the page number on each familiar for the full rules.
 * ============================================================ */

/* ---------- Rules constants (edit here if your table differs) ---------- */

/** Extra Hit Dice every bespoke familiar gets ("+2 Hit Dice" in its Bonus Tamer Improvement). */
export const BESPOKE_BONUS_HIT_DICE = 2;

/** Tamer levels at which bespoke companions gain 1 more Hit Die (Shared Resilience, p. 225). */
export const SHARED_RESILIENCE_LEVELS = [3, 5, 11, 17];

/** All bespoke familiars are CR 1/8. */
export const BESPOKE_CR = 0.125;

/* ---------- Types ---------- */

export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type FamiliarSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge';

export const ABILITY_KEYS: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export const ABILITY_NAMES: Record<AbilityKey, string> = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
};

const SIZE_ORDER: FamiliarSize[] = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];

/** Stat changes an improvement applies automatically. */
export interface ImprovementEffects {
  /** New size (the largest size wins). */
  size?: FamiliarSize;
  /** New Hit Die size, e.g. 6 for a d6 (the largest wins). */
  hitDie?: number;
  /** Flat, always-on AC bonus. */
  ac?: number;
  /** Walking speed bonus in feet. */
  speed?: number;
  /** Replaces the damage dice of the named action, e.g. { Claw: "1d6" }. */
  actionDie?: Record<string, string>;
}

/** Extra text (and optional stat changes) that kicks in at a higher tamer level. */
export interface ImprovementUpgrade {
  level: number;
  text: string;
  effects?: ImprovementEffects;
}

export interface FamiliarImprovement {
  id: string;
  name: string;
  /** Minimum tamer level. */
  level: number;
  /** Id of an improvement that must be learned first. */
  requires?: string;
  /** e.g. "Passive", "Action", "Bonus action", "Reaction". */
  kind: string;
  summary: string;
  upgrades?: ImprovementUpgrade[];
  effects?: ImprovementEffects;
}

export interface FamiliarAction {
  name: string;
  summary: string;
  roll?: {
    /** attack: d20 + modifier + proficiency vs AC. save: the target rolls against the familiar's save DC. */
    type: 'attack' | 'save';
    /** Attack: the best of these ability modifiers is used. */
    abilities?: AbilityKey[];
    /** Save: the ability the target saves with. */
    saveAbility?: string;
    range: string;
    damageDie: string;
    damageType: string;
    /** Add the ability modifier to damage. */
    addModifier?: boolean;
  };
}

export interface BespokeFamiliar {
  id: string;
  name: string;
  creatureType: string;
  alignment: string;
  size: FamiliarSize;
  /** What the tamer needs to craft it. */
  component: string;
  /** Page in the book. */
  page: number;
  /** Ability used for the familiar's save DC. */
  saveAbility: AbilityKey;
  abilities: Record<AbilityKey, number>;
  baseAC: number;
  acNote: string;
  baseHitDie: number;
  baseSpeed: number;
  extraSpeed?: string;
  skills: Array<{ name: string; ability: AbilityKey }>;
  senses?: string;
  languages: string;
  immunities?: string;
  traits: Array<{ name: string; text: string }>;
  actions: FamiliarAction[];
  /** Id of the free improvement every one of these familiars starts with. */
  bonusImprovement: string;
  improvements: FamiliarImprovement[];
}

/* ---------- Data ---------- */

export const FAMILIARS: BespokeFamiliar[] = [
  /* ---------------- Bancho-gama ---------------- */
  {
    id: 'bancho-gama',
    name: 'Bancho-gama',
    creatureType: 'Monstrosity',
    alignment: 'Lawful Neutral',
    size: 'Tiny',
    component: 'Any Fey or yokai with a swimming speed',
    page: 226,
    saveAbility: 'cha',
    abilities: { str: 10, dex: 15, con: 13, int: 8, wis: 10, cha: 14 },
    baseAC: 12,
    acNote: '10 + Dex',
    baseHitDie: 4,
    baseSpeed: 30,
    skills: [{ name: 'Intimidation', ability: 'cha' }],
    languages: 'Common',
    traits: [
      { name: 'Amphibious', text: 'Can breathe air and water.' },
      { name: 'Standing Leap', text: 'Long jump up to 20 ft and high jump up to 10 ft, with or without a running start.' },
      { name: 'Superiority Complex', text: 'Cannot benefit from the Help action.' },
    ],
    actions: [
      {
        name: 'Dagger',
        summary: 'Melee or ranged weapon attack.',
        roll: {
          type: 'attack',
          abilities: ['dex'],
          range: 'reach 5 ft. or range 20/60 ft.',
          damageDie: '1d4',
          damageType: 'piercing',
          addModifier: true,
        },
      },
    ],
    bonusImprovement: 'growth-1',
    improvements: [
      {
        id: 'growth-1',
        name: 'Growth I',
        level: 1,
        kind: 'Passive',
        summary: 'Grows to Small and its Hit Die becomes a d6.',
        effects: { size: 'Small', hitDie: 6 },
      },
      {
        id: 'shinobi-1',
        name: 'Shinobi I',
        level: 3,
        kind: 'Passive',
        summary:
          'Proficient in Stealth, with climb and swim speeds equal to its walking speed. Gains proficiency with chakrams, meteor hammers, nunchaku, rope darts, sai, shortswords, shuriken and tessen.',
      },
      {
        id: 'tongue-swing',
        name: 'Tongue Swing',
        level: 3,
        kind: 'Bonus action',
        summary:
          'Fastens its tongue to a surface within 30 ft and moves to that point. The tongue detaches after it moves, and drops if it is not standing on something solid.',
      },
      {
        id: 'growth-2',
        name: 'Growth II',
        level: 5,
        requires: 'growth-1',
        kind: 'Passive',
        summary: 'Grows to Medium and its Hit Die becomes a d8.',
        effects: { size: 'Medium', hitDie: 8 },
      },
      {
        id: 'multiattack',
        name: 'Multiattack',
        level: 5,
        kind: 'Action',
        summary: 'Can make two attacks as an action.',
      },
      {
        id: 'bossy-1',
        name: 'Bossy I',
        level: 5,
        kind: 'Action',
        summary:
          'Barks an order at a creature within 30 ft that can hear it: Dodge, move up to its speed, or make one weapon attack against a target of its choice. The creature may use its reaction to obey. Once per short or long rest of the tamer.',
      },
      {
        id: 'pipe-elemental-1',
        name: 'Pipe Elemental I',
        level: 9,
        kind: 'Passive',
        summary: 'A tiny fire sprite in its pipe adds 1d4 fire damage to its weapon hits.',
      },
      {
        id: 'shinobi-2',
        name: 'Shinobi II',
        level: 9,
        requires: 'shinobi-1',
        kind: 'Passive',
        summary:
          'Once per turn, when it attacks with advantage it can give up the advantage to strike a weak point. On a hit it picks one: +2d6 damage, knock the target prone, or give the target disadvantage on its next attack roll before the end of the familiar\'s next turn.',
        upgrades: [{ level: 17, text: 'Can use this as many times as it likes on each of its turns.' }],
      },
      {
        id: 'pipe-elemental-2',
        name: 'Pipe Elemental II',
        level: 13,
        requires: 'pipe-elemental-1',
        kind: 'Passive + Action',
        summary:
          'Its fire damage becomes 1d6. As an action it casts faerie fire using its save DC, with no components or concentration. Once per short or long rest of the tamer.',
      },
      {
        id: 'bossy-2',
        name: 'Bossy II',
        level: 13,
        requires: 'bossy-1',
        kind: 'Action',
        summary: 'Can cast command as an action. Once per short or long rest of the tamer.',
      },
      {
        id: 'bossy-3',
        name: 'Bossy III',
        level: 17,
        requires: 'bossy-2',
        kind: 'Action + Bonus action',
        summary:
          'Can use Bossy I as a bonus action instead of an action on a friendly creature. Can also cast dominate person without somatic components. Once per long rest of the tamer.',
      },
    ],
  },

  /* ---------------- Betobeto-kun ---------------- */
  {
    id: 'betobeto-kun',
    name: 'Betobeto-kun',
    creatureType: 'Fey',
    alignment: 'Chaotic Neutral',
    size: 'Tiny',
    component: 'Any betobeto-san or betobeto-sama',
    page: 229,
    saveAbility: 'cha',
    abilities: { str: 8, dex: 14, con: 13, int: 7, wis: 11, cha: 14 },
    baseAC: 12,
    acNote: '10 + Dex',
    baseHitDie: 4,
    baseSpeed: 30,
    skills: [{ name: 'Stealth', ability: 'dex' }],
    senses: 'darkvision 60 ft.',
    languages: 'Understands Common but cannot speak',
    immunities: 'frightened',
    traits: [
      {
        name: 'Audiophile',
        text: 'Whenever it hears a creature\'s noises it has not met before, it must make a DC 11 Wisdom save. On a failure it loudly mimics those noises for 10 minutes and automatically fails Stealth checks against creatures that can hear it.',
      },
    ],
    actions: [
      {
        name: 'Frighten',
        summary:
          'Scares a creature within 5 ft with a sudden noise. A creature that rolls a 1 or lower on its d20 save automatically fails and is frightened until the end of the familiar\'s next turn.',
        roll: {
          type: 'save',
          saveAbility: 'Wisdom',
          range: '5 ft.',
          damageDie: '1d8',
          damageType: 'psychic',
        },
      },
    ],
    bonusImprovement: 'jumpscare',
    improvements: [
      {
        id: 'jumpscare',
        name: 'Jumpscare',
        level: 1,
        kind: 'Passive',
        summary:
          'If it is hidden from a creature when it uses Frighten on it, that creature has disadvantage on the save. When Frighten frightens one or more creatures, it gains 2d6 temporary hit points for 1 minute.',
        upgrades: [{ level: 5, text: 'The temporary hit points become 3d6.' }],
      },
      {
        id: 'shadow-armour-1',
        name: 'Shadow Armour I',
        level: 3,
        kind: 'Passive',
        summary: 'In dim light or darkness while wearing no armour, it gains +2 AC.',
      },
      {
        id: 'shadow-stealth-1',
        name: 'Shadow Stealth I',
        level: 3,
        kind: 'Bonus action',
        summary: 'In dim light or darkness it can take the Hide action as a bonus action.',
      },
      {
        id: 'growth',
        name: 'Growth',
        level: 5,
        kind: 'Passive',
        summary: 'Grows to Small and its Hit Die becomes a d6.',
        effects: { size: 'Small', hitDie: 6 },
      },
      {
        id: 'scary-1',
        name: 'Scary I',
        level: 5,
        kind: 'Action',
        summary:
          'Frighten damage rises to 2d8, and a creature that rolls a 2 or lower on its d20 save automatically fails and is frightened.',
        effects: { actionDie: { Frighten: '2d8' } },
      },
      {
        id: 'shadow-stealth-2',
        name: 'Shadow Stealth II',
        level: 5,
        requires: 'shadow-stealth-1',
        kind: 'Bonus action',
        summary:
          'In dim light or darkness it can turn itself and its gear invisible as a bonus action, and Hide as part of the same bonus action. The invisibility ends when it uses a bonus action to drop it, enters bright light, is incapacitated, attacks, casts a spell or uses Frighten.',
      },
      {
        id: 'shadow-armour-2',
        name: 'Shadow Armour II',
        level: 9,
        requires: 'shadow-armour-1',
        kind: 'Passive',
        summary:
          'A further +2 AC under the same conditions as Shadow Armour I. (The printed wording on p. 230 is unclear; this assumes it stacks with Shadow Armour I.)',
      },
      {
        id: 'sow-panic',
        name: 'Sow Panic',
        level: 9,
        kind: 'Action',
        summary: 'Casts fear with no verbal or material components. Once per long rest of the tamer.',
      },
      {
        id: 'fear-eater',
        name: 'Fear-Eater',
        level: 13,
        kind: 'Action',
        summary:
          'Devours the fear of a frightened creature it can see within 30 ft: it gains 3d6 temporary hit points and the creature stops being frightened. The tamer then picks one effect: the creature is immune to the frightened condition until the end of the familiar\'s next turn, or it makes a Wisdom save and takes 5d8 psychic damage (half on a success).',
      },
      {
        id: 'scary-2',
        name: 'Scary II',
        level: 13,
        requires: 'scary-1',
        kind: 'Action',
        summary:
          'Frighten damage rises to 3d8, and a creature that rolls a 3 or lower on its d20 save automatically fails and is frightened.',
        effects: { actionDie: { Frighten: '3d8' } },
        upgrades: [
          {
            level: 17,
            text: 'Frighten damage becomes 4d8, and a d20 roll of 4 or lower automatically fails the save.',
            effects: { actionDie: { Frighten: '4d8' } },
          },
        ],
      },
      {
        id: 'shadow-aura',
        name: 'Shadow Aura',
        level: 17,
        kind: 'Passive + Reaction',
        summary:
          'Dims light within 5 ft (bright becomes dim, dim becomes darkness), except light from 6th-level or higher spells or very rare or better items. While in dim light it gains +10 ft speed and can use its reaction to halve bludgeoning, piercing or slashing damage it takes.',
      },
    ],
  },

  /* ---------------- Kawawappa ---------------- */
  {
    id: 'kawawappa',
    name: 'Kawawappa',
    creatureType: 'Fey',
    alignment: 'Neutral Good',
    size: 'Tiny',
    component: 'Any kappa',
    page: 232,
    saveAbility: 'con',
    abilities: { str: 14, dex: 14, con: 13, int: 8, wis: 10, cha: 8 },
    baseAC: 13,
    acNote: 'natural armour, 11 + Dex',
    baseHitDie: 4,
    baseSpeed: 30,
    extraSpeed: 'swim 30 ft.',
    skills: [],
    senses: 'darkvision 60 ft.',
    languages: 'Common',
    traits: [
      { name: 'Amphibious', text: 'Can breathe air and water.' },
      {
        name: 'Water Bowl',
        text: 'When it is knocked prone against its will, it must succeed on a DC 11 Dexterity save or spill the water in its head, giving it disadvantage on the next attack roll it makes before the end of its next turn.',
      },
    ],
    actions: [
      {
        name: 'Claw',
        summary: 'Melee weapon attack.',
        roll: {
          type: 'attack',
          abilities: ['str', 'dex'],
          range: 'reach 5 ft.',
          damageDie: '1d4',
          damageType: 'piercing',
          addModifier: true,
        },
      },
    ],
    bonusImprovement: 'versatile-1',
    improvements: [
      {
        id: 'versatile-1',
        name: 'Versatile I',
        level: 1,
        kind: 'Passive',
        summary: 'Gains proficiency in one weapon, one skill and one type of artisan\'s tools, chosen by the tamer.',
      },
      {
        id: 'shell-1',
        name: 'Shell I',
        level: 3,
        kind: 'Action',
        summary:
          'Withdraws into its shell: +2 AC, and attackers cannot benefit from advantage against it. While inside it is prone, has 0 speed, has disadvantage on Dexterity saves and can only take a bonus action to come out.',
      },
      {
        id: 'underwater-combatant',
        name: 'Underwater Combatant',
        level: 3,
        kind: 'Passive + Bonus action',
        summary:
          'Underwater it has advantage on checks to grapple or escape a grapple, and can take the Dash or Disengage action as a bonus action.',
      },
      {
        id: 'growth',
        name: 'Growth',
        level: 5,
        kind: 'Passive',
        summary: 'Grows to Small, its Hit Die becomes a d6, and its Claw damage die becomes a d6.',
        effects: { size: 'Small', hitDie: 6, actionDie: { Claw: '1d6' } },
      },
      {
        id: 'multiattack',
        name: 'Multiattack',
        level: 5,
        kind: 'Action',
        summary: 'Can make two attacks as an action.',
      },
      {
        id: 'versatile-2',
        name: 'Versatile II',
        level: 5,
        requires: 'versatile-1',
        kind: 'Passive',
        summary:
          'Another weapon, skill and tool proficiency (a weapon pick can become shields or one armour type, following the light, medium, heavy order). The tamer also picks one skill or tool proficiency whose bonus is doubled.',
      },
      {
        id: 'shell-2',
        name: 'Shell II',
        level: 9,
        requires: 'shell-1',
        kind: 'Bonus action + Reaction',
        summary:
          'Can withdraw into its shell as a bonus action, and has advantage on Strength and Constitution saves while in it. It can also come out as a reaction when it must make a Dexterity save, before rolling.',
      },
      {
        id: 'tribute',
        name: 'Tribute',
        level: 9,
        kind: 'Passive + Action',
        summary:
          'During a rest, a friendly creature can bond with it by feeding it a day of rations (lasts until someone else feeds it or the tamer finishes a long rest). It can cast warding bond on its bonded creature with no material components; the spell ends early if the familiar returns to its vessel or falls unconscious. Once per short or long rest of the tamer.',
      },
      {
        id: 'versatile-3',
        name: 'Versatile III',
        level: 13,
        requires: 'versatile-2',
        kind: 'Passive',
        summary:
          'Another weapon (or shield or armour), skill and saving throw proficiency. The tamer also picks one more skill or tool whose bonus is doubled.',
      },
      {
        id: 'hydroshell',
        name: 'Hydroshell',
        level: 13,
        requires: 'shell-2',
        kind: 'Action',
        summary:
          'While in its shell it can shoot forward in a straight line until it hits something. An object takes 21 (6d6) bludgeoning damage; a creature makes a Dexterity save and takes 21 (6d6) on a failure or half on a success. Each hit redirects it onward until it has moved its walking speed, and each target can be hurt once per turn. Once per short or long rest of the tamer.',
        upgrades: [{ level: 17, text: 'Damage becomes 28 (8d6).' }],
      },
      {
        id: 'versatile-4',
        name: 'Versatile IV',
        level: 17,
        requires: 'versatile-3',
        kind: 'Passive',
        summary:
          'Gains one saving throw proficiency of the tamer\'s choice. After each long rest the tamer picks one of the familiar\'s saving throw proficiencies and one weapon, skill or tool proficiency; while within 60 ft of the familiar, the tamer counts as proficient in them.',
      },
    ],
  },

  /* ---------------- Ko-inari ---------------- */
  {
    id: 'ko-inari',
    name: 'Ko-inari',
    creatureType: 'Celestial',
    alignment: 'Lawful Good',
    size: 'Tiny',
    component: 'Any Celestial or Fiend',
    page: 235,
    saveAbility: 'wis',
    abilities: { str: 9, dex: 14, con: 13, int: 10, wis: 14, cha: 12 },
    baseAC: 12,
    acNote: '10 + Dex',
    baseHitDie: 4,
    baseSpeed: 30,
    skills: [],
    senses: 'darkvision 60 ft.',
    languages: 'Common, Celestial, Kitsune',
    immunities: 'radiant damage',
    traits: [
      {
        name: 'Divine Reproach',
        text: 'When it sees an ally commit an evil deed, it waits for the earliest chance to scold them (1 minute, within 10 ft). The ally must then succeed on a DC 11 Wisdom save or take 4 (1d8) psychic damage. A creature that fails this save cannot be affected again until it finishes a long rest.',
      },
      {
        name: 'Fortified Mind',
        text: 'Immune to magic that lets other creatures read its thoughts, tell whether it is lying, or learn its alignment or creature type.',
      },
    ],
    actions: [
      {
        name: 'Radiant Strike',
        summary: 'Melee or ranged spell attack.',
        roll: {
          type: 'attack',
          abilities: ['wis'],
          range: 'reach 5 ft. or range 20 ft.',
          damageDie: '1d4',
          damageType: 'radiant',
          addModifier: true,
        },
      },
    ],
    bonusImprovement: 'messenger-1',
    improvements: [
      {
        id: 'messenger-1',
        name: 'Messenger I',
        level: 1,
        kind: 'Action',
        summary:
          'Casts the message cantrip with no material components. When the target is its tamer it needs no verbal or somatic components either.',
      },
      {
        id: 'divine-seal-1',
        name: 'Divine Seal I',
        level: 3,
        kind: 'Bonus action',
        summary:
          'Inscribes a seal on a creature within 5 ft; a creature bears only one of its seals at a time. Seal of Healing: a willing creature regains 7 (2d6) hit points at the end of its next turn. Seal of Strength: a willing creature is under the effect of bless for 1 minute. Each seal can be used once until the tamer finishes a long rest.',
      },
      {
        id: 'growth-1',
        name: 'Growth I',
        level: 3,
        kind: 'Passive',
        summary:
          'Grows to Small, its Hit Die becomes a d6, and its Radiant Strike and Radiant Bite (see Shapeshifter) damage dice become d6.',
        effects: { size: 'Small', hitDie: 6, actionDie: { 'Radiant Strike': '1d6' } },
      },
      {
        id: 'scout',
        name: 'Scout',
        level: 3,
        kind: 'Passive',
        summary: 'Proficient in Perception and Survival, and its walking speed increases by 10 ft.',
        effects: { speed: 10 },
      },
      {
        id: 'messenger-2',
        name: 'Messenger II',
        level: 5,
        requires: 'messenger-1',
        kind: 'Action',
        summary:
          'Casts comprehend languages, locate creature or sending with no material components. After casting one it cannot cast another with this improvement until the tamer finishes a short or long rest.',
      },
      {
        id: 'multiattack',
        name: 'Multiattack',
        level: 5,
        kind: 'Action',
        summary: 'Can make two attacks as an action.',
      },
      {
        id: 'shapeshifter',
        name: 'Shapeshifter',
        level: 5,
        kind: 'Action',
        summary:
          'Turns into a fox for 1 hour (its gear melds into its form; it can revert as an action). In fox form it cannot wield weapons or tools or use Divine Seal, can Dash as a bonus action, loses Radiant Strike and gains Radiant Bite (Dex + proficiency to hit; 1d4 + Dex piercing plus 1d4 radiant).',
      },
      {
        id: 'divine-seal-2',
        name: 'Divine Seal II',
        level: 9,
        requires: 'divine-seal-1',
        kind: 'Bonus action',
        summary:
          'Learns Seal of Disruption (Wisdom save or disadvantage on its first attack roll each turn for 1 minute, repeating the save each turn) and Seal of Purification (Wisdom save or 3 (1d6) radiant damage at the start of each turn for 1 minute, repeating the save). It also regains all its seals when the tamer finishes a short or long rest.',
      },
      {
        id: 'growth-2',
        name: 'Growth II',
        level: 9,
        requires: 'growth-1',
        kind: 'Passive',
        summary:
          'Grows to Medium, its Hit Die becomes a d8, and its Radiant Strike and Radiant Bite damage dice become d8.',
        effects: { size: 'Medium', hitDie: 8, actionDie: { 'Radiant Strike': '1d8' } },
      },
      {
        id: 'messenger-3',
        name: 'Messenger III',
        level: 13,
        requires: 'messenger-2',
        kind: 'Passive + Action',
        summary:
          'Is always under the effect of nondetection. As an action it can cast telepathic bond with no material components; creatures under that bond are immune to magic that reads their thoughts, detects lies, or reveals alignment or creature type. Once per long rest of the tamer.',
      },
      {
        id: 'divine-seal-3',
        name: 'Divine Seal III',
        level: 17,
        requires: 'divine-seal-2',
        kind: 'Bonus action',
        summary:
          'Each Divine Seal I seal can also be placed on one extra creature within 5 ft. Learns Seal of Protection (a willing creature gains +1 AC for 1 minute) and Seal of Weakness (Wisdom save or disadvantage on the next saving throw within 1 minute).',
      },
    ],
  },

  /* ---------------- Senryōka ---------------- */
  {
    id: 'senryoka',
    name: 'Senryōka',
    creatureType: 'Undead',
    alignment: 'Neutral',
    size: 'Tiny',
    component: 'Any Undead with the Incorporeal Movement trait',
    page: 238,
    saveAbility: 'str',
    abilities: { str: 14, dex: 10, con: 14, int: 8, wis: 13, cha: 9 },
    baseAC: 12,
    acNote: 'natural armour, 12 + Dex',
    baseHitDie: 4,
    baseSpeed: 30,
    skills: [],
    senses: 'darkvision 60 ft.',
    languages: 'Understands Common but cannot speak',
    immunities: 'poison damage; poisoned',
    traits: [
      {
        name: 'Kleptomaniac',
        text: 'When it sees a creature carrying a tool or weapon it has not seen before, it must make a DC 11 Wisdom save. On a failure it must try to steal the item, and its compulsion ends after one attempt whether or not it succeeds.',
      },
    ],
    actions: [
      {
        name: 'Salvaged Weapon',
        summary: 'Melee or ranged weapon attack; the senryōka chooses bludgeoning, piercing or slashing damage.',
        roll: {
          type: 'attack',
          abilities: ['str'],
          range: 'reach 5 ft. or range 20/60 ft.',
          damageDie: '1d4',
          damageType: 'bludgeoning, piercing or slashing',
          addModifier: true,
        },
      },
      {
        name: 'Incorporeal Form (1/Day)',
        summary:
          'Becomes partially incorporeal until the end of its next turn, moving through creatures and objects as if they were difficult terrain. If it ends its turn inside another creature or object, it takes 5 (1d10) force damage and is moved to the nearest free space.',
      },
    ],
    bonusImprovement: 'loot-bag-1',
    improvements: [
      {
        id: 'loot-bag-1',
        name: 'Loot Bag I',
        level: 1,
        kind: 'Action',
        summary:
          'Rummages in its bag to produce one item of the tamer\'s choice: a shield, a mundane weapon, a silvered weapon or an adamantine weapon. The item lasts until the familiar returns to its vessel, the tamer finishes a long rest, or it produces a different item.',
      },
      {
        id: 'ethereal-1',
        name: 'Ethereal I',
        level: 3,
        kind: 'Bonus action',
        summary:
          'Can use Incorporeal Form as a bonus action, a number of times equal to the tamer\'s proficiency bonus, regaining all uses when the tamer finishes a long rest.',
      },
      {
        id: 'growth',
        name: 'Growth',
        level: 5,
        kind: 'Passive',
        summary: 'Grows to Small, its Hit Die becomes a d6, and its Salvaged Weapon damage die becomes a d6.',
        effects: { size: 'Small', hitDie: 6, actionDie: { 'Salvaged Weapon': '1d6' } },
      },
      {
        id: 'multiattack',
        name: 'Multiattack',
        level: 5,
        kind: 'Action',
        summary: 'Can make two attacks as an action.',
      },
      {
        id: 'weapon-barrage-1',
        name: 'Weapon Barrage I',
        level: 5,
        kind: 'Action',
        summary:
          'Opens its bag and flings weapons in a 30-ft cone. Each creature makes a Dexterity save (its save DC), taking 17 (5d6) damage on a failure or half on a success; the tamer chooses bludgeoning, piercing or slashing. Once per short or long rest of the tamer.',
        upgrades: [{ level: 9, text: 'Damage becomes 24 (7d6).' }],
      },
      {
        id: 'mystery-bag',
        name: 'Mystery Bag',
        level: 9,
        kind: 'Action',
        summary:
          'Draws a random object from its bag (roll a d4). 1: Oversized Mallet, a melee Salvaged Weapon attack on a creature within 15 ft for an extra 22 (5d8) bludgeoning, then it crumbles. 2: Boomerang of No Return, a ranged attack that can chain to other creatures for up to five attacks or until a miss. 3: One-Hit Shield, hovers around a creature within 30 ft for 1 minute; it can use its reaction to make one attack miss, destroying the shield. 4: Malfunctioning Fire Lance, a piercing attack that then explodes: Dexterity save for everyone within 10 ft, 21 (6d6) fire on a failure or half on a success. Once per long rest of the tamer.',
      },
      {
        id: 'junk-armour',
        name: 'Junk Armour',
        level: 9,
        kind: 'Passive',
        summary: 'Wears salvaged armour for +2 AC.',
        effects: { ac: 2 },
      },
      {
        id: 'loot-bag-2',
        name: 'Loot Bag II',
        level: 9,
        requires: 'loot-bag-1',
        kind: 'Passive',
        summary:
          'Loot Bag I can also produce a +1 weapon or a +1 shield, and it can keep up to three items out at once; producing a fourth makes the tamer choose one to vanish.',
      },
      {
        id: 'weapon-barrage-2',
        name: 'Weapon Barrage II',
        level: 13,
        requires: 'weapon-barrage-1',
        kind: 'Passive',
        summary:
          'A creature that fails its save against Weapon Barrage I suffers an extra effect by damage type. Bludgeoning: disadvantage on attack rolls until the end of its next turn. Piercing: speed 0 until the end of its next turn. Slashing: bleeds for an extra 7 (2d6) slashing damage at the start of its next turn.',
        upgrades: [{ level: 17, text: 'Weapon Barrage I damage becomes 31 (9d6).' }],
      },
      {
        id: 'scavenger',
        name: 'Scavenger',
        level: 13,
        kind: 'Passive + Action',
        summary:
          'Proficient in Perception. It can spend 1 minute searching a corpse carrying weapons or armour (DC 15 Wisdom (Perception) check); on a success it regains one use of Weapon Barrage I or Mystery Bag, the tamer\'s choice. After a success it cannot try again until the tamer finishes a long rest.',
      },
      {
        id: 'ethereal-2',
        name: 'Ethereal II',
        level: 13,
        requires: 'ethereal-1',
        kind: 'Passive',
        summary: 'Resistance to bludgeoning, piercing and slashing damage from nonmagical attacks.',
      },
      {
        id: 'ethereal-3',
        name: 'Ethereal III',
        level: 17,
        requires: 'ethereal-2',
        kind: 'Passive',
        summary:
          'Immune to the charmed, exhaustion, frightened, grappled, paralysed, petrified, prone and restrained conditions.',
      },
    ],
  },
];

/* ---------- Helpers ---------- */

export function getFamiliar(id?: string): BespokeFamiliar | undefined {
  if (!id) return undefined;
  return FAMILIARS.find((f) => f.id === id);
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/** The improvements a companion really has: the free bonus one plus any valid learned ones. */
export function getKnownImprovementIds(
  familiar: BespokeFamiliar,
  learned: string[] = []
): string[] {
  const valid = new Set(familiar.improvements.map((i) => i.id));
  const ids = [familiar.bonusImprovement];
  for (const id of learned) {
    if (valid.has(id) && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export interface ResolvedAction {
  name: string;
  summary: string;
  roll?: {
    type: 'attack' | 'save';
    range: string;
    damageType: string;
    damageFormula: string;
    attackBonus?: number;
    saveAbility?: string;
    saveDC?: number;
  };
}

export interface FamiliarStats {
  size: FamiliarSize;
  hitDie: number;
  hitDiceTotal: number;
  maxHP: number;
  ac: number;
  speed: number;
  mods: Record<AbilityKey, number>;
  skills: Array<{ name: string; bonus: number }>;
  passivePerception: number;
  saveDC: number;
  actions: ResolvedAction[];
}

/**
 * Work out a bespoke familiar's current stats from its stat block, the improvements it has,
 * the tamer's level and the tamer's proficiency bonus.
 */
export function getFamiliarStats(
  familiar: BespokeFamiliar,
  learned: string[] | undefined,
  tamerLevel: number,
  proficiencyBonus: number
): FamiliarStats {
  const known = getKnownImprovementIds(familiar, learned);

  // Collect stat changes from known improvements and any upgrades already unlocked.
  const steps: Array<{ level: number; effects: ImprovementEffects }> = [];
  for (const imp of familiar.improvements) {
    if (!known.includes(imp.id)) continue;
    if (imp.effects) steps.push({ level: imp.level, effects: imp.effects });
    for (const up of imp.upgrades ?? []) {
      if (up.effects && tamerLevel >= up.level) {
        steps.push({ level: up.level, effects: up.effects });
      }
    }
  }
  steps.sort((a, b) => a.level - b.level);

  let size = familiar.size;
  let hitDie = familiar.baseHitDie;
  let ac = familiar.baseAC;
  let speed = familiar.baseSpeed;
  const dice: Record<string, string> = {};
  for (const { effects } of steps) {
    if (effects.size && SIZE_ORDER.indexOf(effects.size) > SIZE_ORDER.indexOf(size)) {
      size = effects.size;
    }
    if (effects.hitDie && effects.hitDie > hitDie) hitDie = effects.hitDie;
    if (effects.ac) ac += effects.ac;
    if (effects.speed) speed += effects.speed;
    if (effects.actionDie) Object.assign(dice, effects.actionDie);
  }

  const mods = {} as Record<AbilityKey, number>;
  for (const key of ABILITY_KEYS) mods[key] = abilityModifier(familiar.abilities[key]);

  // Hit Dice: stat block (1) + bonus + the normal companion table + Shared Resilience.
  const tableHitDice = getCompanionProgression(tamerLevel, BESPOKE_CR).hitDice;
  const sharedHitDice = SHARED_RESILIENCE_LEVELS.filter((l) => tamerLevel >= l).length;
  const hitDiceTotal = 1 + BESPOKE_BONUS_HIT_DICE + tableHitDice + sharedHitDice;
  const perDie = Math.max(0, Math.floor((hitDie + 1) / 2 + mods.con));
  const maxHP = hitDiceTotal * perDie;

  const saveDC = 8 + proficiencyBonus + mods[familiar.saveAbility];

  const actions: ResolvedAction[] = familiar.actions.map((a) => {
    const r = a.roll;
    if (!r) return { name: a.name, summary: a.summary };
    const die = dice[a.name] ?? r.damageDie;
    const abilityMod = r.abilities ? Math.max(...r.abilities.map((k) => mods[k])) : 0;
    const bonus = r.addModifier ? abilityMod : 0;
    const damageFormula =
      bonus === 0 ? die : `${die}${bonus > 0 ? '+' : ''}${bonus}`;
    return {
      name: a.name,
      summary: a.summary,
      roll: {
        type: r.type,
        range: r.range,
        damageType: r.damageType,
        damageFormula,
        attackBonus: r.type === 'attack' ? abilityMod + proficiencyBonus : undefined,
        saveAbility: r.saveAbility,
        saveDC: r.type === 'save' ? saveDC : undefined,
      },
    };
  });

  return {
    size,
    hitDie,
    hitDiceTotal,
    maxHP,
    ac,
    speed,
    mods,
    skills: familiar.skills.map((s) => ({
      name: s.name,
      bonus: mods[s.ability] + proficiencyBonus,
    })),
    passivePerception: 10 + mods.wis,
    saveDC,
    actions,
  };
}

/** A fresh companion for the given bespoke familiar, with its starting HP filled in. */
export function createBespokeCompanion(
  familiar: BespokeFamiliar,
  tamerLevel: number,
  proficiencyBonus: number
): Companion {
  const stats = getFamiliarStats(familiar, [], tamerLevel, proficiencyBonus);
  return {
    id: crypto.randomUUID(),
    name: familiar.name,
    creatureType: familiar.creatureType,
    cr: BESPOKE_CR,
    size: stats.size,
    maxHP: stats.maxHP,
    currentHP: stats.maxHP,
    tempHP: 0,
    ac: stats.ac,
    speed: `${stats.speed} ft.`,
    improvements: [],
    familiarId: familiar.id,
    learnedImprovements: [],
    notes: '',
  };
}
