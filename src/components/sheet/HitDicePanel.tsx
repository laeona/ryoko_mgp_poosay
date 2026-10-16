import { useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { rollHitDie } from '../../utils/calculations';

interface Props {
  characterId: string;
}

export default function HitDicePanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [lastRoll, setLastRoll] = useState<string | null>(null);

  if (!character) return null;

  const { hitDiceTotal, hitDiceUsed } = character.combat;
  const remaining = hitDiceTotal - hitDiceUsed;

  const handleSpend = () => {
    const result = rollHitDie(character);
    if (!result) {
      setLastRoll('No Hit Dice remaining. Take a long rest.');
      return;
    }

    // Add HP (capped at max)
    const newHP = Math.min(
      character.combat.maxHP,
      character.combat.currentHP + result.total
    );

    updateCharacter(character.id, {
      combat: {
        ...character.combat,
        currentHP: newHP,
        hitDiceUsed: character.combat.hitDiceUsed + 1,
      },
    });

    const conText =
      result.conMod === 0
        ? ''
        : result.conMod > 0
          ? ` + ${result.conMod} CON`
          : ` − ${Math.abs(result.conMod)} CON`;
    setLastRoll(
      `Rolled d${result.dieType}: ${result.roll}${conText} = ${result.total} HP restored`
    );
  };

  const handleRestoreOne = () => {
    if (hitDiceUsed <= 0) return;
    updateCharacter(character.id, {
      combat: { ...character.combat, hitDiceUsed: hitDiceUsed - 1 },
    });
    setLastRoll('Hit Die restored.');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold text-sm uppercase text-gray-500 mb-3">
        Hit Dice
      </h3>

      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-bold text-ink">
          {remaining}
          <span className="text-lg text-gray-400"> / {hitDiceTotal}</span>
        </span>
        <span className="text-sm text-gray-500">d{rollHitDie(character)?.dieType ?? 8}</span>
      </div>

      <div className="flex gap-2 mb-2">
        <button
          onClick={handleSpend}
          disabled={remaining === 0}
          className={`flex-1 px-3 py-1.5 text-sm rounded font-semibold transition ${
            remaining === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-jade text-white hover:bg-green-800'
          }`}
        >
          🎲 Spend Hit Die
        </button>
        <button
          onClick={handleRestoreOne}
          disabled={hitDiceUsed === 0}
          title="Manually restore one Hit Die (e.g., if you forgot to spend it)"
          className={`px-3 py-1.5 text-xs rounded transition ${
            hitDiceUsed === 0
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          +1
        </button>
      </div>

      {lastRoll && (
        <p className="text-xs text-gray-600 italic mt-2 border-l-2 border-jade pl-2">
          {lastRoll}
        </p>
      )}
    </div>
  );
}