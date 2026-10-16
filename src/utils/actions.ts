import type { Character, AbilityScoreKey } from '../types/character';
import { getClass } from '../data/classes';
import { getRace } from '../data/races';
import { getSpell } from '../data/spells';
import {
  getModifier,
  getProficiencyBonus,
  getTotalAbilityScores,
  getSpellAttackBonus,
  getSpellSaveDC,
} from './calculations';

export interface WeaponAction {
  name: string;
  attackBonus: number;
  damage: string;
  properties: string[];
}

export interface SpellAction {
  name: string;
  level: number;
  attackBonus?: number;
  saveDC?: number;
  damage?: string;
  castingTime: string;
  concentration: boolean;
  summary: string;
}

export interface FeatureAction {
  name: string;
  description: string;
  source: string;
}

export interface UniversalAction {
  name: string;
  description: string;
}

export interface ActionsCompilation {
  weapons: WeaponAction[];
  spellAttacks: SpellAction[];
  actions: FeatureAction[];
  bonusActions: FeatureAction[];
  reactions: FeatureAction[];
}

const UNIVERSAL_ACTIONS: UniversalAction[] = [
  { name: 'Attack', description: 'Make one melee or ranged attack (more with Extra Attack).' },
  { name: 'Cast a Spell', description: 'Cast a spell with a casting time of 1 action.' },
  { name: 'Dash', description: 'Gain extra movement equal to your speed for the turn.' },
  { name: 'Disengage', description: 'Your movement doesn\'t provoke opportunity attacks this turn.' },
  { name: 'Dodge', description: 'Attacks against you have disadvantage until your next turn.' },
  { name: 'Help', description: 'Give an ally advantage on an ability check or attack roll.' },
  { name: 'Hide', description: 'Make a Dexterity (Stealth) check to hide.' },
  { name: 'Ready', description: 'Prepare an action to trigger on a specified condition.' },
  { name: 'Search', description: 'Make a Wisdom (Perception) or Intelligence (Investigation) check.' },
  { name: 'Use an Object', description: 'Interact with a second object or use a magic item.' },
];

export function getUniversalActions(): UniversalAction[] {
  return UNIVERSAL_ACTIONS;
}

export function compileActions(character: Character): ActionsCompilation {
  const scores = getTotalAbilityScores(character);
  const prof = getProficiencyBonus(character.level);
  const spellAtk = getSpellAttackBonus(character);
  const spellDC = getSpellSaveDC(character);

  /* ---------- Weapons ---------- */
  const weapons: WeaponAction[] = [];
  for (const item of character.inventory ?? []) {
    if (item.category !== 'weapon' || !item.equipped || !item.damage) continue;

    const props = item.properties ?? [];
    const lower = props.map((p) => p.toLowerCase()).join(' ');
    const isFinesse = lower.includes('finesse');
    const isRanged =
      lower.includes('ammunition') || lower.includes('thrown');

    let ability: AbilityScoreKey;
    if (isFinesse) {
      ability =
        getModifier(scores.dexterity) >= getModifier(scores.strength)
          ? 'dexterity'
          : 'strength';
    } else if (isRanged) {
      ability = 'dexterity';
    } else {
      ability = 'strength';
    }

    const abilMod = getModifier(scores[ability]);
    const atkBonus = abilMod + prof;

    // Parse "1d8 slashing" → "1d8", "slashing"
    const match = item.damage.match(/^(\d+d\d+|\d+)\s+(.+)$/i);
    const die = match ? match[1] : item.damage;
    const type = match ? match[2] : '';

    const modText = abilMod >= 0 ? `+ ${abilMod}` : `− ${Math.abs(abilMod)}`;
    const damage = `${die} ${modText}${type ? ` ${type}` : ''}`;

    weapons.push({
      name: item.name,
      attackBonus: atkBonus,
      damage,
      properties: props,
    });
  }

  /* ---------- Spell Attacks ---------- */
  const spellAttacks: SpellAction[] = [];
  const knownSpells = [
    ...(character.spellcasting?.cantripsKnown ?? []),
    ...(character.spellcasting?.spellsKnown ?? []),
  ];

  for (const name of knownSpells) {
    const spell = getSpell(name);
    if (!spell) continue;

    const desc = spell.description.toLowerCase();
    const hasAttack = desc.includes('spell attack');
    const hasSave = desc.includes('save');

    if (!hasAttack && !hasSave) continue;

    // Try to grab the first damage die
    const dmgMatch = spell.description.match(
      /(\d+d\d+)\s+(acid|cold|fire|force|lightning|necrotic|poison|psychic|radiant|thunder|bludgeoning|piercing|slashing)/i
    );
    const damage = dmgMatch ? `${dmgMatch[1]} ${dmgMatch[2]}` : undefined;

    spellAttacks.push({
      name: spell.name,
      level: spell.level,
      attackBonus: hasAttack && spellAtk !== undefined ? spellAtk : undefined,
      saveDC: hasSave && spellDC !== undefined ? spellDC : undefined,
      damage,
      castingTime: spell.castingTime,
      concentration: spell.concentration,
      summary: spell.description,
    });
  }

  /* ---------- Feature Actions ---------- */
  const actions: FeatureAction[] = [];
  const bonusActions: FeatureAction[] = [];
  const reactions: FeatureAction[] = [];
  const seen = new Set<string>();

  const pushFeature = (
    name: string,
    description: string,
    source: string
  ) => {
    if (seen.has(name)) return;
    seen.add(name);
    const d = description.toLowerCase();

    // Skip pure passive features
    if (
      !d.includes('as an action') &&
      !d.includes('as a bonus action') &&
      !d.includes('as a reaction') &&
      !d.includes('use an action') &&
      !d.includes('use a bonus action') &&
      !d.includes('use your reaction') &&
      !d.includes('use a reaction') &&
      !d.includes('use the ') === false // allow "use the X action"
    ) {
      // allow through if it explicitly mentions action types
      if (
        !d.includes('bonus action') &&
        !d.includes('reaction')
      ) {
        return;
      }
    }

    const entry: FeatureAction = { name, description, source };

    if (d.includes('bonus action')) {
      bonusActions.push(entry);
    } else if (d.includes('reaction')) {
      reactions.push(entry);
    } else if (d.includes('action')) {
      actions.push(entry);
    }
  };

  // Class + subclass features
  for (const cl of character.classes) {
    const cls = getClass(cl.className);
    if (!cls) continue;
    const sub = cl.subclass
      ? cls.subclasses.find((s) => s.name === cl.subclass)
      : null;
    const allFeatures = [...cls.features, ...(sub?.features ?? [])];
    for (const f of allFeatures) {
      if (f.level > cl.level) continue;
      pushFeature(f.name, f.description, cls.name);
    }
  }

  // Racial traits
  const race = getRace(character.race.name);
  if (race) {
    const sub = character.race.subrace
      ? race.subraces?.find((s) => s.name === character.race.subrace)
      : null;
    const allTraits = [...race.traits, ...(sub?.traits ?? [])];
    for (const t of allTraits) {
      pushFeature(t.name, t.description, race.name);
    }
  }

  return {
    weapons,
    spellAttacks,
    actions,
    bonusActions,
    reactions,
  };
}