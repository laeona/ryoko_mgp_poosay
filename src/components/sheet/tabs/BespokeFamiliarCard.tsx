import { useState } from 'react';
import Rollable from '../../shared/Rollable';
import { SENSEI_TECHNIQUES } from '../../../data/tamer';
import {
  ABILITY_KEYS,
  ABILITY_NAMES,
  getFamiliarStats,
  getKnownImprovementIds,
} from '../../../data/familiars';
import type {
  BespokeFamiliar,
  FamiliarImprovement,
} from '../../../data/familiars';
import { formatModifier } from '../../../utils/dice';
import type { Companion } from '../../../types/character';

interface Props {
  companion: Companion;
  familiar: BespokeFamiliar;
  tamerLevel: number;
  /** Level used to unlock improvements, if different from tamerLevel (Spirit Bonded). */
  unlockLevel?: number;
  proficiencyBonus: number;
  /** How many improvements the tamer's progression allows this companion to learn. */
  improvementBudget: number;
  isActive: boolean;
  sensei: boolean;
  senseiStrikeDie: string;
  senseiStrikeCount: number;
  onUpdate: (u: Partial<Companion>) => void;
  onRemove: () => void;
  onToggleActive: () => void;
}

type Status = 'free' | 'learned' | 'available' | 'locked';

export default function BespokeFamiliarCard({
  companion,
  familiar,
  tamerLevel,
  unlockLevel,
  proficiencyBonus,
  improvementBudget,
  isActive,
  sensei,
  senseiStrikeDie,
  senseiStrikeCount,
  onUpdate,
  onRemove,
  onToggleActive,
}: Props) {
  const [expanded, setExpanded] = useState(isActive);

  const learned = companion.learnedImprovements ?? [];
  const gateLevel = unlockLevel ?? tamerLevel;
  const known = getKnownImprovementIds(familiar, learned);
  const stats = getFamiliarStats(familiar, learned, tamerLevel, proficiencyBonus);

  // The free bonus improvement does not use up one of the tamer's improvements.
  const spent = known.length - 1;
  const remaining = improvementBudget - spent;

  const learn = (id: string) => {
    onUpdate({ learnedImprovements: [...learned, id] });
  };

  // Forgetting an improvement also forgets everything that depends on it.
  const unlearn = (id: string) => {
    const removing = new Set<string>([id]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const imp of familiar.improvements) {
        if (imp.requires && removing.has(imp.requires) && !removing.has(imp.id)) {
          removing.add(imp.id);
          changed = true;
        }
      }
    }
    onUpdate({ learnedImprovements: learned.filter((x) => !removing.has(x)) });
  };

  const statusOf = (
    imp: FamiliarImprovement
  ): { status: Status; reason?: string } => {
    if (imp.id === familiar.bonusImprovement) return { status: 'free' };
    if (known.includes(imp.id)) return { status: 'learned' };
    if (gateLevel < imp.level) {
      return { status: 'locked', reason: `Needs level ${imp.level}` };
    }
    if (imp.requires && !known.includes(imp.requires)) {
      const req = familiar.improvements.find((i) => i.id === imp.requires);
      return { status: 'locked', reason: `Needs ${req?.name ?? imp.requires}` };
    }
    if (remaining <= 0) {
      return { status: 'locked', reason: 'No improvements left' };
    }
    return { status: 'available' };
  };

  const levels = Array.from(
    new Set(familiar.improvements.map((i) => i.level))
  ).sort((a, b) => a - b);

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

        <span className="text-xs text-gray-600">
          {stats.size} {familiar.creatureType} (Yokai) · CR 1/8
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">
          Bespoke · p. {familiar.page}
        </span>

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

      {/* Summary row (all values calculated automatically) */}
      <div className="px-3 pb-2 flex flex-wrap items-center gap-4 text-xs text-gray-600">
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
          <span className="font-bold text-ink">{stats.maxHP}</span>
          <button
            onClick={() => onUpdate({ currentHP: stats.maxHP })}
            className="ml-2 text-jade hover:underline"
          >
            full heal
          </button>
        </span>
        <span>
          AC: <span className="font-bold text-ink">{stats.ac}</span>
        </span>
        <span>
          Speed:{' '}
          <span className="font-bold text-ink">
            {stats.speed} ft.
            {familiar.extraSpeed ? `, ${familiar.extraSpeed}` : ''}
          </span>
        </span>
        <span>
          Hit Dice:{' '}
          <span className="font-bold text-ink">
            {stats.hitDiceTotal}d{stats.hitDie}
          </span>
        </span>
        <span>
          Save DC:{' '}
          <span className="font-bold text-ink">{stats.saveDC}</span>
          <span className="text-gray-400">
            {' '}
            ({ABILITY_NAMES[familiar.saveAbility].slice(0, 3)})
          </span>
        </span>
        <span className="text-jade font-semibold">
          Improvements: {spent} / {improvementBudget}
        </span>
        {remaining < 0 && (
          <span className="text-red-600 font-semibold">
            Over by {-remaining} - forget some
          </span>
        )}
      </div>

      {expanded && (
        <div className="px-3 pb-3 pt-2 border-t border-gray-100 space-y-4">
          {/* Stat block */}
          <div>
            <div className="grid grid-cols-6 gap-2 text-center mb-2">
              {ABILITY_KEYS.map((k) => (
                <div key={k} className="bg-gray-50 rounded py-1">
                  <div className="text-[10px] uppercase font-semibold text-gray-500">
                    {k}
                  </div>
                  <div className="text-sm font-bold">
                    {familiar.abilities[k]}{' '}
                    <span className="text-ember">
                      ({formatModifier(stats.mods[k])})
                    </span>
                  </div>
                  <Rollable
                    d20Modifier={stats.mods[k]}
                    label={`${companion.name}: ${ABILITY_NAMES[k]} check/save`}
                    className="text-[10px] text-gray-500 underline"
                  >
                    roll
                  </Rollable>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-600 space-y-0.5">
              <div>
                <strong>AC base:</strong> {familiar.baseAC} ({familiar.acNote})
                {' · '}
                <strong>Alignment:</strong> {familiar.alignment}
              </div>
              {stats.skills.length > 0 && (
                <div>
                  <strong>Skills:</strong>{' '}
                  {stats.skills
                    .map((s) => `${s.name} ${formatModifier(s.bonus)}`)
                    .join(', ')}
                </div>
              )}
              <div>
                <strong>Senses:</strong>{' '}
                {familiar.senses ? `${familiar.senses}, ` : ''}passive
                Perception {stats.passivePerception}
              </div>
              {familiar.immunities && (
                <div>
                  <strong>Immunities:</strong> {familiar.immunities}
                </div>
              )}
              <div>
                <strong>Languages:</strong> {familiar.languages}
              </div>
              <div>
                <strong>Crafted from:</strong> {familiar.component}
              </div>
            </div>
          </div>

          {/* Traits */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Traits
            </div>
            <div className="space-y-1">
              {familiar.traits.map((t) => (
                <p key={t.name} className="text-xs text-gray-700">
                  <strong>{t.name}.</strong> {t.text}
                </p>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Actions (click a bonus or damage to roll)
            </div>
            <div className="space-y-1">
              {stats.actions.map((a) => (
                <div key={a.name} className="text-sm bg-gray-50 rounded px-2 py-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold">{a.name}</span>
                    {a.roll && a.roll.type === 'attack' && (
                      <Rollable
                        d20Modifier={a.roll.attackBonus ?? 0}
                        label={`${companion.name}: ${a.name}`}
                        className="text-ember font-bold"
                      >
                        {formatModifier(a.roll.attackBonus ?? 0)} to hit
                      </Rollable>
                    )}
                    {a.roll && a.roll.type === 'save' && (
                      <span className="text-xs text-gray-600">
                        DC {a.roll.saveDC} {a.roll.saveAbility} save
                      </span>
                    )}
                    {a.roll && (
                      <Rollable
                        formula={a.roll.damageFormula}
                        label={`${companion.name}: ${a.name} damage`}
                        className="font-bold"
                      >
                        {a.roll.damageFormula} {a.roll.damageType}
                      </Rollable>
                    )}
                    {a.roll && (
                      <span className="text-xs text-gray-500">{a.roll.range}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{a.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement tree */}
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Improvements ({spent} / {improvementBudget} from Tamer progression,
              plus the free one)
            </div>
            <div className="space-y-3">
              {levels.map((lvl) => (
                <div key={lvl}>
                  <div
                    className={`text-xs font-bold mb-1 ${
                      gateLevel >= lvl ? 'text-jade' : 'text-gray-400'
                    }`}
                  >
                    Tamer level {lvl}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {familiar.improvements
                      .filter((imp) => imp.level === lvl)
                      .map((imp) => {
                        const { status, reason } = statusOf(imp);
                        const border =
                          status === 'free' || status === 'learned'
                            ? 'border-jade bg-green-50'
                            : status === 'available'
                              ? 'border-gray-300 bg-white'
                              : 'border-gray-200 bg-gray-50 opacity-60';
                        return (
                          <div
                            key={imp.id}
                            className={`rounded border p-2 text-sm ${border}`}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{imp.name}</span>
                              <span className="text-xs text-gray-500">
                                {imp.kind}
                              </span>
                              {status === 'free' && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-jade text-white">
                                  Free
                                </span>
                              )}
                              <span className="ml-auto flex items-center gap-2">
                                {status === 'available' && (
                                  <button
                                    onClick={() => learn(imp.id)}
                                    className="px-2 py-0.5 text-xs bg-jade text-white rounded hover:bg-green-800"
                                  >
                                    Learn
                                  </button>
                                )}
                                {status === 'learned' && (
                                  <button
                                    onClick={() => unlearn(imp.id)}
                                    className="px-2 py-0.5 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50"
                                  >
                                    Forget
                                  </button>
                                )}
                                {status === 'locked' && reason && (
                                  <span className="text-xs text-gray-500">
                                    {reason}
                                  </span>
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 mt-1">
                              {imp.summary}
                            </p>
                            {imp.upgrades?.map((u) => (
                              <p
                                key={u.level}
                                className={`text-xs mt-1 ${
                                  tamerLevel >= u.level
                                    ? 'text-jade font-semibold'
                                    : 'text-gray-400'
                                }`}
                              >
                                Tamer {u.level}: {u.text}
                              </p>
                            ))}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensei section */}
          {sensei && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3">
              <div className="text-sm font-semibold mb-1">
                Sensei: Martial Strikes ({senseiStrikeDie}, {senseiStrikeCount}×
                per Attack action)
              </div>
              <div className="text-xs uppercase text-gray-500 font-semibold mt-2 mb-1">
                Martial Techniques ({companion.senseiTechniques?.length ?? 0}{' '}
                selected)
              </div>
              <div className="flex flex-wrap gap-1">
                {SENSEI_TECHNIQUES.map((tech) => {
                  const selected = (companion.senseiTechniques ?? []).includes(
                    tech.id
                  );
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
              placeholder="Choices (e.g. Versatile picks), reminders..."
              rows={3}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
