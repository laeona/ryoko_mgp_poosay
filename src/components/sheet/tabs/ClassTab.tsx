import { useCharacterStore } from '../../../store/characterStore';
import { CLASSES, getClass } from '../../../data/classes';
import type { DnDClass, Subclass } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function ClassTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  // Single-class for now (multiclass comes in round 2)
  const primary = character.classes[0];

  const setPrimaryClass = (className: string) => {
    const cls = getClass(className);
    if (!cls) return;
    updateCharacter(character.id, {
      classes: [
        {
          className: cls.name,
          level: 1,
          subclass: undefined,
          choices: {},
        },
      ],
    });
  };

  const updatePrimary = (updates: Partial<typeof primary>) => {
    if (!primary) return;
    updateCharacter(character.id, {
      classes: [{ ...primary, ...updates }],
    });
  };

  const selectedClass = primary ? getClass(primary.className) : null;
  const selectedSubclass =
    selectedClass && primary?.subclass
      ? selectedClass.subclasses.find((s) => s.name === primary.subclass)
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* LEFT: Class List */}
      <aside className="bg-white rounded-lg shadow p-3 h-fit lg:sticky lg:top-4">
        <h3 className="font-bold text-sm uppercase text-gray-500 mb-2 px-2">
          Classes
        </h3>
        <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          {CLASSES.map((cls) => {
            const isSelected = cls.name === primary?.className;
            return (
              <button
                key={cls.name}
                onClick={() => setPrimaryClass(cls.name)}
                className={`text-left px-3 py-2 rounded transition ${
                  isSelected
                    ? 'bg-ember text-white font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {cls.name}
                <span className="text-xs block text-gray-400">
                  d{cls.hitDie} · {cls.martialTier}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT: Details */}
      <section className="bg-white rounded-lg shadow p-6">
        {!selectedClass || !primary ? (
          <div className="text-gray-500 text-center py-12">
            <p className="text-lg mb-2">No class selected.</p>
            <p className="text-sm">Choose a class from the list to begin.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-3xl font-bold text-ink">
                  {selectedClass.name}
                  {selectedSubclass && (
                    <span className="text-ember"> · {selectedSubclass.name}</span>
                  )}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  d{selectedClass.hitDie} Hit Die · {selectedClass.martialTier} martial
                  {selectedClass.spellcasting &&
                    ` · ${selectedClass.spellcasting.type} caster`}
                </p>
              </div>
              <button
                onClick={() =>
                  updateCharacter(character.id, { classes: [] })
                }
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Clear
              </button>
            </div>

            {/* Level */}
            <div className="bg-gray-50 rounded p-4">
              <label className="block font-semibold mb-2">Level</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={primary.level}
                  onChange={(e) =>
                    updatePrimary({ level: parseInt(e.target.value) })
                  }
                  className="flex-1"
                />
                <span className="text-2xl font-bold w-12 text-center">
                  {primary.level}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 italic">{selectedClass.description}</p>

            {/* Spellcasting Ability Choice */}
            {selectedClass.spellcasting?.ability === 'choice' && (
              <div className="bg-amber-50 border border-amber-200 rounded p-4">
                <label className="block font-semibold mb-2">
                  Spellcasting Ability
                </label>
                <select
                  value={(primary.choices['spellcasting-ability'] as string) ?? ''}
                  onChange={(e) =>
                    updatePrimary({
                      choices: {
                        ...primary.choices,
                        'spellcasting-ability': e.target.value,
                      },
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">— Choose —</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>
            )}

            {/* Subclass */}
            {primary.level >= selectedClass.subclassLevel && (
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {selectedClass.subclassLabel ?? 'Subclass'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedClass.subclasses.map((sub) => {
                    const isSelected = primary.subclass === sub.name;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => updatePrimary({ subclass: sub.name })}
                        className={`text-left p-4 rounded border-2 transition ${
                          isSelected
                            ? 'border-ember bg-ember/10'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-bold mb-1">{sub.name}</div>
                        <p className="text-xs text-gray-600">{sub.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Class-specific choices at their level */}
            {selectedClass.choices
              ?.filter((c) => primary.level >= c.level)
              .map((choice) => (
                <div key={choice.id}>
                  <label className="block font-semibold mb-1">
                    {choice.label}
                  </label>
                  {choice.type === 'select' ? (
                    <select
                      value={(primary.choices[choice.id] as string) ?? ''}
                      onChange={(e) =>
                        updatePrimary({
                          choices: { ...primary.choices, [choice.id]: e.target.value },
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">— Choose —</option>
                      {choice.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {choice.options.map((opt) => {
                        const arr =
                          (primary.choices[choice.id] as string[]) ?? [];
                        const selected = arr.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              let next = [...arr];
                              if (selected) next = next.filter((x) => x !== opt);
                              else if (!choice.count || next.length < choice.count)
                                next.push(opt);
                              updatePrimary({
                                choices: {
                                  ...primary.choices,
                                  [choice.id]: next,
                                },
                              });
                            }}
                            className={`px-3 py-1 text-sm rounded border transition ${
                              selected
                                ? 'bg-jade text-white border-jade'
                                : 'bg-white border-gray-300 hover:border-jade'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

            {/* Features gained up to current level */}
            <div>
              <h3 className="font-bold text-lg mb-3">
                Features (Levels 1–{primary.level})
              </h3>
              <div className="space-y-2">
                {[...selectedClass.features, ...(selectedSubclass?.features ?? [])]
                  .filter((f) => f.level <= primary.level)
                  .sort((a, b) => a.level - b.level)
                  .map((f, i) => (
                    <div
                      key={`${f.name}-${i}`}
                      className="border-l-4 border-jade pl-3 py-1"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold bg-jade text-white px-2 rounded">
                          Lv {f.level}
                        </span>
                        <span className="font-semibold">{f.name}</span>
                      </div>
                      <p className="text-sm text-gray-700">{f.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Proficiencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ProfBlock label="Saving Throws" values={selectedClass.savingThrows} />
              <ProfBlock label="Primary Ability" values={selectedClass.primaryAbility} />
              <ProfBlock label="Armor" values={selectedClass.armorProficiencies} />
              <ProfBlock label="Weapons" values={selectedClass.weaponProficiencies} />
              <ProfBlock label="Tools" values={selectedClass.toolProficiencies} />
              <ProfBlock
                label={`Skills (choose ${selectedClass.skillChoices.count})`}
                values={selectedClass.skillChoices.options}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ProfBlock({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
        {label}
      </div>
      <div className="text-sm">{values.join(', ')}</div>
    </div>
  );
}