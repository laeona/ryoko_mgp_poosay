import { useCharacterStore } from '../../../store/characterStore';
import { KAIJU_ASPECTS } from '../../../data/kaijuAspects';

interface Props {
  characterId: string;
}

/** Start and end a barbarian's rage, choosing a kaiju aspect each time. */
export default function RagePanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

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

  const startRage = (aspect?: string) => {
    updateCharacter(character.id, {
      resources: resources.map((r) =>
        r.name === 'Rage' && !r.unlimited ? { ...r, used: Math.min(r.max, r.used + 1) } : r
      ),
      rage: { active: true, aspect, lastAspect: aspect ?? rage?.lastAspect },
    });
  };

  const endRage = () => {
    updateCharacter(character.id, {
      rage: { active: false, lastAspect: rage?.lastAspect },
    });
  };

  const activeAspect = KAIJU_ASPECTS.find((a) => a.name === rage?.aspect);

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
        <p className="text-xs text-gray-700">
          {activeAspect?.benefits ||
            (rage?.aspect
              ? `Aspect rules for ${rage.aspect} haven't been added to the app yet. See your Path of the Kaiju notes.`
              : 'Advantage on Strength checks and saves, bonus melee damage, and resistance to physical damage.')}
        </p>
      ) : kaijuPath ? (
        <>
          <p className="text-xs text-gray-600 mb-2">
            Choose the kaiju aspect to channel for this rage. Starting spends one use of Rage.
          </p>
          <div className="flex flex-wrap gap-2">
            {KAIJU_ASPECTS.map((a) => (
              <button
                key={a.name}
                type="button"
                disabled={!canStart}
                onClick={() => startRage(a.name)}
                title={a.benefits || undefined}
                className={`px-3 py-1.5 text-sm rounded border-2 font-semibold transition disabled:opacity-40 ${
                  rage?.lastAspect === a.name
                    ? 'border-ember text-ember'
                    : 'border-gray-300 hover:border-ember'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button
          type="button"
          disabled={!canStart}
          onClick={() => startRage()}
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
