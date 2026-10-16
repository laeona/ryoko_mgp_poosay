import { useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { getClass } from '../../data/classes';
import {
  computeLevelUpSummary,
  getAverageHP,
  rollHP,
  type LevelUpSummary,
} from '../../utils/levelUp';
import {
  ABILITY_FULL_LABELS,
  ABILITY_KEYS,
  ABILITY_LABELS,
  getModifier,
  getTotalAbilityScores,
} from '../../utils/calculations';
import type { AbilityScoreKey } from '../../types/character';

interface Props {
  characterId: string;
  onClose: () => void;
}

export default function LevelUpWizard({ characterId, onClose }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  const [classIndex, setClassIndex] = useState<number | null>(
    character && character.classes.length === 1 ? 0 : null
  );
  const [hpMode, setHpMode] = useState<'average' | 'rolled'>('average');
  const [rolledValue, setRolledValue] = useState<number | null>(null);
  const [subclassChoice, setSubclassChoice] = useState<string | null>(null);
  const [asiMode, setAsiMode] = useState<'none' | 'plus2' | 'plus1plus1' | 'feat'>(
    'none'
  );
  const [asiAbility1, setAsiAbility1] = useState<AbilityScoreKey | null>(null);
  const [asiAbility2, setAsiAbility2] = useState<AbilityScoreKey | null>(null);

  if (!character) return null;

  const summary: LevelUpSummary | null =
    classIndex !== null ? computeLevelUpSummary(character, classIndex) : null;

  const canConfirm =
    summary !== null &&
    (!summary.subclassAvailable || subclassChoice !== null) &&
    (!summary.asiAvailable ||
      asiMode === 'none' ||
      asiMode === 'feat' ||
      (asiMode === 'plus2' && asiAbility1 !== null) ||
      (asiMode === 'plus1plus1' &&
        asiAbility1 !== null &&
        asiAbility2 !== null &&
        asiAbility1 !== asiAbility2));

  const handleRollHP = () => {
    if (!summary) return;
    const rolled = rollHP(summary.hitDie);
    setRolledValue(rolled);
    setHpMode('rolled');
  };

  const handleConfirm = () => {
    if (!summary || !canConfirm) return;

    const cl = character.classes[summary.classIndex];
    const cls = getClass(cl.className);
    if (!cls) return;

    // 1. Compute HP gain
    const scoreBefore = getTotalAbilityScores(character);
    const conModBefore = getModifier(scoreBefore.constitution);

    // 2. Apply ASI to ability scores
    let updatedAbilityScores = { ...character.abilityScores };
    if (summary.asiAvailable && asiMode === 'plus2' && asiAbility1) {
      updatedAbilityScores[asiAbility1] += 2;
    } else if (
      summary.asiAvailable &&
      asiMode === 'plus1plus1' &&
      asiAbility1 &&
      asiAbility2
    ) {
      updatedAbilityScores[asiAbility1] += 1;
      updatedAbilityScores[asiAbility2] += 1;
    }

    // 3. Compute new CON mod
    const characterAfterASI = {
      ...character,
      abilityScores: updatedAbilityScores,
    };
    const scoreAfter = getTotalAbilityScores(characterAfterASI);
    const conModAfter = getModifier(scoreAfter.constitution);
    const conModDelta = conModAfter - conModBefore;

    // 4. Compute HP gain
    const baseHP =
      hpMode === 'average'
        ? getAverageHP(summary.hitDie)
        : rolledValue ?? getAverageHP(summary.hitDie);
    const hpFromLevel = Math.max(1, baseHP + conModAfter);

    // Retroactive CON bonus for all previous levels
    const totalLevelBefore = character.level;
    const retroactiveHP = conModDelta > 0 ? totalLevelBefore * conModDelta : 0;

    const totalHPGain = hpFromLevel + retroactiveHP;

    // 5. Update classes
    const updatedClasses = character.classes.map((c, i) =>
      i === summary.classIndex
        ? {
            ...c,
            level: summary.newLevel,
            subclass: subclassChoice ?? c.subclass,
            choices: {
              ...c.choices,
              ...(subclassChoice && cl.className === 'Tamer'
                ? { paradigm: subclassChoice }
                : {}),
            },
          }
        : c
    );

    // 6. Compute total level
    const totalLevelAfter = updatedClasses.reduce((s, c) => s + c.level, 0);

    // 7. Apply
    updateCharacter(character.id, {
      classes: updatedClasses,
      abilityScores: updatedAbilityScores,
      level: totalLevelAfter,
      combat: {
        ...character.combat,
        maxHP: character.combat.maxHP + totalHPGain,
        currentHP: character.combat.currentHP + totalHPGain,
      },
    });

    // 8. Close
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-parchment rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-ink text-parchment p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">⬆️ Level Up Wizard</h2>
          <button
            onClick={onClose}
            className="text-parchment hover:text-ember text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Choose class */}
          {character.classes.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>Add a class first on the Class tab.</p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                  {character.classes.length === 1
                    ? 'Level Up'
                    : 'Choose a Class'}
                </h3>
                {character.classes.length === 1 ? (
                  <button
                    className="w-full text-left p-3 rounded border-2 border-ember bg-ember/10"
                    disabled
                  >
                    <div className="font-bold">
                      {character.classes[0].className}
                    </div>
                    <div className="text-xs text-gray-600">
                      Level {character.classes[0].level} → Level{' '}
                      {character.classes[0].level + 1}
                    </div>
                  </button>
                ) : (
                  <div className="space-y-2">
                    {character.classes.map((cl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setClassIndex(i);
                          setSubclassChoice(null);
                          setAsiMode('none');
                          setAsiAbility1(null);
                          setAsiAbility2(null);
                          setRolledValue(null);
                          setHpMode('average');
                        }}
                        className={`w-full text-left p-3 rounded border-2 transition ${
                          classIndex === i
                            ? 'border-ember bg-ember/10'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-bold">{cl.className}</div>
                        <div className="text-xs text-gray-600">
                          Level {cl.level}
                          {cl.level < 20 ? ` → Level ${cl.level + 1}` : ' (Max)'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: What you gain */}
              {summary && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                      What You Gain
                    </h3>
                    <div className="bg-white rounded p-4 space-y-3">
                      {/* HP */}
                      <div>
                        <div className="font-semibold mb-1">
                          Hit Points (d{summary.hitDie})
                        </div>
                        <div className="flex gap-2 items-center text-sm">
                          <button
                            onClick={() => setHpMode('average')}
                            className={`px-3 py-1 rounded border-2 transition ${
                              hpMode === 'average'
                                ? 'border-ember bg-ember/10 font-semibold'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            Average: {getAverageHP(summary.hitDie)}
                          </button>
                          <button
                            onClick={handleRollHP}
                            className={`px-3 py-1 rounded border-2 transition ${
                              hpMode === 'rolled'
                                ? 'border-ember bg-ember/10 font-semibold'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            🎲 Roll
                            {rolledValue !== null && hpMode === 'rolled' && (
                              <span className="ml-2 font-bold">
                                {rolledValue}
                              </span>
                            )}
                          </button>
                          <span className="text-xs text-gray-500">
                            + CON modifier
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      {(summary.newClassFeatures.length > 0 ||
                        summary.newSubclassFeatures.length > 0) && (
                        <div>
                          <div className="font-semibold mb-1">
                            New Features
                          </div>
                          <ul className="text-sm space-y-1">
                            {summary.newClassFeatures.map((f) => (
                              <li key={f.name} className="flex gap-2">
                                <span className="text-jade">●</span>
                                <span>
                                  <strong>{f.name}:</strong> {f.description}
                                </span>
                              </li>
                            ))}
                            {summary.newSubclassFeatures.map((f) => (
                              <li key={f.name} className="flex gap-2">
                                <span className="text-ember">◆</span>
                                <span>
                                  <strong>{f.name}:</strong> {f.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Notifications */}
                      <div className="text-xs space-y-1 text-gray-600">
                        {summary.newTechniqueAvailable && (
                          <div className="text-jade font-semibold">
                            ⚔️ New Advanced Weapon Mastery technique available
                            — pick on Weapon Mastery tab after level up.
                          </div>
                        )}
                        {summary.newSpellSlotsChanged && (
                          <div className="text-jade font-semibold">
                            ✨ Spell slots changed — check Spells tab.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Choices */}
                  {summary.subclassAvailable && (
                    <div>
                      <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                        Choose {summary.subclassLabel}
                      </h3>
                      <div className="space-y-2">
                        {getClass(summary.className)?.subclasses.map((s) => (
                          <button
                            key={s.name}
                            onClick={() => setSubclassChoice(s.name)}
                            className={`w-full text-left p-3 rounded border-2 transition ${
                              subclassChoice === s.name
                                ? 'border-ember bg-ember/10'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="font-bold">{s.name}</div>
                            <div className="text-xs text-gray-600">
                              {s.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {summary.asiAvailable && (
                    <div>
                      <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                        Ability Score Improvement
                      </h3>
                      <div className="bg-white rounded p-4 space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <ASIModeButton
                            label="Skip for now"
                            active={asiMode === 'none'}
                            onClick={() => setAsiMode('none')}
                          />
                          <ASIModeButton
                            label="+2 to one"
                            active={asiMode === 'plus2'}
                            onClick={() => setAsiMode('plus2')}
                          />
                          <ASIModeButton
                            label="+1 to two"
                            active={asiMode === 'plus1plus1'}
                            onClick={() => setAsiMode('plus1plus1')}
                          />
                          <ASIModeButton
                            label="Take a Feat"
                            active={asiMode === 'feat'}
                            onClick={() => setAsiMode('feat')}
                          />
                        </div>

                        {asiMode === 'plus2' && (
                          <div>
                            <div className="text-xs text-gray-500 mb-2">
                              Choose one ability to increase by +2
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {ABILITY_KEYS.map((key) => (
                                <button
                                  key={key}
                                  onClick={() => setAsiAbility1(key)}
                                  className={`p-2 rounded border-2 text-sm transition ${
                                    asiAbility1 === key
                                      ? 'border-ember bg-ember/10 font-semibold'
                                      : 'border-gray-200 hover:border-gray-400'
                                  }`}
                                >
                                  {ABILITY_FULL_LABELS[key]}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {asiMode === 'plus1plus1' && (
                          <div>
                            <div className="text-xs text-gray-500 mb-2">
                              Choose two abilities to increase by +1 each
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {ABILITY_KEYS.map((key) => {
                                const isSelected =
                                  asiAbility1 === key || asiAbility2 === key;
                                return (
                                  <button
                                    key={key}
                                    onClick={() => {
                                      if (asiAbility1 === key) {
                                        setAsiAbility1(null);
                                      } else if (asiAbility2 === key) {
                                        setAsiAbility2(null);
                                      } else if (!asiAbility1) {
                                        setAsiAbility1(key);
                                      } else if (!asiAbility2) {
                                        setAsiAbility2(key);
                                      }
                                    }}
                                    className={`p-2 rounded border-2 text-sm transition ${
                                      isSelected
                                        ? 'border-ember bg-ember/10 font-semibold'
                                        : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                  >
                                    {ABILITY_FULL_LABELS[key]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {asiMode === 'feat' && (
                          <div className="text-sm bg-amber-50 border border-amber-200 rounded p-3 text-gray-700">
                            Choose a feat on the{' '}
                            <strong>Feats tab</strong> after level up.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={`px-4 py-2 rounded font-semibold transition ${
              canConfirm
                ? 'bg-jade text-white hover:bg-green-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Level Up
          </button>
        </div>
      </div>
    </div>
  );
}

function ASIModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded border-2 text-sm transition ${
        active
          ? 'border-ember bg-ember/10 font-semibold'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {label}
    </button>
  );
}