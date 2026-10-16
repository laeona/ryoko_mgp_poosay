import { useEffect, useRef, useState } from 'react';
import {
  createBlankCharacter,
  useCharacterStore,
} from '../../store/characterStore';
import { getClass } from '../../data/classes';
import RaceTab from '../sheet/tabs/RaceTab';
import ClassTab from '../sheet/tabs/ClassTab';
import BackgroundTab from '../sheet/tabs/BackgroundTab';
import SpellsTab from '../sheet/tabs/SpellsTab';
import AbilityScoresStep from './steps/AbilityScoresStep';
import type { Character } from '../../types/character';

interface Props {
  onDone: (id: string) => void;
  onCancel: () => void;
}

interface StepDef {
  id: string;
  label: string;
}

const ALL_STEPS: StepDef[] = [
  { id: 'name', label: 'Name' },
  { id: 'abilities', label: 'Abilities' },
  { id: 'race', label: 'Race' },
  { id: 'class', label: 'Class' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
  { id: 'spells', label: 'Spells' },
  { id: 'review', label: 'Review' },
];

export default function CharacterBuilder({ onDone, onCancel }: Props) {
  const addCharacter = useCharacterStore((s) => s.addCharacter);
  const deleteCharacter = useCharacterStore((s) => s.deleteCharacter);
  const characters = useCharacterStore((s) => s.characters);
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  // useRef guards against StrictMode double-invocation
  const initializedRef = useRef(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const c = createBlankCharacter();
    addCharacter(c);
    setDraftId(c.id);
  }, [addCharacter]);

  const character = draftId
    ? characters.find((c) => c.id === draftId)
    : undefined;

  if (!character) return <p>Loading wizard...</p>;

  // Determine if character is a caster
  const isCaster = character.classes.some((cl) => {
    const cls = getClass(cl.className);
    return cls?.spellcasting;
  });

  const visibleSteps = ALL_STEPS.filter((s) => s.id !== 'spells' || isCaster);
  const currentStep = visibleSteps[step];

  const handleCancel = () => {
    if (!confirm('Discard this character?')) return;
    deleteCharacter(character.id);
    onCancel();
  };

  const next = () => {
    if (step < visibleSteps.length - 1) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const canNext = (() => {
    if (currentStep.id === 'name') return character.name.trim().length > 0;
    if (currentStep.id === 'abilities') return true; // handled by step's own validation
    if (currentStep.id === 'race') return character.race.name !== '';
    if (currentStep.id === 'class') return character.classes.length > 0;
    return true;
  })();

  const isLastStep = step === visibleSteps.length - 1;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Step indicator */}
      <div className="bg-white rounded-lg shadow p-3 mb-4 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {visibleSteps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1">
              <button
                onClick={() => setStep(i)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition whitespace-nowrap ${
                  i === step
                    ? 'bg-ember text-white'
                    : i < step
                      ? 'bg-jade/20 text-jade hover:bg-jade/30'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}. {s.label}
              </button>
              {i < visibleSteps.length - 1 && (
                <span className="text-gray-300 text-lg">›</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow p-6 mb-4 min-h-[500px]">
        {currentStep.id === 'name' && (
          <NameStep
            character={character}
            onChange={(name) => updateCharacter(character.id, { name })}
          />
        )}
        {currentStep.id === 'abilities' && (
          <AbilityScoresStep character={character} />
        )}
        {currentStep.id === 'race' && <RaceTab characterId={character.id} />}
        {currentStep.id === 'class' && <ClassTab characterId={character.id} />}
        {currentStep.id === 'skills' && <SkillsStep character={character} />}
        {currentStep.id === 'background' && (
          <BackgroundTab characterId={character.id} />
        )}
        {currentStep.id === 'spells' && <SpellsTab characterId={character.id} />}
        {currentStep.id === 'review' && <ReviewStep character={character} />}
      </div>

      {/* Nav bar */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between gap-3">
        <button
          onClick={handleCancel}
          className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition"
        >
          Cancel
        </button>
        <div className="flex gap-2">
          <button
            onClick={back}
            disabled={step === 0}
            className={`px-4 py-2 rounded text-sm font-semibold transition ${
              step === 0
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Back
          </button>
          {!isLastStep ? (
            <button
              onClick={next}
              disabled={!canNext}
              className={`px-6 py-2 rounded text-sm font-semibold transition ${
                canNext
                  ? 'bg-jade text-white hover:bg-green-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => onDone(character.id)}
              className="px-6 py-2 rounded text-sm font-semibold bg-ember text-white hover:bg-red-700 transition"
            >
              Finish ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NAME STEP
   ============================================================ */
function NameStep({
  character,
  onChange,
}: {
  character: Character;
  onChange: (name: string) => void;
}) {
  return (
    <div className="max-w-xl mx-auto space-y-4 pt-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">What's your name, hero?</h2>
        <p className="text-sm text-gray-600">
          Every legend starts with a name. You can change it anytime.
        </p>
      </div>
      <input
        value={character.name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter character name..."
        autoFocus
        className="w-full text-center text-2xl font-bold border-b-2 border-gray-300 focus:border-ember outline-none py-3 bg-transparent"
      />
    </div>
  );
}

/* ============================================================
   SKILLS STEP — pick skills from class options
   ============================================================ */
function SkillsStep({ character }: { character: Character }) {
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (character.classes.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">
        Add a class first on the Class step.
      </p>
    );
  }

  // Gather class skill options across all classes
  const totalSlots = character.classes.reduce((sum, cl) => {
    const cls = getClass(cl.className);
    return sum + (cls?.skillChoices.count ?? 0);
  }, 0);

  // Union of options
  const allOptions = new Set<string>();
  for (const cl of character.classes) {
    const cls = getClass(cl.className);
    cls?.skillChoices.options.forEach((o) => allOptions.add(o));
  }

  const bgSkills = character.background.skills;
  const classSkills = character.skillProficiencies.filter(
    (s) => !bgSkills.includes(s)
  );

  const toggle = (skill: string) => {
    if (bgSkills.includes(skill)) return; // already granted by background
    const isPicked = classSkills.includes(skill);
    let next = isPicked
      ? character.skillProficiencies.filter((s) => s !== skill)
      : [...character.skillProficiencies, skill];

    // Enforce limit
    const newClassCount = next.filter((s) => !bgSkills.includes(s)).length;
    if (!isPicked && newClassCount > totalSlots) return;

    updateCharacter(character.id, { skillProficiencies: next });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Class Skills</h2>
        <p className="text-sm text-gray-600">
          Choose {totalSlots} skill{totalSlots > 1 ? 's' : ''} from your class options.
          {bgSkills.length > 0 && (
            <> Your background already grants:{' '}
              <strong>{bgSkills.join(', ')}</strong>.</>
          )}
        </p>
      </div>

      <div className="bg-white rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-gray-500 font-semibold">
            Selected
          </span>
          <span
            className={`text-sm font-bold ${
              classSkills.length === totalSlots ? 'text-jade' : 'text-ink'
            }`}
          >
            {classSkills.length} / {totalSlots}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              classSkills.length === totalSlots ? 'bg-jade' : 'bg-ember'
            }`}
            style={{
              width: `${Math.min(100, (classSkills.length / totalSlots) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {[...allOptions].sort().map((skill) => {
          const fromBg = bgSkills.includes(skill);
          const picked = character.skillProficiencies.includes(skill);
          const disabled =
            fromBg ||
            (!picked && classSkills.length >= totalSlots);

          return (
            <button
              key={skill}
              onClick={() => toggle(skill)}
              disabled={disabled && !picked}
              className={`text-left p-3 rounded border-2 transition ${
                fromBg
                  ? 'border-jade bg-jade/5 cursor-not-allowed'
                  : picked
                    ? 'border-ember bg-ember/10 cursor-pointer'
                    : disabled
                      ? 'border-gray-100 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-jade cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm">{skill}</span>
                {fromBg && (
                  <span className="text-xs text-jade">(bg)</span>
                )}
                {picked && !fromBg && (
                  <span className="text-xs text-ember font-bold">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   REVIEW STEP
   ============================================================ */
function ReviewStep({ character }: { character: Character }) {
  const totalLevel = character.classes.reduce((s, c) => s + c.level, 0);

  return (
    <div className="space-y-4">
      <div className="text-center pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold">{character.name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Level {totalLevel || 1} · {character.race.name || 'No race'} ·{' '}
          {character.classes.map((c) => c.className).join(' / ') || 'No class'}
          {character.background.name && ` · ${character.background.name}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <ReviewSection title="Ability Scores">
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                'strength',
                'dexterity',
                'constitution',
                'intelligence',
                'wisdom',
                'charisma',
              ] as const
            ).map((key) => (
              <div key={key} className="text-center bg-gray-50 rounded p-2">
                <div className="text-xs uppercase text-gray-500">
                  {key.slice(0, 3)}
                </div>
                <div className="text-lg font-bold">
                  {character.abilityScores[key]}
                </div>
              </div>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection title="Skills">
          {character.skillProficiencies.length === 0 ? (
            <p className="text-gray-500 italic">None selected.</p>
          ) : (
            <ul className="space-y-0.5">
              {character.skillProficiencies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </ReviewSection>

        <ReviewSection title="Features">
          {character.classes.length === 0 ? (
            <p className="text-gray-500 italic">No class chosen.</p>
          ) : (
            <p className="text-gray-700">
              {totalLevel} level{totalLevel !== 1 ? 's' : ''} of{' '}
              {character.classes.map((c) => c.className).join(', ')}.
            </p>
          )}
        </ReviewSection>

        <ReviewSection title="Spells">
          {character.spellcasting ? (
            <div>
              <p>
                <strong>{character.spellcasting.cantripsKnown.length}</strong>{' '}
                cantrips,{' '}
                <strong>{character.spellcasting.spellsKnown.length}</strong>{' '}
                spells known.
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No spellcasting.</p>
          )}
        </ReviewSection>
      </div>

      <div className="bg-jade/10 border border-jade/30 rounded p-4 text-center">
        <p className="text-sm text-jade font-semibold">
          Ready to go! Click Finish to open your character sheet.
        </p>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded p-3">
      <h3 className="font-bold text-xs uppercase text-gray-500 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}