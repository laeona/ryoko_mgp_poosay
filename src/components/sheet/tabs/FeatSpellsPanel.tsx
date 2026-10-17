import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { SPELLS } from '../../../data/spells';
import { FEAT_SPELL_RULES, type FeatSpellRule } from '../../../data/featSpells';
import {
  formatModifier,
  getFeatAbilityChoice,
  getModifier,
  getProficiencyBonus,
  getSpellAttackBonus,
  getSpellSaveDC,
  getTotalAbilityScores,
} from '../../../utils/calculations';
import type { Character, DnDSpell } from '../../../types/character';

interface Props {
  characterId: string;
}

const ELEMENTS = ['air', 'earth', 'fire', 'water'] as const;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const list = (raw?: string) =>
  (raw ?? '').split(',').map((x) => x.trim()).filter(Boolean);

function findSpell(name: string): DnDSpell | undefined {
  return SPELLS.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

/** Spells granted by feats, shown separately so they never count against class limits. */
export default function FeatSpellsPanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const owned = FEAT_SPELL_RULES.filter((r) => character.feats.includes(r.feat));
  if (owned.length === 0) return null;

  const setChoice = (key: string, value: string) =>
    updateCharacter(character.id, {
      featChoices: { ...(character.featChoices ?? {}), [key]: value },
    });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 space-y-3">
      <h3 className="font-bold text-lg">Spells from feats</h3>
      {owned.map((rule) => (
        <FeatSpellCard
          key={rule.feat}
          rule={rule}
          character={character}
          setChoice={setChoice}
        />
      ))}
    </div>
  );
}

function FeatSpellCard({
  rule,
  character,
  setChoice,
}: {
  rule: FeatSpellRule;
  character: Character;
  setChoice: (key: string, value: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const choices = character.featChoices ?? {};
  const element = choices[`${rule.feat}:element`] ?? '';
  const cantrips = list(choices[`${rule.feat}:cantrips`]);
  const spells = list(choices[`${rule.feat}:spells`]);

  // Spellcasting ability for these spells
  let abilityKey: string | undefined = rule.ability;
  if (rule.abilityChoice) abilityKey = choices[`${rule.feat}:ability`] || undefined;
  if (rule.abilityFromFeat) abilityKey = getFeatAbilityChoice(character, rule.feat);
  const totals = getTotalAbilityScores(character);
  const pb = getProficiencyBonus(character.level);
  let dc: number | undefined;
  let attack: number | undefined;
  if (abilityKey && abilityKey in totals) {
    const mod = getModifier(totals[abilityKey as keyof typeof totals]);
    dc = 8 + pb + mod;
    attack = pb + mod;
  } else if (rule.feat === 'Spell Sniper') {
    dc = getSpellSaveDC(character);
    attack = getSpellAttackBonus(character);
  }

  // Candidate spells for the pickers
  const pool = (level: 0 | 1): DnDSpell[] => {
    let out = SPELLS.filter((s) => s.level === level);
    if (rule.classLists) {
      out = out.filter((s) => s.classes.some((c) => rule.classLists!.includes(c)));
    }
    if (rule.elementPick) {
      out = out.filter((s) => s.benderElement === element);
    }
    if (rule.meleeOnly && level === 0) {
      const melee = out.filter((s) =>
        /melee|unarmed|weapon attack/i.test(s.description + s.castingTime)
      );
      if (melee.length >= (rule.cantrips ?? 0)) out = melee;
    }
    if (rule.cantripOptions && level === 0) {
      out = out.filter((s) => rule.cantripOptions!.includes(s.name));
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  };

  const picker = (
    kind: 'cantrips' | 'spells',
    count: number,
    selected: string[],
    options: DnDSpell[]
  ) => (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-gray-600">
        {kind === 'cantrips' ? 'Cantrips' : '1st-level spell'}
      </div>
      {Array.from({ length: count }).map((_, i) => {
        const taken = selected.filter((n, j) => j !== i && Boolean(n));
        return (
          <select
            key={i}
            value={selected[i] ?? ''}
            onChange={(e) => {
              const next = [...selected];
              next[i] = e.target.value;
              setChoice(`${rule.feat}:${kind}`, next.join(','));
            }}
            className="block px-2 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">Choose...</option>
            {options
              .filter((s) => !taken.includes(s.name))
              .map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
          </select>
        );
      })}
      {options.length === 0 && (
        <div className="text-xs italic text-gray-500">
          No matching spells in the app's spell list yet.
        </div>
      )}
    </div>
  );

  const known: Array<{ name: string; label: string }> = [
    ...(rule.fixed ?? []).map((n) => ({ name: n, label: 'granted' })),
    ...cantrips.map((n) => ({ name: n, label: 'cantrip' })),
    ...spells.map((n) => ({ name: n, label: '1st level' })),
  ];

  return (
    <div className="border border-gray-200 rounded p-3 space-y-2">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="font-semibold">{rule.feat}</span>
        {dc !== undefined && attack !== undefined && (
          <span className="text-xs text-gray-600">
            Spell save DC <strong>{dc}</strong> · spell attack{' '}
            <strong>{formatModifier(attack)}</strong>
          </span>
        )}
      </div>
      {rule.note && <p className="text-xs text-gray-500 italic">{rule.note}</p>}

      {rule.abilityChoice && (
        <label className="block text-xs text-gray-600">
          Spellcasting ability:{' '}
          <select
            value={choices[`${rule.feat}:ability`] ?? ''}
            onChange={(e) => setChoice(`${rule.feat}:ability`, e.target.value)}
            className="ml-1 px-2 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">Choose...</option>
            {rule.abilityChoice.map((a) => (
              <option key={a} value={a}>
                {cap(a)}
              </option>
            ))}
          </select>
        </label>
      )}
      {rule.abilityFromFeat && !abilityKey && (
        <p className="text-xs text-gray-500 italic">
          Choose the ability increase for this feat on the Feats tab to set the spellcasting ability.
        </p>
      )}

      {rule.elementPick && (
        <label className="block text-xs text-gray-600">
          Element:{' '}
          <select
            value={element}
            onChange={(e) => setChoice(`${rule.feat}:element`, e.target.value)}
            className="ml-1 px-2 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">Choose...</option>
            {ELEMENTS.map((el) => (
              <option key={el} value={el}>
                {cap(el)}
              </option>
            ))}
          </select>
        </label>
      )}

      {rule.cantrips !== undefined &&
        (!rule.elementPick || element) &&
        picker('cantrips', rule.cantrips, cantrips, pool(0))}
      {rule.spells !== undefined &&
        (!rule.elementPick || element) &&
        picker('spells', rule.spells, spells, pool(1))}

      {known.length > 0 && (
        <ul className="space-y-1">
          {known.map((k) => {
            const sp = findSpell(k.name);
            const isOpen = open === k.name;
            return (
              <li key={k.name + k.label} className="text-sm bg-gray-50 rounded px-2 py-1">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : k.name)}
                  className="w-full text-left flex items-center justify-between gap-2"
                >
                  <span className="font-semibold">{k.name}</span>
                  <span className="text-xs text-gray-500">
                    {k.label}
                    {sp ? ` · ${sp.castingTime} · ${sp.range}` : ''}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-xs text-gray-700 mt-1">
                    {sp ? sp.description : "Not in the app's spell list; see the rulebook."}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
