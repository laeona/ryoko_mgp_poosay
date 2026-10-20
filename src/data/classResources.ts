import type { Character, ClassLevel, Resource } from '../types/character';
import { getModifier, getTotalAbilityScores } from '../utils/calculations';
import { COMMON_RESOURCES, getResourceMax } from './restResources';
import { getRaceResourceNames } from '../utils/raceMechanics';

type Recharge = Resource['rechargeOn'];

interface Ctx {
  /** Level in the class that grants the feature */
  level: number;
  mods: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
}

interface ClassResourceDef {
  name: string;
  className: string;
  subclass?: string;
  minLevel: number;
  recharge: Recharge | ((c: Ctx) => Recharge);
  /** Number of uses, or 'unlimited' */
  max: (c: Ctx) => number | 'unlimited';
  /** How to use it, shown on the Overview */
  usage: string | ((c: Ctx) => string);
}

const atLeast = (n: number) => Math.max(1, n);
const byLevel = (level: number, steps: Array<[number, number]>) => {
  let v = 0;
  for (const [lv, val] of steps) if (level >= lv) v = val;
  return v;
};

const DEFS: ClassResourceDef[] = [
  // ---- Barbarian
  {
    name: 'Rage',
    className: 'Barbarian',
    minLevel: 1,
    recharge: 'long',
    max: ({ level }) => (level >= 20 ? 'unlimited' : byLevel(level, [[1, 2], [3, 3], [6, 4], [12, 5], [17, 6]])),
    usage:
      'Bonus action to start. While raging you have advantage on Strength checks and saves, bonus melee damage, and resistance to physical damage. Each use is one rage. See the Features tab for the exact numbers.',
  },
  // ---- Bard
  {
    name: 'Bardic Inspiration',
    className: 'Bard',
    minLevel: 1,
    recharge: ({ level }) => (level >= 5 ? 'short' : 'long'),
    max: ({ mods }) => atLeast(mods.cha),
    usage: ({ level }) =>
      `Bonus action: give a creature a d${level >= 15 ? 12 : level >= 10 ? 10 : level >= 5 ? 8 : 6} to add to one roll. Uses equal your Charisma modifier.${level >= 5 ? ' Regained on a short rest (Font of Inspiration).' : ''}${level >= 20 ? ' You also regain one when you roll initiative with none left.' : ''}`,
  },
  // ---- Cleric
  {
    name: 'Channel Divinity',
    className: 'Cleric',
    minLevel: 2,
    recharge: 'short',
    max: ({ level }) => byLevel(level, [[2, 1], [6, 2], [18, 3]]),
    usage: 'Channel divine energy for Turn Undead or your domain effect (such as Consecration).',
  },
  {
    name: 'Enrapture',
    className: 'Cleric',
    subclass: 'Shrine Warden Domain',
    minLevel: 1,
    recharge: 'long',
    max: ({ mods }) => atLeast(mods.wis),
    usage: 'On a hit: push or slow the target (Charisma save). Uses equal your Wisdom modifier.',
  },
  // ---- Druid
  {
    name: 'Wild Shape',
    className: 'Druid',
    minLevel: 2,
    recharge: 'short',
    max: ({ level }) => (level >= 20 ? 'unlimited' : 2),
    usage: 'Transform into a beast you have seen. Two uses between short rests.',
  },
  // ---- Fighter
  {
    name: 'Second Wind',
    className: 'Fighter',
    minLevel: 1,
    recharge: 'short',
    max: () => 1,
    usage: ({ level }) => `Bonus action: regain 1d10 + ${level} HP.`,
  },
  {
    name: 'Action Surge',
    className: 'Fighter',
    minLevel: 2,
    recharge: 'short',
    max: ({ level }) => (level >= 17 ? 2 : 1),
    usage: 'Take one additional action on your turn.',
  },
  {
    name: 'Indomitable',
    className: 'Fighter',
    minLevel: 9,
    recharge: 'long',
    max: ({ level }) => byLevel(level, [[9, 1], [13, 2], [17, 3]]),
    usage: 'Reroll a failed saving throw.',
  },
  // ---- Monk
  {
    name: 'Ki Points',
    className: 'Monk',
    minLevel: 2,
    recharge: 'short',
    max: ({ level }) => level,
    usage:
      'Spend ki on Flurry of Blows, Patient Defense and Step of the Wind, and on other monk features. Ki points equal your monk level.',
  },
  {
    name: 'Gate of Water (extra ki)',
    className: 'Monk',
    subclass: 'Way of the Eight Gates',
    minLevel: 3,
    recharge: 'short',
    max: ({ mods }) => atLeast(mods.wis),
    usage: 'Extra ki points equal to your Wisdom modifier, spent like normal ki.',
  },
  {
    name: 'Gate of Flame',
    className: 'Monk',
    subclass: 'Way of the Eight Gates',
    minLevel: 3,
    recharge: 'long',
    max: ({ mods }) => atLeast(mods.wis),
    usage: 'Make an extra unarmed strike when you use Flurry of Blows. Uses equal your Wisdom modifier.',
  },
  {
    name: 'Gate of Mind',
    className: 'Monk',
    subclass: 'Way of the Eight Gates',
    minLevel: 11,
    recharge: 'short',
    max: () => 1,
    usage: 'Cast telepathic bond without components.',
  },
  // ---- Paladin
  {
    name: 'Lay on Hands',
    className: 'Paladin',
    minLevel: 1,
    recharge: 'long',
    max: ({ level }) => level * 5,
    usage:
      'A pool of healing HP (5 × paladin level). Spend any amount of it to heal a creature you touch, or 5 points to cure a disease or poison. Each point counts as one use.',
  },
  {
    name: 'Divine Sense',
    className: 'Paladin',
    minLevel: 1,
    recharge: 'long',
    max: ({ mods }) => 1 + Math.max(0, mods.cha),
    usage:
      'Detect celestials, fiends and undead within 60 ft. Uses are 1 + your Charisma modifier (standard 5e count; adjust if your table differs).',
  },
  {
    name: 'Channel Divinity (Paladin)',
    className: 'Paladin',
    minLevel: 3,
    recharge: 'short',
    max: () => 1,
    usage: 'Use your Sacred Oath Channel Divinity option, such as Guardian\'s Intervention.',
  },
  {
    name: 'Cleansing Touch',
    className: 'Paladin',
    minLevel: 14,
    recharge: 'long',
    max: ({ mods }) => atLeast(mods.cha),
    usage: 'Action: end one spell on yourself or a willing creature. Uses equal your Charisma modifier.',
  },
  // ---- Rogue
  {
    name: 'Stroke of Luck',
    className: 'Rogue',
    minLevel: 20,
    recharge: 'short',
    max: () => 1,
    usage: 'Turn a missed attack into a hit, or a failed ability check into a 20.',
  },
  {
    name: 'Hanabi Points',
    className: 'Rogue',
    subclass: 'Tamaya',
    minLevel: 3,
    recharge: 'long',
    max: ({ level }) => level,
    usage: 'Spend hanabi points to craft spellbombs. Points equal your rogue level.',
  },
  // ---- Sorcerer
  {
    name: 'Sorcery Points',
    className: 'Sorcerer',
    minLevel: 2,
    recharge: 'long',
    max: ({ level }) => level,
    usage:
      'Spend points to create spell slots or fuel Soul Empowerment, and convert slots back into points (Font of Magic). At level 20 you regain 4 on a short rest.',
  },
  {
    name: 'Conduit of the Soul',
    className: 'Sorcerer',
    subclass: 'Spirit Caller',
    minLevel: 1,
    recharge: 'short',
    max: () => 2,
    usage: 'Action: manifest a spirit. Two uses between short or long rests.',
  },
  // ---- Warlock
  ...([
    [11, '6th'],
    [13, '7th'],
    [15, '8th'],
    [17, '9th'],
  ] as const).map(
    ([lv, ord]): ClassResourceDef => ({
      name: `Mystic Arcanum (${ord})`,
      className: 'Warlock',
      minLevel: lv,
      recharge: 'long',
      max: () => 1,
      usage: `Cast one ${ord}-level spell from your Mystic Arcanum without a spell slot.`,
    })
  ),
  {
    name: 'Grim Puppeteer',
    className: 'Warlock',
    subclass: 'The Shinigami',
    minLevel: 1,
    recharge: 'long',
    max: ({ mods }) => atLeast(mods.cha),
    usage: 'Bonus action: control a corpse or unconscious creature within 60 ft for 10 minutes. Uses equal your Charisma modifier.',
  },
  // ---- Wizard
  {
    name: 'Arcane Recovery',
    className: 'Wizard',
    minLevel: 1,
    recharge: 'long',
    max: () => 1,
    usage: ({ level }) =>
      `Once per day, on a short rest, recover spell slots totalling up to ${Math.ceil(level / 2)} levels.`,
  },
  {
    name: 'Signature Spells',
    className: 'Wizard',
    minLevel: 20,
    recharge: 'short',
    max: () => 2,
    usage: 'Cast each of your two signature 3rd-level spells once without a slot (two uses between short rests).',
  },
];

function buildCtx(character: Character, cl: ClassLevel): Ctx {
  const t = getTotalAbilityScores(character);
  return {
    level: cl.level,
    mods: {
      str: getModifier(t.strength),
      dex: getModifier(t.dexterity),
      con: getModifier(t.constitution),
      int: getModifier(t.intelligence),
      wis: getModifier(t.wisdom),
      cha: getModifier(t.charisma),
    },
  };
}

export interface ClassResourceState {
  name: string;
  max: number;
  unlimited: boolean;
  rechargeOn: Recharge;
}

/** The limited-use class and subclass features this character currently has. */
export function computeClassResources(character: Character): ClassResourceState[] {
  const out: ClassResourceState[] = [];
  for (const cl of character.classes) {
    const ctx = buildCtx(character, cl);
    for (const d of DEFS) {
      if (d.className !== cl.className || cl.level < d.minLevel) continue;
      if (d.subclass && cl.subclass !== d.subclass) continue;
      const max = d.max(ctx);
      out.push({
        name: d.name,
        max: max === 'unlimited' ? 0 : max,
        unlimited: max === 'unlimited',
        rechargeOn: typeof d.recharge === 'function' ? d.recharge(ctx) : d.recharge,
      });
    }
  }
  return out;
}

/** "How to use it" text for a resource, from class features, feats or race. */
export function getResourceHelp(character: Character, name: string): string | undefined {
  for (const cl of character.classes) {
    const d = DEFS.find((x) => x.name === name && x.className === cl.className);
    if (d) return typeof d.usage === 'function' ? d.usage(buildCtx(character, cl)) : d.usage;
  }
  return COMMON_RESOURCES.find((t) => t.name === name)?.description;
}

/**
 * The resource list a character should have: manual entries are kept, while
 * race, class and level-scaling trackers are added, resized and removed to match.
 */
export function syncResources(character: Character): Resource[] {
  const current = character.resources ?? [];
  const raceWanted = getRaceResourceNames(character);
  const classWanted = computeClassResources(character);

  let next: Resource[] = current.filter(
    (r) =>
      !(r.source === 'race' && !raceWanted.includes(r.name)) &&
      !(r.source === 'class' && !classWanted.some((c) => c.name === r.name))
  );

  for (const name of raceWanted) {
    if (next.some((r) => r.name === name)) continue;
    const t = COMMON_RESOURCES.find((x) => x.name === name);
    if (!t) continue;
    next.push({
      id: crypto.randomUUID(),
      name,
      max: getResourceMax(t, character.level),
      used: 0,
      rechargeOn: t.rechargeOn,
      source: 'race',
    });
  }

  for (const c of classWanted) {
    const i = next.findIndex((r) => r.name === c.name);
    if (i === -1) {
      next.push({
        id: crypto.randomUUID(),
        name: c.name,
        max: c.max,
        used: 0,
        rechargeOn: c.rechargeOn,
        source: 'class',
        ...(c.unlimited ? { unlimited: true } : {}),
      });
    } else {
      const r = next[i];
      const updated: Resource = {
        ...r,
        max: c.max,
        used: Math.min(r.used, c.max),
        rechargeOn: c.rechargeOn,
        source: 'class',
      };
      if (c.unlimited) updated.unlimited = true;
      else delete updated.unlimited;
      next[i] = updated;
    }
  }

  // Feat and racial uses that scale with proficiency bonus follow the level
  const targets = new Map<string, number>();
  for (const t of COMMON_RESOURCES) {
    if (t.scalesWithProficiency || t.scalesWithHalfProficiency) {
      targets.set(t.name, getResourceMax(t, character.level));
    }
  }
  next = next.map((r) => {
    const target = targets.get(r.name);
    if (r.source === 'class' || target === undefined || r.max === target) return r;
    return { ...r, max: target };
  });

  return next;
}
