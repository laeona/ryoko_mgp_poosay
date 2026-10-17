import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { ITEM_GROUPS } from '../../../data/items';
import type { InventoryItem, ItemCategory } from '../../../types/character';
import { getBackgroundTools } from '../../../data/backgroundEquipment';

interface Props {
  characterId: string;
}

const CATEGORY_COLORS: Record<ItemCategory, string> = {
  weapon: 'bg-ember',
  armor: 'bg-ink',
  gear: 'bg-gray-500',
  magic: 'bg-purple-600',
  prosthesis: 'bg-jade',
  other: 'bg-gray-400',
};

const CATEGORY_LABELS: Record<ItemCategory, string> = {
  weapon: 'Weapon',
  armor: 'Armor',
  gear: 'Gear',
  magic: 'Magic',
  prosthesis: 'Prosthesis',
  other: 'Other',
};

export default function InventoryTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [showPicker, setShowPicker] = useState(false);
  const [filter, setFilter] = useState<'all' | ItemCategory>('all');

  if (!character) return null;

  const items = character.inventory;
  const currency = character.currency ?? { gp: 0, sp: 0, cp: 0 };

  const totalWeight = items.reduce(
    (sum, it) => sum + it.weight * (it.quantity || 1),
    0
  );

  // Carrying capacity: STR × 15 (assumes no special features)
  const str = character.abilityScores.strength;
  const capacity = str * 15;

  const updateCurrency = (field: 'gp' | 'sp' | 'cp', value: number) => {
    updateCharacter(character.id, {
      currency: { ...currency, [field]: Math.max(0, value) },
    });
  };

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const existing = items.find((i) => i.name === item.name);
    if (existing && !item.notes) {
      // Stack if same name and no unique notes
      updateCharacter(character.id, {
        inventory: items.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        ),
      });
    } else {
      const newItem: InventoryItem = {
        ...item,
        id: crypto.randomUUID(),
      };
      updateCharacter(character.id, { inventory: [...items, newItem] });
    }
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    updateCharacter(character.id, {
      inventory: items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    });
  };

  const removeItem = (id: string) => {
    updateCharacter(character.id, {
      inventory: items.filter((i) => i.id !== id),
    });
  };

  const toolProficiencies = getBackgroundTools(character).map((t) => t.toLowerCase());

  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="space-y-4">
      {/* Top bar: Currency + Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currency */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm uppercase text-gray-500 mb-3">
            Currency
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {(['gp', 'sp', 'cp'] as const).map((c) => (
              <div key={c} className="text-center">
                <label className="block text-xs uppercase font-semibold text-gray-500 mb-1">
                  {c.toUpperCase()}
                </label>
                <input
                  type="number"
                  min={0}
                  value={currency[c]}
                  onChange={(e) =>
                    updateCurrency(c, parseInt(e.target.value) || 0)
                  }
                  className="w-full text-center text-2xl font-bold border border-gray-300 rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Weight */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm uppercase text-gray-500 mb-3">
            Carrying Capacity
          </h3>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-ink">
              {totalWeight.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">/ {capacity} lbs</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                totalWeight > capacity
                  ? 'bg-red-500'
                  : totalWeight > capacity * 0.8
                    ? 'bg-amber-500'
                    : 'bg-jade'
              }`}
              style={{
                width: `${Math.min(100, (totalWeight / capacity) * 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {totalWeight > capacity
              ? '⚠️ Encumbered'
              : 'Based on STR × 15'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800 transition"
        >
          {showPicker ? 'Close Picker' : '+ Add Item'}
        </button>
        <button
          onClick={() =>
            addItem({
              name: 'New Item',
              quantity: 1,
              weight: 0,
              notes: '',
              category: 'other',
              equipped: false,
              attuned: false,
            })
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          + Custom Item
        </button>
        <div className="flex gap-1 ml-auto flex-wrap">
          <FilterChip
            label="All"
            count={items.length}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {(Object.keys(CATEGORY_LABELS) as ItemCategory[]).map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            if (count === 0) return null;
            return (
              <FilterChip
                key={cat}
                label={CATEGORY_LABELS[cat]}
                count={count}
                active={filter === cat}
                onClick={() => setFilter(cat)}
              />
            );
          })}
        </div>
      </div>

      {/* Item Picker */}
      {showPicker && (
        <div className="bg-white rounded-lg shadow p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {ITEM_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="font-bold text-lg mb-2">{group.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {group.items.map((tmpl) => (
                  <button
                    key={tmpl.name}
                    onClick={() => {
                      addItem({
                        name: tmpl.name,
                        quantity: 1,
                        weight: tmpl.weight,
                        notes: '',
                        category: tmpl.category,
                        equipped: false,
                        attuned: false,
                        damage: tmpl.damage,
                        properties: tmpl.properties,
                        description: tmpl.description,
                      });
                    }}
                    className="text-left p-2 rounded border border-gray-200 hover:border-jade hover:bg-jade/5 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm">{tmpl.name}</span>
                      <span className="text-xs text-gray-500">
                        {tmpl.weight} lb
                      </span>
                    </div>
                    {tmpl.damage && (
                      <div className="text-xs text-gray-600">{tmpl.damage}</div>
                    )}
                    {tmpl.properties && tmpl.properties.length > 0 && (
                      <div className="text-xs text-gray-500 italic">
                        {tmpl.properties.join(', ')}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          {items.length === 0
            ? 'No items yet. Click + Add Item to begin.'
            : 'No items match the current filter.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              proficient={toolProficiencies.includes(item.name.trim().toLowerCase())}
              onUpdate={(u) => updateItem(item.id, u)}
              onRemove={() => removeItem(item.id)}
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
      className={`px-3 py-1 text-xs rounded-full border transition ${
        active
          ? 'bg-ember text-white border-ember'
          : 'bg-white border-gray-300 hover:border-ember'
      }`}
    >
      {label}{' '}
      <span className={active ? 'text-white/80' : 'text-gray-500'}>
        ({count})
      </span>
    </button>
  );
}

function ItemRow({
  item,
  proficient,
  onUpdate,
  onRemove,
}: {
  item: InventoryItem;
  proficient: boolean;
  onUpdate: (u: Partial<InventoryItem>) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const category = (item.category ?? 'other') as ItemCategory;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-3 flex items-center gap-3">
        {/* Equipped toggle (only for weapon/armor) */}
        {(category === 'weapon' || category === 'armor') && (
          <button
            onClick={() => onUpdate({ equipped: !item.equipped })}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs transition ${
              item.equipped
                ? 'bg-ember border-ember text-white'
                : 'border-gray-400 hover:border-ember'
            }`}
            title={item.equipped ? 'Unequip' : 'Equip'}
          >
            {item.equipped && '✓'}
          </button>
        )}

        {/* Category badge */}
        <span
          className={`text-xs font-bold text-white px-2 py-0.5 rounded ${
            CATEGORY_COLORS[category]
          }`}
        >
          {CATEGORY_LABELS[category]}
        </span>

        {/* Name */}
        <input
          value={item.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="flex-1 font-semibold border-b border-transparent hover:border-gray-300 focus:border-ember outline-none"
        />
        {proficient && (
          <span
            className="text-xs font-semibold text-jade border border-jade rounded px-1.5 py-0.5 whitespace-nowrap"
            title="You are proficient with this tool (from your background)"
          >
            Proficient
          </span>
        )}

        {/* Quantity */}
        <input
          type="number"
          min={0}
          value={item.quantity}
          onChange={(e) =>
            onUpdate({ quantity: parseInt(e.target.value) || 0 })
          }
          className="w-14 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
          title="Quantity"
        />

        {/* Weight per unit */}
        <div className="text-xs text-gray-500 w-16 text-right">
          {item.weight} lb ea
        </div>

        {/* Total weight */}
        <div className="text-xs text-gray-500 w-16 text-right font-semibold">
          {(item.weight * item.quantity).toFixed(1)} lb
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-ink"
        >
          {expanded ? '▾' : '▸'}
        </button>

        {/* Remove */}
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
          title="Remove"
        >
          ✕
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-3 pt-1 border-t border-gray-100 space-y-2 text-sm">
          {/* Damage / properties */}
          {(item.damage || (item.properties && item.properties.length > 0)) && (
            <div className="flex flex-wrap gap-3 text-xs">
              {item.damage && (
                <div>
                  <span className="font-semibold">Damage:</span> {item.damage}
                </div>
              )}
              {item.properties && item.properties.length > 0 && (
                <div>
                  <span className="font-semibold">Properties:</span>{' '}
                  {item.properties.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p className="text-xs text-gray-700">{item.description}</p>
          )}

          {/* Attunement (only for magic / prosthesis) */}
          {(category === 'magic' || category === 'prosthesis') && (
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={!!item.attuned}
                onChange={(e) => onUpdate({ attuned: e.target.checked })}
              />
              Attuned
            </label>
          )}

          {/* Notes */}
          <textarea
            value={item.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Notes..."
            rows={2}
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </div>
      )}
    </div>
  );
}