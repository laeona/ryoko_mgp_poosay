import { useCharacterStore } from '../../../store/characterStore';
import {
  ABILITY_KEYS,
  ABILITY_LABELS,
  ABILITY_FULL_LABELS,
  SKILLS,
  formatModifier,
  getModifier,
  getPassivePerception,
  getInitiative,
  getProficiencyBonus,
  getRacialBonuses,
  getSavingThrowBonus,
  getSavingThrowProficiencies,
  getSkillBonus,
  getSpellAttackBonus,
  getSpellSaveDC,
  getTotalAbilityScores,
  hasExpertiseInSkill,
  isProficientInSkill,
} from '../../../utils/calculations';
import Rollable from '../../shared/Rollable';

interface Props {
  characterId: string;
}

export default function AbilitiesTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const baseScores = character.abilityScores;
  const racialBonuses = getRacialBonuses(character);
  const totals = getTotalAbilityScores(character);
  const profBonus = getProficiencyBonus(character.level);
  const saveProfs = getSavingThrowProficiencies(character);

  const updateBase = (key: (typeof ABILITY_KEYS)[number], value: number) => {
    updateCharacter(character.id, {
      abilityScores: { ...baseScores, [key]: value },
    });
  };

  const toggleSkill = (skill: string) => {
    const has = character.skillProficiencies.includes(skill);
    updateCharacter(character.id, {
      skillProficiencies: has
        ? character.skillProficiencies.filter((s) => s !== skill)
        : [...character.skillProficiencies, skill],
    });
  };

  const toggleExpertise = (skill: string) => {
    if (!isProficientInSkill(character, skill)) return;
    const has = character.skillExpertise.includes(skill);
    updateCharacter(character.id, {
      skillExpertise: has
        ? character.skillExpertise.filter((s) => s !== skill)
        : [...character.skillExpertise, skill],
    });
  };

  const spellSaveDC = getSpellSaveDC(character);
  const spellAttack = getSpellAttackBonus(character);

  return (
    <div className="space-y-4">
      {/* Header stats */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <StatBox label="Proficiency Bonus" value={formatModifier(profBonus)} />
        <StatBox label="Initiative" value={formatModifier(getInitiative(character))} />
        <StatBox
          label="Passive Perception"
          value={String(getPassivePerception(character))}
        />
        <StatBox
          label="Spell Save DC"
          value={spellSaveDC !== undefined ? String(spellSaveDC) : '—'}
        />
      </div>

      {/* Ability score cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ABILITY_KEYS.map((key) => {
          const base = baseScores[key];
          const racial = racialBonuses[key];
          const total = totals[key];
          const mod = getModifier(total);
          const saveBonus = getSavingThrowBonus(character, key);
          const saveProf = saveProfs.includes(key);

          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center"
            >
              <div className="text-xs font-bold uppercase text-gray-500">
                {ABILITY_LABELS[key]}
              </div>
              <div className="text-[10px] text-gray-400 mb-1">
                {ABILITY_FULL_LABELS[key]}
              </div>

              {/* Base input */}
              <input
                type="number"
                value={base}
                onChange={(e) => updateBase(key, parseInt(e.target.value) || 0)}
                className="w-16 text-center text-2xl font-bold border border-gray-300 rounded"
              />

              {/* Racial */}
              {racial !== 0 && (
                <div className="text-xs mt-1 text-jade font-semibold">
                  {racial > 0 ? `+${racial}` : racial} racial
                </div>
              )}

              {/* Total */}
              <div className="text-sm font-semibold mt-1">
                Total {total}
              </div>

              {/* Modifier */}
              <div className="text-2xl font-bold text-ember mt-1">
                {formatModifier(mod)}
              </div>

              {/* Save */}
              <div
                className={`mt-2 w-full text-center text-xs px-1 py-0.5 rounded ${
                  saveProf ? 'bg-jade text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Rollable
                  d20Modifier={saveBonus}
                  label={`${ABILITY_FULL_LABELS[key]} Save`}
                  className="block w-full text-center"
                >
                  Save {formatModifier(saveBonus)}
                  {saveProf && ' (P)'}
                </Rollable>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-3">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {SKILLS.map((skill) => {
            const proficient = isProficientInSkill(character, skill.name);
            const expertise = hasExpertiseInSkill(character, skill.name);
            const bonus = getSkillBonus(character, skill.name);
            const fromBackground =
              character.background.skills.includes(skill.name);

            return (
              <div
                key={skill.name}
                className="flex items-center gap-2 py-1 border-b border-gray-100"
              >
                {/* Proficiency checkbox */}
                <button
                  onClick={() => toggleSkill(skill.name)}
                  disabled={fromBackground}
                  title={
                    fromBackground
                      ? 'Granted by your background'
                      : proficient
                        ? 'Click to remove'
                        : 'Click to add proficiency'
                  }
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs transition ${
                    proficient
                      ? fromBackground
                        ? 'bg-jade border-jade text-white cursor-not-allowed'
                        : 'bg-jade border-jade text-white'
                      : 'border-gray-400 hover:border-jade'
                  }`}
                >
                  {proficient && '✓'}
                </button>

                {/* Expertise checkbox */}
                <button
                  onClick={() => toggleExpertise(skill.name)}
                  disabled={!proficient}
                  title="Expertise (double proficiency bonus)"
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center text-[10px] transition ${
                    expertise
                      ? 'bg-ember border-ember text-white'
                      : proficient
                        ? 'border-gray-400 hover:border-ember'
                        : 'border-gray-200 cursor-not-allowed'
                  }`}
                >
                  {expertise && '★'}
                </button>

                <Rollable
                  d20Modifier={bonus}
                  label={`${skill.name} Check`}
                  className="flex items-center gap-2 flex-1"
                >
                  <span className="text-xs font-bold text-gray-500 w-8">
                    {formatModifier(bonus)}
                  </span>
                  <span className="flex-1 text-sm">
                    {skill.name}
                    {fromBackground && (
                      <span className="ml-1 text-xs text-jade">(bg)</span>
                    )}
                  </span>
                </Rollable>
                <span className="text-xs text-gray-400 uppercase">
                  {ABILITY_LABELS[skill.ability]}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          ✓ = proficient · ★ = expertise (double bonus) · (bg) = granted by background (locked)
        </p>
      </div>

      {/* Spellcasting summary */}
      {(spellSaveDC !== undefined || spellAttack !== undefined) && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-3">Spellcasting</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Spell Save DC"
              value={spellSaveDC !== undefined ? String(spellSaveDC) : '—'}
            />
            <StatBox
              label="Spell Attack Bonus"
              value={
                spellAttack !== undefined ? formatModifier(spellAttack) : '—'
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

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