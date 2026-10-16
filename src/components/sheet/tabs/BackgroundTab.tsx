import { useCharacterStore } from '../../../store/characterStore';
import { BACKGROUNDS } from '../../../data/backgrounds';
import {
  ABILITY_LABELS,
  ABILITY_FULL_LABELS,
} from '../../../utils/calculations';

interface Props {
  characterId: string;
}

export default function BackgroundTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const selected = BACKGROUNDS.find(
    (b) => b.name === character.background.name
  );

  const selectBackground = (name: string) => {
    updateCharacter(character.id, {
      background: {
        name,
        skills: [],
        tools: [],
        languages: [],
        personalityTrait: '',
        ideal: '',
        bond: '',
        flaw: '',
      },
    });
  };

  const setSkill = (skill: string) => {
    const bg = BACKGROUNDS.find((b) => b.name === character.background.name);
    if (!bg) return;
    const has = character.background.skills.includes(skill);
    updateCharacter(character.id, {
      background: {
        ...character.background,
        skills: has
          ? character.background.skills.filter((s) => s !== skill)
          : [...character.background.skills, skill],
      },
    });
  };

  const updateField = (field: string, value: string) => {
    updateCharacter(character.id, {
      background: { ...character.background, [field]: value },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* LEFT: Background List */}
      <aside className="bg-white rounded-lg shadow p-3 h-fit lg:sticky lg:top-4">
        <h3 className="font-bold text-sm uppercase text-gray-500 mb-2 px-2">
          Backgrounds
        </h3>
        <div className="flex flex-col gap-1">
          {BACKGROUNDS.map((bg) => {
            const isSelected = bg.name === character.background.name;
            return (
              <button
                key={bg.name}
                onClick={() => selectBackground(bg.name)}
                className={`text-left px-3 py-2 rounded transition ${
                  isSelected
                    ? 'bg-ember text-white font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {bg.name}
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT: Details */}
      <section className="bg-white rounded-lg shadow p-6">
        {!selected ? (
          <div className="text-gray-500 text-center py-12">
            <p className="text-lg mb-2">No background selected.</p>
            <p className="text-sm">Choose a background from the list to begin.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <h2 className="text-3xl font-bold text-ink">{selected.name}</h2>
              <button
                onClick={() =>
                  updateCharacter(character.id, {
                    background: {
                      name: '',
                      skills: [],
                      tools: [],
                      languages: [],
                    },
                  })
                }
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Clear
              </button>
            </div>

            <p className="text-gray-700 italic">{selected.description}</p>

            {/* Ability Score Suggestions */}
            <div>
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                Suggested Ability Scores
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                You may use these instead of your racial bonuses. Increase one by 2
                and another by 1, or all three by 1.
              </p>
              <div className="flex gap-2">
                {selected.suggestedAbilityScores.map((key) => (
                  <span
                    key={key}
                    className="px-3 py-1 bg-jade text-white rounded text-sm font-semibold"
                  >
                    {ABILITY_FULL_LABELS[key]}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Proficiencies */}
            <div>
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                Skill Proficiencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.skillProficiencies.map((skill) => {
                  const isSelected =
                    character.background.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => setSkill(skill)}
                      className={`px-3 py-1 text-sm rounded border-2 transition ${
                        isSelected
                          ? 'bg-jade text-white border-jade'
                          : 'bg-white border-gray-300 hover:border-jade'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click to toggle (both are granted automatically).
              </p>
            </div>

            {/* Tool Proficiency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded p-3">
                <div className="text-xs uppercase text-gray-500 font-semibold">
                  Tool Proficiency
                </div>
                <div className="text-sm">{selected.toolProficiency}</div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="text-xs uppercase text-gray-500 font-semibold">
                  Optional Language
                </div>
                <div className="text-sm">{selected.optionalLanguage}</div>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-gray-50 rounded p-3">
              <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Equipment
              </div>
              <div className="text-sm">{selected.equipment}</div>
            </div>

            {/* Feat Suggestions */}
            <div>
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
                Feat Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.featSuggestions.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 text-sm bg-ember text-white rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Optional Feature */}
            <div className="border-l-4 border-jade pl-4 py-2">
              <div className="font-bold">{selected.optionalFeature.name}</div>
              <p className="text-sm text-gray-700">
                {selected.optionalFeature.description}
              </p>
            </div>

            {/* Suggested Characteristics */}
            <div>
              <h3 className="font-bold text-lg mb-3">Suggested Characteristics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CharacteristicField
                  label="Personality Trait"
                  options={selected.personalityTraits}
                  value={character.background.personalityTrait ?? ''}
                  onChange={(v) => updateField('personalityTrait', v)}
                />
                <CharacteristicField
                  label="Ideal"
                  options={selected.ideals}
                  value={character.background.ideal ?? ''}
                  onChange={(v) => updateField('ideal', v)}
                />
                <CharacteristicField
                  label="Bond"
                  options={selected.bonds}
                  value={character.background.bond ?? ''}
                  onChange={(v) => updateField('bond', v)}
                />
                <CharacteristicField
                  label="Flaw"
                  options={selected.flaws}
                  value={character.background.flaw ?? ''}
                  onChange={(v) => updateField('flaw', v)}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- Sub-component ---------- */

interface CharFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function CharacteristicField({
  label,
  options,
  value,
  onChange,
}: CharFieldProps) {
  const isCustom = value !== '' && !options.includes(value);
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
        {label}
      </div>
      <select
        value={isCustom ? '__custom__' : value}
        onChange={(e) => {
          if (e.target.value === '__custom__') onChange('');
          else onChange(e.target.value);
        }}
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2"
      >
        <option value="">— Choose —</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt.length > 80 ? opt.slice(0, 77) + '...' : opt}
          </option>
        ))}
        <option value="__custom__">Custom...</option>
      </select>
      {(isCustom || value === '') && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or write your own..."
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          rows={2}
        />
      )}
    </div>
  );
}