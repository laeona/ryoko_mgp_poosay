import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import {
  ABILITY_FULL_LABELS,
  ABILITY_KEYS,
  getRacialBonuses,
} from '../../../utils/calculations';
import type { AbilityScoreKey, Character } from '../../../types/character';

interface Props {
  character: Character;
}

type Method = 'standard' | 'pointbuy' | 'manual' | 'roll';

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export default function AbilityScoresStep({ character }: Props) {
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [method, setMethod] = useState<Method>('standard');
  const [assignments, setAssignments] = useState<Record<AbilityScoreKey, number | null>>({
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null,
  });
  const [rolledValues, setRolledValues] = useState<number[]>([]);

  const racial = getRacialBonuses(character);

  const setScore = (key: AbilityScoreKey, value: number) => {
    updateCharacter(character.id, {
      abilityScores: { ...character.abilityScores, [key]: value },
    });
  };

  // Point Buy helpers
  const spent = ABILITY_KEYS.reduce(
    (sum, k) => sum + (POINT_BUY_COST[character.abilityScores[k]] ?? 0),
    0
  );
  const remaining = 27 - spent;

  // Standard Array helpers
  const assignedValues = Object.values(assignments).filter(
    (v): v is number => v !== null
  );

  const handleStandardAssign = (key: AbilityScoreKey, value: number | null) => {
    const next = { ...assignments, [key]: value };
    setAssignments(next);
    if (value !== null) setScore(key, value);
  };

  const handlePointBuy = (key: AbilityScoreKey, delta: number) => {
    const current = character.abilityScores[key];
    const next = Math.max(8, Math.min(15, current + delta));
    setScore(key, next);
  };

  // Roll 4d6 drop lowest
  const rollOne = () => {
    const dice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    dice.sort((a, b) => b - a);
    return dice.slice(0, 3).reduce((s, d) => s + d, 0);
  };

  const handleRollAll = () => {
    const rolls = Array.from({ length: 6 }, () => rollOne());
    setRolledValues(rolls);
    // Auto-assign in order
    ABILITY_KEYS.forEach((key, i) => {
      setScore(key, rolls[i]);
    });
  };

  // Whether step is valid
  const isComplete = (() => {
    if (method === 'standard') {
      return assignedValues.length === 6;
    }
    if (method === 'pointbuy') {
      return remaining === 0;
    }
    return true;
  })();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ability Scores</h2>
        <p className="text-sm text-gray-600">
          Choose how to generate your base scores. Racial bonuses apply automatically.
        </p>
      </div>

      {/* Method picker */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'standard', label: 'Standard Array' },
            { id: 'pointbuy', label: 'Point Buy' },
            { id: 'manual', label: 'Manual' },
            { id: 'roll', label: 'Roll (4d6 drop lowest)' },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMethod(m.id);
              if (m.id === 'manual') {
                // Reset to 10s for manual
                ABILITY_KEYS.forEach((k) => setScore(k, 10));
              }
              if (m.id === 'pointbuy') {
                ABILITY_KEYS.forEach((k) => setScore(k, 8));
              }
              if (m.id === 'standard') {
                setAssignments({
                  strength: null,
                  dexterity: null,
                  constitution: null,
                  intelligence: null,
                  wisdom: null,
                  charisma: null,
                });
                ABILITY_KEYS.forEach((k) => setScore(k, 0));
              }
            }}
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              method === m.id
                ? 'bg-ember text-white border-ember font-semibold'
                : 'bg-white border-gray-300 hover:border-ember'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Point Buy status */}
      {method === 'pointbuy' && (
        <div className="bg-white rounded p-3 flex items-center justify-between">
          <span className="text-sm text-gray-600">Points remaining</span>
          <span
            className={`text-2xl font-bold ${
              remaining === 0 ? 'text-jade' : remaining < 0 ? 'text-red-500' : 'text-ink'
            }`}
          >
            {remaining} / 27
          </span>
        </div>
      )}

      {/* Standard Array pool */}
      {method === 'standard' && (
        <div className="bg-white rounded p-3">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">
            Available Values
          </div>
          <div className="flex flex-wrap gap-2">
            {STANDARD_ARRAY.map((v) => {
              const usedCount = assignedValues.filter((a) => a === v).length;
              const totalCount = STANDARD_ARRAY.filter((s) => s === v).length;
              const available = usedCount < totalCount;
              return (
                <div
                  key={v}
                  className={`px-3 py-1 rounded border-2 text-sm font-bold ${
                    available
                      ? 'border-jade text-jade'
                      : 'border-gray-200 text-gray-300 line-through'
                  }`}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Roll status */}
      {method === 'roll' && (
        <div className="bg-white rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase text-gray-500 font-semibold">
              Rolled Values
            </span>
            <button
              onClick={handleRollAll}
              className="px-3 py-1 text-xs bg-jade text-white rounded hover:bg-green-800"
            >
              🎲 {rolledValues.length > 0 ? 'Reroll' : 'Roll All'}
            </button>
          </div>
          {rolledValues.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {rolledValues.map((v, i) => (
                <div
                  key={i}
                  className="px-3 py-1 rounded bg-gray-100 text-sm font-bold"
                >
                  {v}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">Click Roll All to generate values.</p>
          )}
        </div>
      )}

      {/* Score grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ABILITY_KEYS.map((key) => {
          const base = character.abilityScores[key];
          const racialBonus = racial[key];
          const total = base + racialBonus;

          return (
            <div key={key} className="bg-white rounded-lg shadow p-4">
              <div className="font-bold text-sm mb-2">
                {ABILITY_FULL_LABELS[key]}
              </div>

              {/* Input based on method */}
              {method === 'standard' && (
                <select
                  value={assignments[key] ?? ''}
                  onChange={(e) =>
                    handleStandardAssign(
                      key,
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1.5"
                >
                  <option value="">— Select —</option>
                  {STANDARD_ARRAY.map((v, i) => {
                    const usedCount = assignedValues.filter((a) => a === v).length;
                    const totalCount = STANDARD_ARRAY.filter((s) => s === v).length;
                    const disabled =
                      usedCount >= totalCount && assignments[key] !== v;
                    return (
                      <option key={`${v}-${i}`} value={v} disabled={disabled}>
                        {v}
                      </option>
                    );
                  })}
                </select>
              )}

              {method === 'pointbuy' && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handlePointBuy(key, -1)}
                    disabled={base <= 8}
                    className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 font-bold disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {base}
                  </span>
                  <button
                    onClick={() => handlePointBuy(key, 1)}
                    disabled={base >= 15 || remaining < (POINT_BUY_COST[base + 1] - POINT_BUY_COST[base])}
                    className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              )}

              {(method === 'manual' || method === 'roll') && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setScore(key, Math.max(1, base - 1))}
                    className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 font-bold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={base}
                    onChange={(e) =>
                      setScore(key, parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center text-2xl font-bold border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => setScore(key, Math.min(30, base + 1))}
                    className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Racial bonus / total */}
              <div className="mt-2 flex items-center justify-between text-xs">
                {racialBonus !== 0 ? (
                  <span className="text-jade font-semibold">
                    {racialBonus > 0 ? `+${racialBonus}` : racialBonus} racial
                  </span>
                ) : (
                  <span />
                )}
                <span className="text-gray-600">
                  Total: <span className="font-bold text-ink">{total}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation note */}
      {!isComplete && (
        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800">
          {method === 'standard' &&
            `Assign all 6 array values to proceed (${assignedValues.length}/6).`}
          {method === 'pointbuy' &&
            `Spend all 27 points to proceed (${remaining} remaining).`}
        </div>
      )}
    </div>
  );
}