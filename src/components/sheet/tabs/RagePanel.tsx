import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import {
  KAIJU_NAMES,
  getAspectBenefit,
  getKaijuForce,
  getTransformation,
} from '../../../data/kaijuAspects';
import type { RageContext } from '../../../data/kaijuAspects';
import {
  getModifier,
  getProficiencyBonus,
  getTotalAbilityScores,
} from '../../../utils/calculations';

interface Props {
  characterId: string;
}

/** Start and end a barbarian's rage, choosing a kaiju aspect each time. */
export default function RagePanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [aspect, setAspect] = useState<string | null>(null);
  const [form, setForm] = useState<string>('same');

  if (!character) return null;
  const barb = character.classes.find((c) => c.className === 'Barbarian');
  if (!barb) return null;

  const resources = character.resources ?? [];
  const rageRes = resources.find((r) => r.name === 'Rage');
  const rage = character.rage;
  const raging = rage?.active ?? false;
  const kaijuPath = barb.level >= 3 && barb.subclass === 'Path of the Kaiju';
  const remaining = rageRes ? rageRes.max - rageRes.used : 0;
  const canStart = !raging && !!rageRes && (rageRes.unlimited || remaining > 0);

  const totals = getTotalAbilityScores(character);
  const ctx: RageContext = {
    level: barb.level,
    strMod: getModifier(totals.strength),
    conMod: getModifier(totals.constitution),
    pb: getProficiencyBonus(character.level),
  };

  const chosen = aspect ?? rage?.lastAspect ?? KAIJU_NAMES[0];
  const chosenForm = form === 'same' ? chosen : form;

  const startRage = () => {
    updateCharacter(character.id, {
      resources: resources.map((r) =>
        r.name === 'Rage' && !r.unlimited ? { ...r, used: Math.min(r.max, r.used + 1) } : r
      ),
      rage: kaijuPath
        ? {
            active: true,
            aspect: chosen,
            form: barb.level >= 10 ? chosenForm : undefined,
            lastAspect: chosen,
          }
        : { active: true, lastAspect: rage?.lastAspect },
    });
  };

  const endRage = () => {
    updateCharacter(character.id, {
      rage: { active: false, lastAspect: rage?.lastAspect },
    });
  };

  return (
    <div
      className={`rounded-lg border-2 p-3 mb-3 ${
        raging ? 'border-ember bg-ember/10' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-bold">
          {raging ? '🔥 Raging' : 'Rage'}
          {raging && rage?.aspect && (
            <span className="text-ember"> · {rage.aspect}</span>
          )}
        </h4>
        {raging && (
          <button
            type="button"
            onClick={endRage}
            className="px-3 py-1 text-xs bg-ink text-parchment rounded hover:bg-gray-800 font-semibold"
          >
            End Rage
          </button>
        )}
      </div>

      {raging ? (
        <div className="text-xs text-gray-700 space-y-2">
          <p>
            Advantage on Strength checks and saves, bonus melee damage, and resistance to
            bludgeoning, piercing and slashing damage.
          </p>
          {rage?.aspect && (
            <>
              <p>
                <span className="font-semibold">Aspect, {rage.aspect}: </span>
                {getAspectBenefit(rage.aspect, ctx)}
              </p>
              {barb.level >= 6 && <p>{getKaijuForce(ctx)}</p>}
              {barb.level >= 10 && (
                <p>
                  <span className="font-semibold">
                    Transformation, {rage.form ?? rage.aspect}:{' '}
                  </span>
                  {getTransformation(rage.form ?? rage.aspect, ctx)}
                </p>
              )}
            </>
          )}
        </div>
      ) : kaijuPath ? (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">
            Choose the kaiju aspect to channel for this rage. Starting spends one use of Rage.
          </p>
          <div className="flex flex-wrap gap-2">
            {KAIJU_NAMES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setAspect(n)}
                aria-pressed={chosen === n}
                className={`px-3 py-1.5 text-sm rounded border-2 font-semibold transition ${
                  chosen === n
                    ? 'border-ember bg-ember text-white'
                    : 'border-gray-300 hover:border-ember'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-700">{getAspectBenefit(chosen, ctx)}</p>
          {barb.level >= 10 && (
            <label className="flex items-center gap-2 text-xs">
              <span className="font-semibold">Transformation form</span>
              <select
                value={form}
                onChange={(e) => setForm(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="same">Same as aspect ({chosen})</option>
                {KAIJU_NAMES.filter((n) => n !== chosen).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button
            type="button"
            disabled={!canStart}
            onClick={startRage}
            className="px-3 py-1.5 text-sm bg-ember text-white rounded hover:bg-red-700 font-semibold disabled:opacity-40"
          >
            Start Rage as {chosen}
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!canStart}
          onClick={startRage}
          className="px-3 py-1.5 text-sm bg-ember text-white rounded hover:bg-red-700 font-semibold disabled:opacity-40"
        >
          Start Rage
        </button>
      )}
      {!raging && !canStart && (
        <p className="text-xs text-red-700 mt-2">No rages left. Take a long rest to recover them.</p>
      )}
    </div>
  );
}
