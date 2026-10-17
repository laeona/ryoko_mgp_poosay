import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { COMMON_RESOURCES, getResourceMax } from '../../../data/restResources';
import type { Resource } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function ResourcesPanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [showPicker, setShowPicker] = useState(false);

  if (!character) return null;

  const resources = character.resources ?? [];

  const addResource = (name: string, max: number, rechargeOn: Resource['rechargeOn']) => {
    const newRes: Resource = {
      id: crypto.randomUUID(),
      name,
      max,
      used: 0,
      rechargeOn,
    };
    updateCharacter(character.id, { resources: [...resources, newRes] });
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    updateCharacter(character.id, {
      resources: resources.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    });
  };

  const removeResource = (id: string) => {
    updateCharacter(character.id, {
      resources: resources.filter((r) => r.id !== id),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">Resources</h3>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-3 py-1 text-xs bg-jade text-white rounded hover:bg-green-800 transition"
        >
          {showPicker ? 'Close' : '+ Add'}
        </button>
      </div>

      {/* Picker */}
      {showPicker && (
        <div className="mb-3 border border-gray-200 rounded p-2 max-h-64 overflow-y-auto">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">
            Common Resources
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {COMMON_RESOURCES.map((tmpl) => {
              const already = resources.some((r) => r.name === tmpl.name);
              return (
                <button
                  key={tmpl.name}
                  onClick={() =>
                    !already &&
                    addResource(tmpl.name, getResourceMax(tmpl, character.level), tmpl.rechargeOn)
                  }
                  disabled={already}
                  className={`text-left p-2 rounded text-sm transition ${
                    already
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-jade/10 border border-transparent hover:border-jade'
                  }`}
                  title={tmpl.description}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{tmpl.name}</span>
                    <span className="text-xs text-gray-500">
                      {tmpl.rechargeOn === 'short'
                        ? '⚡ short'
                        : tmpl.rechargeOn === 'long'
                          ? '🌙 long'
                          : tmpl.rechargeOn === 'dawn'
                            ? '☀️ dawn'
                            : '—'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* List */}
      {resources.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No resources yet. Click + Add to track Rage, Ki, Bardic Inspiration, etc.
        </p>
      ) : (
        <div className="space-y-2">
          {resources.map((r) => (
            <ResourceRow
              key={r.id}
              resource={r}
              onUpdate={(u) => updateResource(r.id, u)}
              onRemove={() => removeResource(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceRow({
  resource,
  onUpdate,
  onRemove,
}: {
  resource: Resource;
  onUpdate: (u: Partial<Resource>) => void;
  onRemove: () => void;
}) {
  const remaining = resource.max - resource.used;

  return (
    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
      <input
        value={resource.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        className="flex-1 font-semibold text-sm border-b border-transparent hover:border-gray-300 focus:border-ember outline-none min-w-[100px]"
      />

      <select
        value={resource.rechargeOn}
        onChange={(e) =>
          onUpdate({ rechargeOn: e.target.value as Resource['rechargeOn'] })
        }
        className="text-xs border border-gray-300 rounded px-1 py-0.5"
        title="Recharge timing"
      >
        <option value="short">⚡ Short</option>
        <option value="long">🌙 Long</option>
        <option value="dawn">☀️ Dawn</option>
        <option value="none">— Never</option>
      </select>

      <input
        type="number"
        min={0}
        value={resource.max}
        onChange={(e) =>
          onUpdate({ max: parseInt(e.target.value) || 0 })
        }
        className="w-12 text-center text-sm border border-gray-300 rounded px-1 py-0.5"
        title="Max"
      />

      <div className="flex items-center gap-1">
        <button
          onClick={() =>
            onUpdate({ used: Math.max(0, resource.used - 1) })
          }
          disabled={remaining >= resource.max}
          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-xs font-bold disabled:opacity-30"
        >
          +
        </button>
        <span className="text-sm font-bold w-12 text-center">
          {remaining} / {resource.max}
        </span>
        <button
          onClick={() =>
            onUpdate({ used: Math.min(resource.max, resource.used + 1) })
          }
          disabled={remaining === 0}
          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-xs font-bold disabled:opacity-30"
        >
          −
        </button>
      </div>

      <button
        onClick={onRemove}
        className="text-xs text-red-500 hover:text-red-700"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}