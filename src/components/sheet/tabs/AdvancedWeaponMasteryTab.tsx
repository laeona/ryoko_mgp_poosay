import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import {
  TECHNIQUE_TREES,
  computeMartialLevel,
  getMartialProgression,
  getTechnique,
  isTechniqueLegal,
} from '../../../data/advancedTechniques';
import type { AdvancedTechnique } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function AdvancedWeaponMasteryTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [showPicker, setShowPicker] = useState(false);

  if (!character) return null;

  const knownIds = character.advancedTechniques ?? [];
  const martialLevel = computeMartialLevel(character.classes);
  const { techniquesKnown, maxTier } = getMartialProgression(martialLevel);

  const canLearnMore = knownIds.length < techniquesKnown;

  const toggleTechnique = (id: string) => {
    const isKnown = knownIds.includes(id);
    if (isKnown) {
      // Check nothing depends on this
      const dependents = knownIds.filter((k) => {
        if (k === id) return false;
        const tech = getTechnique(k);
        return tech && !isTechniqueLegal(k, knownIds.filter((x) => x !== id));
      });
      if (dependents.length > 0) {
        alert(
          `Cannot remove — other techniques depend on it: ${dependents
            .map((d) => getTechnique(d)?.name)
            .join(', ')}`
        );
        return;
      }
      updateCharacter(character.id, {
        advancedTechniques: knownIds.filter((k) => k !== id),
      });
    } else {
      if (!canLearnMore) {
        alert(`You already know ${techniquesKnown} techniques (your limit).`);
        return;
      }
      if (!isTechniqueLegal(id, knownIds)) {
        alert('You must first know a lower-tier technique in the same tree.');
        return;
      }
      updateCharacter(character.id, {
        advancedTechniques: [...knownIds, id],
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Martial level summary */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox label="Martial Level" value={String(martialLevel)} />
        <StatBox
          label="Techniques Known"
          value={`${knownIds.length} / ${techniquesKnown}`}
        />
        <StatBox label="Max Technique Tier" value={maxTier > 0 ? `Tier ${maxTier}` : '—'} />
        <StatBox label="Trees Available" value={String(TECHNIQUE_TREES.length)} />
      </div>

      {/* Progress bar */}
      {techniquesKnown > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Techniques Learned
            </span>
            <span className="text-xs text-gray-500">
              {knownIds.length} / {techniquesKnown}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                knownIds.length >= techniquesKnown ? 'bg-jade' : 'bg-ember'
              }`}
              style={{
                width: `${Math.min(100, (knownIds.length / techniquesKnown) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Add button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowPicker(!showPicker)}
          disabled={!canLearnMore && !showPicker}
          className={`px-4 py-2 rounded transition ${
            canLearnMore || showPicker
              ? 'bg-jade text-white hover:bg-green-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {showPicker ? 'Close Picker' : '+ Learn Technique'}
        </button>
        {!canLearnMore && !showPicker && techniquesKnown > 0 && (
          <span className="text-sm text-gray-500">
            You've learned all your current techniques. Level up to unlock more.
          </span>
        )}
        {martialLevel < 2 && (
          <span className="text-sm text-gray-500">
            Requires martial level 2+ (Barbarian/Fighter/Monk/Rogue levels,
            or ½ levels in Bender/Paladin/Ranger).
          </span>
        )}
      </div>

      {/* Technique Picker */}
      {showPicker && (
        <TechniquePicker
          knownIds={knownIds}
          maxTier={maxTier}
          canLearnMore={canLearnMore}
          onSelect={toggleTechnique}
        />
      )}

      {/* Known techniques */}
      {knownIds.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-2">Learned Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {knownIds
              .map((id) => getTechnique(id))
              .filter((t): t is AdvancedTechnique => !!t)
              .sort((a, b) => {
                if (a.tree !== b.tree) return a.tree.localeCompare(b.tree);
                return a.tier - b.tier;
              })
              .map((tech) => (
                <KnownTechniqueCard
                  key={tech.id}
                  technique={tech}
                  onRemove={() => toggleTechnique(tech.id)}
                />
              ))}
          </div>
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

function KnownTechniqueCard({
  technique,
  onRemove,
}: {
  technique: AdvancedTechnique;
  onRemove: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow border-l-4 border-jade p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold bg-ink text-parchment px-2 py-0.5 rounded">
              {technique.tree}
            </span>
            <span className="text-xs font-bold bg-ember text-white px-2 py-0.5 rounded">
              Tier {technique.tier}
            </span>
          </div>
          <h4 className="font-semibold mt-1">{technique.name}</h4>
        </div>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <p className="text-xs text-gray-700">{technique.description}</p>
    </div>
  );
}

function TechniquePicker({
  knownIds,
  maxTier,
  canLearnMore,
  onSelect,
}: {
  knownIds: string[];
  maxTier: number;
  canLearnMore: boolean;
  onSelect: (id: string) => void;
}) {
  const [activeTree, setActiveTree] = useState<string>('All');

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      {/* Tree filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTree('All')}
          className={`px-3 py-1 text-xs rounded-full border transition ${
            activeTree === 'All'
              ? 'bg-ember text-white border-ember'
              : 'bg-white border-gray-300 hover:border-ember'
          }`}
        >
          All
        </button>
        {TECHNIQUE_TREES.map((tree) => (
          <button
            key={tree.property}
            onClick={() => setActiveTree(tree.property)}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              activeTree === tree.property
                ? 'bg-ember text-white border-ember'
                : 'bg-white border-gray-300 hover:border-ember'
            }`}
          >
            {tree.property}
          </button>
        ))}
      </div>

      {/* Technique list */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
        {TECHNIQUE_TREES.filter(
          (t) => activeTree === 'All' || t.property === activeTree
        ).map((tree) => (
          <div key={tree.property}>
            <div className="mb-2">
              <h4 className="font-bold text-sm uppercase text-gray-500">
                {tree.property}
              </h4>
              <p className="text-xs text-gray-500 italic">{tree.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tree.techniques.map((tech) => {
                const known = knownIds.includes(tech.id);
                const tierUnlocked = tech.tier <= maxTier;
                const prerequisiteMet = isTechniqueLegal(tech.id, knownIds);
                const canSelect =
                  !known && tierUnlocked && prerequisiteMet && canLearnMore;

                let state: 'known' | 'available' | 'locked-tier' | 'locked-prereq' | 'limit' = 'available';
                if (known) state = 'known';
                else if (!tierUnlocked) state = 'locked-tier';
                else if (!prerequisiteMet) state = 'locked-prereq';
                else if (!canLearnMore) state = 'limit';

                return (
                  <button
                    key={tech.id}
                    onClick={() => canSelect || known ? onSelect(tech.id) : null}
                    disabled={!canSelect && !known}
                    className={`text-left p-3 rounded border-2 transition ${
                      state === 'known'
                        ? 'border-jade bg-jade/5 cursor-pointer'
                        : state === 'available'
                          ? 'border-gray-200 hover:border-jade cursor-pointer'
                          : 'border-gray-100 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-ember text-white px-2 py-0.5 rounded">
                        Tier {tech.tier}
                      </span>
                      {state === 'known' && (
                        <span className="text-xs font-bold text-jade">✓ Known</span>
                      )}
                      {state === 'locked-tier' && (
                        <span className="text-xs text-gray-500">
                          Requires ML {tech.tier * 4}
                        </span>
                      )}
                      {state === 'locked-prereq' && (
                        <span className="text-xs text-gray-500">
                          Requires lower-tier {tech.tree}
                        </span>
                      )}
                      {state === 'limit' && (
                        <span className="text-xs text-gray-500">Limit reached</span>
                      )}
                    </div>
                    <div className="font-semibold text-sm">{tech.name}</div>
                    <p className="text-xs text-gray-600 mt-1">{tech.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}