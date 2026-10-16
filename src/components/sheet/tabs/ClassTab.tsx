import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { CLASSES, getClass } from '../../../data/classes';
import type { DnDClass, ClassLevel } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function ClassTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [adding, setAdding] = useState(false);

  if (!character) return null;

  const totalLevel = character.classes.reduce((s, c) => s + c.level, 0);

  const addClass = (className: string) => {
    const cls = getClass(className);
    if (!cls) return;
    updateCharacter(character.id, {
      classes: [
        ...character.classes,
        { className: cls.name, level: 1, choices: {} },
      ],
    });
    setAdding(false);
  };

  const updateClass = (index: number, updates: Partial<ClassLevel>) => {
    const next = [...character.classes];
    next[index] = { ...next[index], ...updates };
    updateCharacter(character.id, { classes: next });
  };

  const removeClass = (index: number) => {
    const next = character.classes.filter((_, i) => i !== index);
    updateCharacter(character.id, { classes: next });
  };

  const availableToAdd = CLASSES.filter(
    (c) => !character.classes.some((cc) => cc.className === c.name)
  );

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase text-gray-500 font-semibold">
            Total Level
          </div>
          <div className="text-3xl font-bold text-ink">{totalLevel}</div>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800 transition"
          disabled={availableToAdd.length === 0}
        >
          {adding ? 'Cancel' : '+ Add Class'}
        </button>
      </div>

      {/* Add-class picker */}
      {adding && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold mb-3">Choose a Class</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableToAdd.map((cls) => (
              <button
                key={cls.name}
                onClick={() => addClass(cls.name)}
                className="text-left p-3 rounded border-2 border-gray-200 hover:border-jade transition"
              >
                <div className="font-semibold">{cls.name}</div>
                <div className="text-xs text-gray-500">
                  d{cls.hitDie} · {cls.martialTier}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Class cards */}
      {character.classes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <p className="text-lg mb-2">No class selected.</p>
          <p className="text-sm">
            Click <span className="font-semibold">+ Add Class</span> to begin.
          </p>
        </div>
      ) : (
        character.classes.map((cl, i) => (
          <ClassCard
            key={`${cl.className}-${i}`}
            classLevel={cl}
            onUpdate={(updates) => updateClass(i, updates)}
            onRemove={() => removeClass(i)}
            canRemove={character.classes.length > 1}
          />
        ))
      )}
    </div>
  );
}

/* ============================================================ */

interface ClassCardProps {
  classLevel: ClassLevel;
  onUpdate: (updates: Partial<ClassLevel>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function ClassCard({
  classLevel,
  onUpdate,
  onRemove,
  canRemove,
}: ClassCardProps) {
  const cls: DnDClass | undefined = getClass(classLevel.className);
  if (!cls) return null;

  const sub = classLevel.subclass
    ? cls.subclasses.find((s) => s.name === classLevel.subclass)
    : null;

  const visibleFeatures = [
    ...cls.features,
    ...(sub?.features ?? []),
  ]
    .filter((f) => f.level <= classLevel.level)
    .sort((a, b) => a.level - b.level);

  const visibleChoices = cls.choices?.filter(
    (c) => classLevel.level >= c.level
  );

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 p-4 border-b">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-ink">
            {cls.name}
            {sub && <span className="text-ember"> · {sub.name}</span>}
          </h2>
          <p className="text-xs text-gray-500">
            d{cls.hitDie} Hit Die · {cls.martialTier} martial
            {cls.spellcasting && ` · ${cls.spellcasting.type} caster`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1">
            <button
              onClick={() =>
                onUpdate({ level: Math.max(1, classLevel.level - 1) })
              }
              className="text-lg font-bold text-gray-600 hover:text-ink"
            >
              −
            </button>
            <span className="text-xl font-bold w-8 text-center">
              {classLevel.level}
            </span>
            <button
              onClick={() =>
                onUpdate({ level: Math.min(20, classLevel.level + 1) })
              }
              className="text-lg font-bold text-gray-600 hover:text-ink"
            >
              +
            </button>
          </div>
          {canRemove && (
            <button
              onClick={() => {
                if (confirm(`Remove ${cls.name}?`)) onRemove();
              }}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-4">
        {/* Spellcasting ability */}
        {cls.spellcasting?.ability === 'choice' && (
          <div className="bg-amber-50 border border-amber-200 rounded p-3">
            <label className="block text-sm font-semibold mb-1">
              Spellcasting Ability
            </label>
            <select
              value={(classLevel.choices['spellcasting-ability'] as string) ?? ''}
              onChange={(e) =>
                onUpdate({
                  choices: {
                    ...classLevel.choices,
                    'spellcasting-ability': e.target.value,
                  },
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="">— Choose —</option>
              <option value="Intelligence">Intelligence</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Charisma">Charisma</option>
            </select>
          </div>
        )}

        {/* Subclass */}
        {classLevel.level >= cls.subclassLevel && (
          <div>
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
              {cls.subclassLabel ?? 'Subclass'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cls.subclasses.map((s) => {
                const isSelected = classLevel.subclass === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => onUpdate({ subclass: s.name })}
                    className={`text-left p-3 rounded border-2 transition text-sm ${
                      isSelected
                        ? 'border-ember bg-ember/10'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold mb-1">{s.name}</div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {s.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Class choices */}
        {visibleChoices?.map((choice) => (
          <div key={choice.id}>
            <label className="block text-sm font-semibold mb-1">
              {choice.label}
            </label>
            {choice.type === 'select' ? (
              <select
                value={(classLevel.choices[choice.id] as string) ?? ''}
                onChange={(e) =>
                  onUpdate({
                    choices: { ...classLevel.choices, [choice.id]: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
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
                  const arr = (classLevel.choices[choice.id] as string[]) ?? [];
                  const selected = arr.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        let next = [...arr];
                        if (selected) next = next.filter((x) => x !== opt);
                        else if (!choice.count || next.length < choice.count)
                          next.push(opt);
                        onUpdate({
                          choices: { ...classLevel.choices, [choice.id]: next },
                        });
                      }}
                      className={`px-2 py-0.5 text-xs rounded border transition ${
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

        {/* Features */}
        {visibleFeatures.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer font-bold text-sm uppercase text-gray-500 mb-2 select-none">
              Features ({visibleFeatures.length})
            </summary>
            <div className="space-y-1 mt-2">
              {visibleFeatures.map((f, i) => (
                <div
                  key={`${f.name}-${i}`}
                  className="border-l-2 border-jade pl-2 py-0.5 text-sm"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold bg-jade text-white px-1.5 rounded">
                      {f.level}
                    </span>
                    <span className="font-semibold">{f.name}</span>
                  </div>
                  <p className="text-xs text-gray-700">{f.description}</p>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}