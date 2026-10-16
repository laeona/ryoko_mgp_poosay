import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import {
  CREATURE_TYPES,
  SENSEI_TECHNIQUES,
  SIZES,
  TAMER_PROGRESSION,
  getCompanionProgression,
  getSenseiStrikeCount,
  getSenseiStrikeDie,
  getTamerLevel,
  isSensei,
} from '../../../data/tamer';
import type { Companion } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function TamerTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const tamerLevel = getTamerLevel(character.classes);
  const sensei = isSensei(character.classes);

  if (tamerLevel === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">
          This tab is only for characters with levels in <strong>Tamer</strong>.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Add Tamer as a class on the Class tab to unlock companion management.
        </p>
      </div>
    );
  }

  const tamer = character.tamer ?? {
    companions: [],
    activeCompanionId: undefined,
    paradigm: undefined,
  };

  const prog = TAMER_PROGRESSION[tamerLevel];
  const companions = tamer.companions;

  const updateTamer = (updates: Partial<typeof tamer>) => {
    updateCharacter(character.id, {
      tamer: { ...tamer, ...updates },
    });
  };

  const addCompanion = () => {
    if (companions.length >= prog.maxCompanions) {
      alert(`You already have the maximum ${prog.maxCompanions} companions at Tamer ${tamerLevel}.`);
      return;
    }
    const newCompanion: Companion = {
      id: crypto.randomUUID(),
      name: `Companion ${companions.length + 1}`,
      creatureType: 'Beast',
      cr: 0.5,
      size: 'Small',
      maxHP: 10,
      currentHP: 10,
      tempHP: 0,
      ac: 12,
      speed: '30 ft.',
      improvements: [],
      notes: '',
    };
    updateTamer({ companions: [...companions, newCompanion] });
  };

  const updateCompanion = (id: string, updates: Partial<Companion>) => {
    updateTamer({
      companions: companions.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    });
  };

  const removeCompanion = (id: string) => {
    if (!confirm('Remove this companion?')) return;
    updateTamer({
      companions: companions.filter((c) => c.id !== id),
      activeCompanionId:
        tamer.activeCompanionId === id ? undefined : tamer.activeCompanionId,
    });
  };

  return (
    <div className="space-y-4">
      {/* Tamer summary */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox label="Tamer Level" value={String(tamerLevel)} />
        <StatBox
          label="Companions"
          value={`${companions.length} / ${prog.maxCompanions}`}
        />
        <StatBox label="Max Size" value={prog.maxSize} />
        <StatBox label="Max CR" value={prog.maxCR === 0.5 ? '½' : String(prog.maxCR)} />
      </div>

      {/* Sensei banner */}
      {sensei && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-lg">Sensei Training</span>
            <span className="px-2 py-0.5 bg-ember text-white text-xs rounded">
              Subclass
            </span>
          </div>
          <p className="text-sm text-gray-700">
            Your companions gain <strong>Martial Strikes</strong> ({getSenseiStrikeDie(tamerLevel)} damage)
            and can make <strong>{getSenseiStrikeCount(tamerLevel)}</strong> strike{getSenseiStrikeCount(tamerLevel) > 1 ? 's' : ''} per Attack action.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            At 3rd level you choose 3 techniques; more at 7th, 10th, 14th, 18th.
          </p>
        </div>
      )}

      {/* Add companion */}
      <div className="flex items-center gap-3">
        <button
          onClick={addCompanion}
          disabled={companions.length >= prog.maxCompanions}
          className={`px-4 py-2 rounded transition ${
            companions.length >= prog.maxCompanions
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-jade text-white hover:bg-green-800'
          }`}
        >
          + Add Companion
        </button>
        {companions.length === 0 && (
          <span className="text-sm text-gray-500">
            No companions yet. Add your first bonded companion.
          </span>
        )}
      </div>

      {/* Companion list */}
      {companions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <p>No companions bound yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {companions.map((c) => {
            const compProg = getCompanionProgression(tamerLevel, c.cr);
            const isActive = tamer.activeCompanionId === c.id;
            return (
              <CompanionCard
                key={c.id}
                companion={c}
                progression={compProg}
                isActive={isActive}
                sensei={sensei}
                senseiStrikeDie={getSenseiStrikeDie(tamerLevel)}
                senseiStrikeCount={getSenseiStrikeCount(tamerLevel)}
                onUpdate={(u) => updateCompanion(c.id, u)}
                onRemove={() => removeCompanion(c.id)}
                onToggleActive={() =>
                  updateTamer({
                    activeCompanionId: isActive ? undefined : c.id,
                  })
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="text-xs uppercase text-gray-500 font-semibold">
        {label}
      </div>
      <div className="text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

interface CompanionCardProps {
  companion: Companion;
  progression: { imp: number; hitDice: number };
  isActive: boolean;
  sensei: boolean;
  senseiStrikeDie: string;
  senseiStrikeCount: number;
  onUpdate: (u: Partial<Companion>) => void;
  onRemove: () => void;
  onToggleActive: () => void;
}

function CompanionCard({
  companion,
  progression,
  isActive,
  sensei,
  senseiStrikeDie,
  senseiStrikeCount,
  onUpdate,
  onRemove,
  onToggleActive,
}: CompanionCardProps) {
  const [expanded, setExpanded] = useState(isActive);
  const [newImprovement, setNewImprovement] = useState('');

  const addImprovement = () => {
    if (!newImprovement.trim()) return;
    onUpdate({
      improvements: [...(companion.improvements ?? []), newImprovement.trim()],
    });
    setNewImprovement('');
  };

  const removeImprovement = (idx: number) => {
    onUpdate({
      improvements: (companion.improvements ?? []).filter((_, i) => i !== idx),
    });
  };

  const toggleSenseiTechnique = (techId: string) => {
    const current = companion.senseiTechniques ?? [];
    const next = current.includes(techId)
      ? current.filter((t) => t !== techId)
      : [...current, techId];
    onUpdate({ senseiTechniques: next });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow border-l-4 transition ${
        isActive ? 'border-jade' : 'border-gray-300'
      }`}
    >
      {/* Header */}
      <div className="p-3 flex items-center gap-3 flex-wrap">
        <button
          onClick={onToggleActive}
          className={`px-2 py-0.5 text-xs rounded font-bold ${
            isActive
              ? 'bg-jade text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title={isActive ? 'Active (click to dismiss)' : 'Click to summon'}
        >
          {isActive ? 'ACTIVE' : 'IN VESSEL'}
        </button>

        <input
          value={companion.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="flex-1 font-bold text-lg border-b border-transparent hover:border-gray-300 focus:border-ember outline-none min-w-[120px]"
        />

        <select
          value={companion.creatureType}
          onChange={(e) => onUpdate({ creatureType: e.target.value })}
          className="text-xs border border-gray-300 rounded px-1 py-0.5"
        >
          {CREATURE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={companion.size}
          onChange={(e) =>
            onUpdate({ size: e.target.value as Companion['size'] })
          }
          className="text-xs border border-gray-300 rounded px-1 py-0.5"
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-500">CR</span>
          <input
            type="number"
            step={0.125}
            min={0}
            max={6}
            value={companion.cr}
            onChange={(e) =>
              onUpdate({ cr: parseFloat(e.target.value) || 0.5 })
            }
            className="w-16 text-center border border-gray-300 rounded px-1 py-0.5"
          />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-ink"
        >
          {expanded ? '▾' : '▸'}
        </button>

        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      {/* Summary row */}
      <div className="px-3 pb-2 flex flex-wrap gap-4 text-xs text-gray-600">
        <span>
          HP:{' '}
          <input
            type="number"
            value={companion.currentHP}
            onChange={(e) =>
              onUpdate({ currentHP: parseInt(e.target.value) || 0 })
            }
            className="w-12 text-center border-b border-gray-300 focus:border-ember outline-none"
          />
          {' / '}
          <input
            type="number"
            value={companion.maxHP}
            onChange={(e) =>
              onUpdate({ maxHP: parseInt(e.target.value) || 0 })
            }
            className="w-12 text-center border-b border-gray-300 focus:border-ember outline-none"
          />
        </span>
        <span>
          AC:{' '}
          <input
            type="number"
            value={companion.ac}
            onChange={(e) => onUpdate({ ac: parseInt(e.target.value) || 0 })}
            className="w-10 text-center border-b border-gray-300 focus:border-ember outline-none"
          />
        </span>
        <span>
          Speed:{' '}
          <input
            value={companion.speed}
            onChange={(e) => onUpdate({ speed: e.target.value })}
            className="w-24 border-b border-gray-300 focus:border-ember outline-none text-center"
          />
        </span>
        <span className="text-jade font-semibold">
          Improvements: {progression.imp}
        </span>
        <span className="text-jade font-semibold">
          +{progression.hitDice} Hit Dice
        </span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-3 pb-3 pt-2 border-t border-gray-100 space-y-3">
          {/* Improvements */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Improvements ({progression.imp} available from Tamer progression)
            </div>
            <div className="space-y-1 mb-2">
              {(companion.improvements ?? []).map((imp, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm bg-gray-50 rounded px-2 py-1"
                >
                  <span className="flex-1">{imp}</span>
                  <button
                    onClick={() => removeImprovement(i)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newImprovement}
                onChange={(e) => setNewImprovement(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addImprovement()}
                placeholder="E.g., Growth I, Multiattack, Shell I..."
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={addImprovement}
                className="px-3 py-1 text-sm bg-jade text-white rounded hover:bg-green-800"
              >
                Add
              </button>
            </div>
          </div>

          {/* Sensei section */}
          {sensei && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3">
              <div className="text-sm font-semibold mb-1">
                Sensei: Martial Strikes ({senseiStrikeDie}, {senseiStrikeCount}× per Attack action)
              </div>
              <div className="text-xs uppercase text-gray-500 font-semibold mt-2 mb-1">
                Martial Techniques ({companion.senseiTechniques?.length ?? 0} selected)
              </div>
              <div className="flex flex-wrap gap-1">
                {SENSEI_TECHNIQUES.map((tech) => {
                  const selected = (companion.senseiTechniques ?? []).includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      onClick={() => toggleSenseiTechnique(tech.id)}
                      title={tech.description}
                      className={`px-2 py-0.5 text-xs rounded border transition ${
                        selected
                          ? 'bg-ember text-white border-ember'
                          : 'bg-white border-gray-300 hover:border-ember'
                      }`}
                    >
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Notes
            </div>
            <textarea
              value={companion.notes}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              placeholder="Stat block notes, actions, traits..."
              rows={3}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}