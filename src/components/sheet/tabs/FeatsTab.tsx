import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { FEATS } from '../../../data/feats';
import type { DnDFeat } from '../../../types/character';
import {
  ABILITY_KEYS,
  SKILLS,
  getFeatAbilityChoice,
} from '../../../utils/calculations';
import { COMMON_RESOURCES, getResourceMax } from '../../../data/restResources';

interface Props {
  characterId: string;
}

export default function FeatsTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'general' | 'racial' | 'owned'>(
    'all'
  );

  if (!character) return null;

  const owned = character.feats ?? [];
  const qualifies = (feat: DnDFeat): boolean => {
    if (feat.type !== 'racial' || !feat.racialRequirement) return true;
    const req = feat.racialRequirement;
    if (character.race.name !== req.race) return false;
    if (req.subrace && character.race.subrace !== req.subrace) return false;
    return true;
  };

  const toggleFeat = (name: string) => {
    const has = owned.includes(name);
    // Feats with limited uses also add (or remove) their tracker in Resources
    const templates = COMMON_RESOURCES.filter((t) => t.feats?.includes(name));
    const resources = character.resources ?? [];
    let nextResources = resources;
    if (has) {
      const stillOwned = owned.filter((f) => f !== name);
      const names = new Set(
        templates
          .filter((t) => !t.feats?.some((f) => stillOwned.includes(f)))
          .map((t) => t.name)
      );
      nextResources = resources.filter((r) => !names.has(r.name));
    } else {
      nextResources = [
        ...resources,
        ...templates
          .filter((t) => !resources.some((r) => r.name === t.name))
          .map((t) => ({
            id: crypto.randomUUID(),
            name: t.name,
            max: getResourceMax(t, character.level),
            used: 0,
            rechargeOn: t.rechargeOn,
          })),
      ];
    }
    updateCharacter(character.id, {
      feats: has ? owned.filter((f) => f !== name) : [...owned, name],
      resources: nextResources,
    });
  };

  const setChoice = (featName: string, value: string) => {
    updateCharacter(character.id, {
      featChoices: { ...(character.featChoices ?? {}), [featName]: value },
    });
  };

  const filtered = FEATS.filter((f) => {
    if (filter === 'general' && f.type !== 'general') return false;
    if (filter === 'racial' && f.type !== 'racial') return false;
    if (filter === 'owned' && !owned.includes(f.name)) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        (f.prerequisite ?? '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const generalCount = FEATS.filter((f) => f.type === 'general').length;
  const racialCount = FEATS.filter((f) => f.type === 'racial').length;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search feats..."
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-ember"
        />
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            count={FEATS.length}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterChip
            label="General"
            count={generalCount}
            active={filter === 'general'}
            onClick={() => setFilter('general')}
          />
          <FilterChip
            label="Racial"
            count={racialCount}
            active={filter === 'racial'}
            onClick={() => setFilter('racial')}
          />
          <FilterChip
            label="Owned"
            count={owned.length}
            active={filter === 'owned'}
            onClick={() => setFilter('owned')}
          />
        </div>
      </div>

      {/* Feat list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          No feats match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((feat) => (
            <FeatCard
              key={feat.name}
              feat={feat}
              owned={owned.includes(feat.name)}
              qualifies={qualifies(feat)}
              choice={getFeatAbilityChoice(character, feat.name)}
              onChoice={(v) => setChoice(feat.name, v)}
              skills={(character.featChoices?.[feat.name] ?? '').split(',')}
              saveChoice={character.featChoices?.[`${feat.name}:save`]}
              onSkills={(v) => setChoice(feat.name, v.join(','))}
              onSaveChoice={(v) => setChoice(`${feat.name}:save`, v)}
              onToggle={() => toggleFeat(feat.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
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
      {label}{' '}
      <span className={`text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>
        ({count})
      </span>
    </button>
  );
}

const SEASONS: Record<string, string> = {
  dexterity: 'Spring',
  charisma: 'Summer',
  wisdom: 'Autumn',
  constitution: 'Winter',
};

function FeatCard({
  feat,
  owned,
  qualifies,
  choice,
  onChoice,
  skills,
  saveChoice,
  onSkills,
  onSaveChoice,
  onToggle,
}: {
  feat: DnDFeat;
  owned: boolean;
  qualifies: boolean;
  choice?: string;
  onChoice: (value: string) => void;
  skills: string[];
  saveChoice?: string;
  onSkills: (value: string[]) => void;
  onSaveChoice: (value: string) => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-2 transition ${
        owned
          ? 'border-ember'
          : qualifies
            ? 'border-transparent hover:border-gray-300'
            : 'border-transparent opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg">{feat.name}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                feat.type === 'racial'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {feat.type === 'racial' ? 'Racial' : 'General'}
            </span>
          </div>
          {feat.prerequisite && (
            <p className="text-xs text-gray-500 italic mt-0.5">
              Prerequisite: {feat.prerequisite}
            </p>
          )}
        </div>
        <button
          onClick={onToggle}
          disabled={!qualifies}
          className={`px-3 py-1 text-xs rounded font-semibold whitespace-nowrap transition ${
            owned
              ? 'bg-ember text-white hover:bg-red-700'
              : qualifies
                ? 'bg-jade text-white hover:bg-green-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {owned ? 'Remove' : 'Add'}
        </button>
      </div>
      <p className="text-sm text-gray-700">{feat.description}</p>
      {owned && feat.abilityIncrease && feat.abilityIncrease.length > 1 && (
        <label className="block mt-2 text-xs text-gray-600">
          Ability increase (+1):{' '}
          <select
            value={choice ?? ''}
            onChange={(e) => onChoice(e.target.value)}
            className="ml-1 px-2 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">Choose...</option>
            {feat.abilityIncrease.map((a) => (
              <option key={a} value={a}>
                {feat.name === 'Seasonal Determinism'
                  ? `${SEASONS[a] ?? ''} (${a.slice(0, 3).toUpperCase()})`
                  : a.charAt(0).toUpperCase() + a.slice(1)}
              </option>
            ))}
          </select>
          {feat.name === 'Resilient' && (
            <span className="ml-2 italic">also grants that saving throw proficiency</span>
          )}
        </label>
      )}
      {owned && feat.skillChoices && (
        <div className="mt-2 text-xs text-gray-600 space-y-1">
          <div className="font-semibold">
            {feat.skillExpertise ? 'Skill (double proficiency)' : 'Skill proficiencies'}:
          </div>
          {Array.from({ length: feat.skillChoices.count }).map((_, i) => {
            const taken = skills.filter((n, j) => j !== i && Boolean(n));
            const options = (feat.skillChoices?.options ?? SKILLS.map((s) => s.name)).filter(
              (n) => !taken.includes(n)
            );
            return (
              <select
                key={i}
                value={skills[i] ?? ''}
                onChange={(e) => {
                  const next = [...skills];
                  next[i] = e.target.value;
                  onSkills(next);
                }}
                className="block px-2 py-1 border border-gray-300 rounded bg-white text-sm"
              >
                <option value="">Choose a skill...</option>
                {options.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            );
          })}
          {feat.skillExpertise && (
            <div className="italic">Applies once you are proficient in the skill.</div>
          )}
        </div>
      )}
      {owned && feat.savingThrowChoice && (
        <label className="block mt-2 text-xs text-gray-600">
          Saving throw proficiency:{' '}
          <select
            value={saveChoice ?? ''}
            onChange={(e) => onSaveChoice(e.target.value)}
            className="ml-1 px-2 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">None / not this time</option>
            {ABILITY_KEYS.map((a) => (
              <option key={a} value={a}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </option>
            ))}
          </select>
        </label>
      )}
      {!qualifies && feat.racialRequirement && (
        <p className="text-xs text-red-500 mt-2 italic">
          Requires: {feat.racialRequirement.race}
          {feat.racialRequirement.subrace &&
            ` (${feat.racialRequirement.subrace})`}
        </p>
      )}
    </div>
  );
}