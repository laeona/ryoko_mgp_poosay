import { useCharacterStore } from '../../../store/characterStore';
import { RACES } from '../../../data/races';
import {
  ABILITY_KEYS,
  ABILITY_LABELS,
  getRacialBonuses,
} from '../../../utils/calculations';
import type { AbilityScoreKey } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function RaceTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const selectedRace = RACES.find((r) => r.name === character.race.name);
  const selectedSubrace =
    selectedRace?.subraces?.find((s) => s.name === character.race.subrace) ??
    null;
  const racialBonuses = getRacialBonuses(character);

  const updateRace = (updates: Partial<typeof character.race>) => {
    updateCharacter(character.id, {
      race: { ...character.race, ...updates },
    });
  };

  const setChoice = (id: string, value: string | string[]) => {
    updateRace({
      choices: { ...character.race.choices, [id]: value },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* LEFT: Race List */}
      <aside className="bg-white rounded-lg shadow p-3 h-fit lg:sticky lg:top-4">
        <h3 className="font-bold text-sm uppercase text-gray-500 mb-2 px-2">
          Races
        </h3>
        <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          {RACES.map((race) => {
            const isSelected = race.name === character.race.name;
            return (
              <button
                key={race.name}
                onClick={() =>
                  updateRace({
                    name: race.name,
                    subrace: undefined,
                    choices: {},
                  })
                }
                className={`text-left px-3 py-2 rounded transition ${
                  isSelected
                    ? 'bg-ember text-white font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {race.name}
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT: Details */}
      <section className="bg-white rounded-lg shadow p-6">
        {!selectedRace ? (
          <div className="text-gray-500 text-center py-12">
            <p className="text-lg mb-2">No race selected.</p>
            <p className="text-sm">Choose a race from the list to begin.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-3xl font-bold text-ink">
                  {selectedRace.name}
                  {selectedSubrace && (
                    <span className="text-ember">
                      {' '}
                      · {selectedSubrace.name}
                    </span>
                  )}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ABILITY_KEYS.map((key) => {
                    const bonus = racialBonuses[key];
                    if (bonus === 0) return null;
                    return (
                      <span
                        key={key}
                        className="px-2 py-1 text-xs font-bold bg-jade text-white rounded"
                      >
                        {ABILITY_LABELS[key]} +{bonus}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() =>
                  updateRace({ name: '', subrace: undefined, choices: {} })
                }
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Clear
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 italic">{selectedRace.description}</p>

            {/* Pre-subrace choice (e.g., Tatsumi Koi Dragon Colour) */}
            {selectedRace.preSubraceChoice && (
              <div className="bg-amber-50 border border-amber-200 rounded p-4">
                <label className="block font-semibold mb-2">
                  {selectedRace.preSubraceChoice.label}
                </label>
                <select
                  value={
                    (character.race.choices[
                      selectedRace.preSubraceChoice.id
                    ] as string) ?? ''
                  }
                  onChange={(e) =>
                    setChoice(selectedRace.preSubraceChoice!.id, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">— Choose —</option>
                  {selectedRace.preSubraceChoice.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Subrace Selection */}
            {selectedRace.subraces && selectedRace.subraces.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-2">Subrace</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRace.subraces.map((sub) => {
                    const isSelected =
                      character.race.subrace === sub.name;
                    return (
                      <button
                        key={sub.name}
                        onClick={() =>
                          updateRace({ subrace: sub.name, choices: {} })
                        }
                        className={`text-left p-4 rounded border-2 transition ${
                          isSelected
                            ? 'border-ember bg-ember/10'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-bold mb-1">{sub.name}</div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {Object.entries(sub.abilityScoreIncrease).map(
                            ([k, v]) => (
                              <span
                                key={k}
                                className="text-xs px-2 py-0.5 bg-jade text-white rounded"
                              >
                                {ABILITY_LABELS[k as AbilityScoreKey]} +{v}
                              </span>
                            )
                          )}
                        </div>
                        {sub.size && (
                          <div className="text-xs text-gray-600">
                            Size: {sub.size}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Race choices (skill/tool/etc.) */}
            {selectedRace.choices &&
              selectedRace.choices.length > 0 &&
              selectedRace.subraces && (
                <RaceChoices
                  title="Race Choices"
                  choices={selectedRace.choices}
                  values={character.race.choices}
                  onChange={setChoice}
                />
              )}

            {/* Subrace choices */}
            {selectedSubrace?.choices &&
              selectedSubrace.choices.length > 0 && (
                <RaceChoices
                  title={`${selectedSubrace.name} Choices`}
                  choices={selectedSubrace.choices}
                  values={character.race.choices}
                  onChange={setChoice}
                />
              )}

            {/* Traits (combined) */}
            <div>
              <h3 className="font-bold text-lg mb-3">Traits</h3>
              <div className="space-y-3">
                {selectedRace.traits.map((t) => (
                  <TraitCard key={t.name} name={t.name} description={t.description} />
                ))}
                {selectedSubrace?.traits.map((t) => (
                  <TraitCard key={t.name} name={t.name} description={t.description} />
                ))}
              </div>
            </div>

            {/* Info block */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoBlock label="Age" value={selectedRace.age} />
              <InfoBlock label="Anatomy" value={selectedRace.anatomy} />
              <InfoBlock label="Size" value={selectedSubrace?.size ?? selectedRace.size} />
              <InfoBlock
                label="Speed"
                value={`${selectedSubrace?.speed ?? selectedRace.speed} ft.`}
              />
              <InfoBlock label="Creature Type" value={selectedRace.creatureType} />
              <InfoBlock label="Languages" value={selectedRace.languages} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- Small sub-components ---------- */

function TraitCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-l-4 border-jade pl-3 py-1">
      <div className="font-semibold text-ink">{name}</div>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded p-2">
      <div className="text-xs uppercase text-gray-500 font-semibold">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

interface RaceChoicesProps {
  title: string;
  choices: Array<{
    id: string;
    label: string;
    type: 'select' | 'multi-select';
    count?: number;
    options: string[];
  }>;
  values: Record<string, string | string[]>;
  onChange: (id: string, value: string | string[]) => void;
}

function RaceChoices({ title, choices, values, onChange }: RaceChoicesProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <div className="space-y-4">
        {choices.map((choice) => {
          const value = values[choice.id];
          if (choice.type === 'select') {
            return (
              <div key={choice.id}>
                <label className="block text-sm font-semibold mb-1">
                  {choice.label}
                </label>
                <select
                  value={(value as string) ?? ''}
                  onChange={(e) => onChange(choice.id, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">— Choose —</option>
                  {choice.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          // multi-select
          const arr = (value as string[]) ?? [];
          return (
            <div key={choice.id}>
              <label className="block text-sm font-semibold mb-1">
                {choice.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {choice.options.map((opt) => {
                  const selected = arr.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        let next = [...arr];
                        if (selected) {
                          next = next.filter((x) => x !== opt);
                        } else {
                          if (
                            choice.count &&
                            next.length >= choice.count
                          )
                            return;
                          next.push(opt);
                        }
                        onChange(choice.id, next);
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
              {choice.count && (
                <p className="text-xs text-gray-500 mt-1">
                  {arr.length} / {choice.count} selected
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}