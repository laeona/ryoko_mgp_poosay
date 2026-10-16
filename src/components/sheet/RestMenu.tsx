import { useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { computeSpellSlots } from '../../data/spellSlots';

interface Props {
  characterId: string;
}

type RestType = 'short' | 'long' | null;

export default function RestMenu({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [open, setOpen] = useState(false);
  const [restType, setRestType] = useState<RestType>(null);

  if (!character) return null;

  const previewRest = (type: 'short' | 'long') => {
    const { slots, pact } = computeSpellSlots(character.classes);
    const resources = character.resources ?? [];

    const shortResources = resources.filter(
      (r) => r.rechargeOn === 'short' || r.rechargeOn === 'dawn'
    );
    const longResources = resources.filter(
      (r) =>
        r.rechargeOn === 'short' ||
        r.rechargeOn === 'long' ||
        r.rechargeOn === 'dawn'
    );

    // Spell slots that will reset
    const nonPactSlotsWithUsage = Object.entries(character.spellcasting?.spellSlots ?? {})
      .filter(([k]) => parseInt(k) > 0)
      .filter(([, v]) => v.used > 0);
    const pactUsed = character.spellcasting?.spellSlots?.[-1]?.used ?? 0;

    const hitDiceTotal = character.combat.hitDiceTotal;
    const hitDiceUsed = character.combat.hitDiceUsed;
    const hitDiceRegained = type === 'long' ? Math.max(1, Math.floor(hitDiceTotal / 2)) : 0;

    return {
      shortResources,
      longResources,
      nonPactSlotsWithUsage,
      pactUsed,
      hitDiceTotal,
      hitDiceUsed,
      hitDiceRegained,
      pact,
      slots,
    };
  };

  const handleRest = (type: 'short' | 'long') => {
    const sc = character.spellcasting;
    const resources = character.resources ?? [];

    // 1. Reset resources
    const updatedResources = resources.map((r) => {
      if (type === 'short') {
        if (r.rechargeOn === 'short' || r.rechargeOn === 'dawn') {
          return { ...r, used: 0 };
        }
      } else {
        // long rest resets everything except 'none'
        if (r.rechargeOn !== 'none') {
          return { ...r, used: 0 };
        }
      }
      return r;
    });

    // 2. Reset spell slots
    let updatedSpellcasting = sc;
    if (sc) {
      const newSlots = { ...sc.spellSlots };
      if (type === 'long') {
        // Reset all non-pact slots
        for (const k of Object.keys(newSlots)) {
          if (parseInt(k) > 0) {
            newSlots[parseInt(k)] = { ...newSlots[parseInt(k)], used: 0 };
          }
        }
      }
      // Pact magic resets on BOTH short and long rests
      if (newSlots[-1]) {
        newSlots[-1] = { ...newSlots[-1], used: 0 };
      }
      updatedSpellcasting = { ...sc, spellSlots: newSlots };
    }

    // 3. HP + Hit Dice
    let updatedCombat = { ...character.combat };
    if (type === 'long') {
      updatedCombat.currentHP = updatedCombat.maxHP;
      updatedCombat.tempHP = 0;
      const regained = Math.max(1, Math.floor(updatedCombat.hitDiceTotal / 2));
      updatedCombat.hitDiceUsed = Math.max(
        0,
        updatedCombat.hitDiceUsed - regained
      );
    }

    updateCharacter(character.id, {
      resources: updatedResources,
      spellcasting: updatedSpellcasting,
      combat: updatedCombat,
    });

    setOpen(false);
    setRestType(null);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-xs bg-ink text-parchment rounded hover:bg-gray-800 transition font-semibold"
      >
        🛏️ Rest
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-parchment rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-ink text-parchment p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">🛏️ Take a Rest</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setRestType(null);
                }}
                className="text-parchment hover:text-ember text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {restType === null ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Choose the type of rest your party is taking.
                  </p>

                  <RestOptionButton
                    title="Short Rest"
                    subtitle="1 hour. Spend Hit Dice, refill Pact Magic and short-rest resources."
                    onClick={() => setRestType('short')}
                  />
                  <RestOptionButton
                    title="Long Rest"
                    subtitle="8 hours. Full HP, all spell slots, all resources, half Hit Dice."
                    onClick={() => setRestType('long')}
                  />
                </div>
              ) : (
                <RestConfirmation
                  character={character}
                  restType={restType}
                  preview={previewRest(restType)}
                  onBack={() => setRestType(null)}
                  onConfirm={() => handleRest(restType)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Sub-components ---------- */

function RestOptionButton({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded border-2 border-gray-200 hover:border-jade hover:bg-jade/5 transition"
    >
      <div className="font-bold text-lg">{title}</div>
      <div className="text-sm text-gray-600">{subtitle}</div>
    </button>
  );
}

interface Preview {
  shortResources: Array<{ name: string; max: number; used: number }>;
  longResources: Array<{ name: string; max: number; used: number }>;
  nonPactSlotsWithUsage: Array<[string, { max: number; used: number }]>;
  pactUsed: number;
  hitDiceTotal: number;
  hitDiceUsed: number;
  hitDiceRegained: number;
  pact?: { slots: number; level: number };
  slots: number[];
}

function RestConfirmation({
  character,
  restType,
  preview,
  onBack,
  onConfirm,
}: {
  character: { name: string };
  restType: 'short' | 'long';
  preview: Preview;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const isShort = restType === 'short';
  const relevantResources = isShort ? preview.shortResources : preview.longResources;

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs uppercase text-gray-500 font-semibold">
          {isShort ? 'Short Rest' : 'Long Rest'}
        </div>
        <h3 className="text-xl font-bold">
          What will happen to {character.name}
        </h3>
      </div>

      <div className="bg-white rounded p-4 space-y-3 text-sm">
        {/* Spell slots */}
        {isShort && preview.pact && preview.pactUsed > 0 && (
          <RestLine
            label="Pact Magic slots"
            value={`${preview.pactUsed} used → restored`}
            tone="good"
          />
        )}
        {isShort && !preview.pact && (
          <RestLine
            label="Spell slots"
            value="Unchanged (short rests don't restore slots)"
            tone="muted"
          />
        )}
        {!isShort && preview.nonPactSlotsWithUsage.length > 0 && (
          <RestLine
            label="Spell slots"
            value={`${preview.nonPactSlotsWithUsage.length} level${
              preview.nonPactSlotsWithUsage.length > 1 ? 's' : ''
            } restored`}
            tone="good"
          />
        )}
        {!isShort && preview.pact && preview.pactUsed > 0 && (
          <RestLine
            label="Pact Magic slots"
            value="Restored"
            tone="good"
          />
        )}

        {/* HP */}
        {!isShort && (
          <RestLine
            label="Hit Points"
            value="Restored to maximum"
            tone="good"
          />
        )}
        {isShort && (
          <RestLine
            label="Hit Points"
            value="Unchanged (spend Hit Dice manually)"
            tone="muted"
          />
        )}

        {/* Hit Dice */}
        {!isShort && (
          <RestLine
            label="Hit Dice"
            value={`Regain ${preview.hitDiceRegained} (${Math.max(
              0,
              preview.hitDiceUsed - preview.hitDiceRegained
            )} will be spent of ${preview.hitDiceTotal})`}
            tone="good"
          />
        )}

        {/* Resources */}
        {relevantResources.length > 0 ? (
          <div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Resources Recharged
            </div>
            <ul className="space-y-1">
              {relevantResources.map((r) => (
                <li key={r.name} className="flex items-center justify-between">
                  <span>{r.name}</span>
                  <span
                    className={
                      r.used > 0
                        ? 'text-jade font-semibold'
                        : 'text-gray-500'
                    }
                  >
                    {r.used > 0 ? `${r.used} used → restored` : 'already full'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <RestLine
            label="Resources"
            value="No rechargeable resources tracked"
            tone="muted"
          />
        )}
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-jade text-white font-semibold hover:bg-green-800 transition"
        >
          Confirm {isShort ? 'Short' : 'Long'} Rest
        </button>
      </div>
    </div>
  );
}

function RestLine({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'good' | 'muted';
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span
        className={
          tone === 'good' ? 'text-jade font-semibold' : 'text-gray-500 italic'
        }
      >
        {value}
      </span>
    </div>
  );
}