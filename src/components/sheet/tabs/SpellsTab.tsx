import { useMemo, useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { SPELLS, getSpell } from '../../../data/spells';
import { computeSpellSlots } from '../../../data/spellSlots';
import { getClass } from '../../../data/classes';
import {
  formatModifier,
  getSpellAttackBonus,
  getSpellSaveDC,
} from '../../../utils/calculations';
import type { DnDSpell } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function SpellsTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | number>('all');

  if (!character) return null;

  const sc = character.spellcasting;
  const spellSaveDC = getSpellSaveDC(character);
  const spellAttack = getSpellAttackBonus(character);

  // Ensure spellcasting data exists
  if (!sc) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600 mb-4">
          This character doesn't have spellcasting yet.
        </p>
        <button
          onClick={() =>
            updateCharacter(character.id, {
              spellcasting: {
                ability: 'intelligence',
                spellSlots: {},
                spellsKnown: [],
                cantripsKnown: [],
              },
            })
          }
          className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800"
        >
          Enable Spellcasting
        </button>
      </div>
    );
  }

  // Compute slots from classes
  const { slots, pact } = computeSpellSlots(character.classes);

  // Build usage map from character.spellcasting.spellSlots (level -> { max, used })
  const usage = sc.spellSlots;

  const setSlotUsed = (level: number, used: number) => {
    updateCharacter(character.id, {
      spellcasting: {
        ...sc,
        spellSlots: {
          ...usage,
          [level]: { max: slots[level - 1] ?? 0, used: Math.max(0, used) },
        },
      },
    });
  };

  // Available spells (filtered to classes the character has)
  const availableSpells = useMemo(() => {
    const classNames = character.classes.map((c) => c.className);
    return SPELLS.filter((sp) =>
      sp.classes.some((cl) => classNames.includes(cl))
    );
  }, [character.classes]);

  // Filter list
  const filtered = availableSpells.filter((sp) => {
    if (levelFilter !== 'all' && sp.level !== levelFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        sp.name.toLowerCase().includes(q) ||
        sp.school.toLowerCase().includes(q) ||
        sp.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSpell = (spell: DnDSpell) => {
    const isCantrip = spell.level === 0;
    const list = isCantrip ? sc.cantripsKnown : sc.spellsKnown;
    const has = list.includes(spell.name);
    const next = has
      ? list.filter((n) => n !== spell.name)
      : [...list, spell.name];
    updateCharacter(character.id, {
      spellcasting: {
        ...sc,
        [isCantrip ? 'cantripsKnown' : 'spellsKnown']: next,
      },
    });
  };

  const isKnown = (spell: DnDSpell) =>
    spell.level === 0
      ? sc.cantripsKnown.includes(spell.name)
      : sc.spellsKnown.includes(spell.name);

  // Slot UI helper: highest slot level available (for full/half casters)
  const maxSlotLevel = slots.findLastIndex((s) => s > 0) + 1;

  return (
    <div className="space-y-4">
      {/* Spellcasting summary */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryBox
          label="Spell Save DC"
          value={spellSaveDC !== undefined ? String(spellSaveDC) : '—'}
        />
        <SummaryBox
          label="Spell Attack"
          value={spellAttack !== undefined ? formatModifier(spellAttack) : '—'}
        />
        <SummaryBox
          label="Cantrips"
          value={String(sc.cantripsKnown.length)}
        />
        <SummaryBox
          label="Spells Known"
          value={String(sc.spellsKnown.length)}
        />
      </div>

      {/* Spell slots (non-pact) */}
      {maxSlotLevel > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-3">Spell Slots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {slots.slice(0, maxSlotLevel).map((max, i) => {
              const level = i + 1;
              if (max === 0) return null;
              const used = usage[level]?.used ?? 0;
              return (
                <SlotTracker
                  key={level}
                  label={`Level ${level}`}
                  max={max}
                  used={used}
                  onChange={(u) => setSlotUsed(level, u)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Pact Magic */}
      {pact && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-3">
            Pact Magic (Level {pact.level})
          </h3>
          <SlotTracker
            label={`${pact.slots} slots`}
            max={pact.slots}
            used={usage[-1]?.used ?? 0}
            onChange={(u) =>
              updateCharacter(character.id, {
                spellcasting: {
                  ...sc,
                  spellSlots: {
                    ...usage,
                    [-1]: { max: pact.slots, used: u },
                  },
                },
              })
            }
          />
          <p className="text-xs text-gray-500 mt-2">
            Pact slots recharge on a short rest.
          </p>
        </div>
      )}

      {/* Filter bar */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search spells..."
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-ember"
        />
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={levelFilter === 'all'}
            onClick={() => setLevelFilter('all')}
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
            const count = availableSpells.filter((s) => s.level === lvl).length;
            if (count === 0) return null;
            return (
              <FilterChip
                key={lvl}
                label={lvl === 0 ? 'Cantrips' : `Level ${lvl}`}
                count={count}
                active={levelFilter === lvl}
                onClick={() => setLevelFilter(lvl)}
              />
            );
          })}
        </div>
      </div>

      {/* Spell list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          {availableSpells.length === 0
            ? 'No spells available for your classes. Add a spellcasting class on the Class tab.'
            : 'No spells match your search.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((sp) => (
            <SpellCard
              key={sp.name}
              spell={sp}
              known={isKnown(sp)}
              onToggle={() => toggleSpell(sp)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="text-xs uppercase text-gray-500 font-semibold">
        {label}
      </div>
      <div className="text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function SlotTracker({
  label,
  max,
  used,
  onChange,
}: {
  label: string;
  max: number;
  used: number;
  onChange: (used: number) => void;
}) {
  return (
    <div className="border border-gray-200 rounded p-3">
      <div className="text-xs uppercase text-gray-500 font-semibold mb-2">
        {label}
      </div>
      <div className="flex gap-1 flex-wrap mb-2">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i < used ? i : i + 1)}
            className={`w-6 h-6 rounded border transition ${
              i < used
                ? 'bg-gray-300 border-gray-300'
                : 'bg-white border-ember hover:bg-ember/10'
            }`}
            title={i < used ? 'Restore' : 'Expend'}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>
          {max - used} / {max}
        </span>
        <button
          onClick={() => onChange(0)}
          className="ml-auto text-xs text-jade hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full border transition ${
        active
          ? 'bg-ember text-white border-ember'
          : 'bg-white border-gray-300 hover:border-ember'
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`text-xs ml-1 ${
            active ? 'text-white/80' : 'text-gray-500'
          }`}
        >
          ({count})
        </span>
      )}
    </button>
  );
}

function SpellCard({
  spell,
  known,
  onToggle,
}: {
  spell: DnDSpell;
  known: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow border-2 transition ${
        known ? 'border-ember' : 'border-transparent'
      }`}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold truncate">{spell.name}</h3>
            <p className="text-xs text-gray-500">
              {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`} ·{' '}
              {spell.school}
              {spell.concentration && ' · Concentration'}
              {spell.ritual && ' · Ritual'}
            </p>
          </div>
          <button
            onClick={onToggle}
            className={`px-2 py-1 text-xs rounded font-semibold whitespace-nowrap ${
              known
                ? 'bg-ember text-white hover:bg-red-700'
                : 'bg-jade text-white hover:bg-green-800'
            }`}
          >
            {known ? 'Remove' : 'Add'}
          </button>
        </div>
        <div className="text-xs text-gray-600 space-y-0.5">
          <div>
            <span className="font-semibold">Cast:</span> {spell.castingTime}
          </div>
          <div>
            <span className="font-semibold">Range:</span> {spell.range}
          </div>
          <div>
            <span className="font-semibold">Components:</span>{' '}
            {spell.components}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {spell.duration}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-ember mt-2 hover:underline"
        >
          {expanded ? 'Hide description' : 'Show description'}
        </button>
        {expanded && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-sm text-gray-700 space-y-1">
            <p>{spell.description}</p>
            {spell.atHigherLevels && (
              <p className="italic text-gray-600">
                <span className="font-semibold">At Higher Levels.</span>{' '}
                {spell.atHigherLevels}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}