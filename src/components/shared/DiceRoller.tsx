import { useRollStore } from '../../store/rollStore';
import { rollFormula, formatModifier } from '../../utils/dice';

const QUICK_DICE = [4, 6, 8, 10, 12, 20, 100];

export default function DiceRoller() {
  const { history, lastRoll, panelOpen, setPanelOpen, push, clear } =
    useRollStore();

  const handleRoll = (sides: number) => {
    const formula = `1d${sides}`;
    const res = rollFormula(formula);
    push({
      formula,
      label: `d${sides}`,
      rolls: res.rolls,
      modifier: 0,
      total: res.total,
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-ember text-white shadow-2xl hover:bg-red-700 transition z-40 flex items-center justify-center text-2xl"
        title="Dice Roller"
      >
        🎲
      </button>

      {/* Last roll toast */}
      {lastRoll && !panelOpen && (
        <div className="fixed bottom-24 right-6 bg-ink text-parchment px-4 py-2 rounded-lg shadow-xl z-40 max-w-xs animate-fade-in">
          <div className="text-xs text-parchment/60">
            {lastRoll.label ? `${lastRoll.label} · ` : ''}
            {lastRoll.formula}
          </div>
          <div className="text-2xl font-bold text-ember">
            {lastRoll.total}
          </div>
          {lastRoll.rolls.length > 1 && (
            <div className="text-xs text-parchment/60">
              [ {lastRoll.rolls.join(', ')} ]
              {lastRoll.modifier !== 0 && ` ${formatModifier(lastRoll.modifier)}`}
            </div>
          )}
        </div>
      )}

      {/* Panel */}
      {panelOpen && (
        <div className="fixed bottom-6 right-24 w-80 max-h-[70vh] bg-parchment border border-gray-300 rounded-lg shadow-2xl flex flex-col z-40">
          {/* Header */}
          <div className="bg-ink text-parchment p-3 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold">🎲 Dice Roller</h3>
            <button
              onClick={() => setPanelOpen(false)}
              className="text-parchment hover:text-ember text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Quick dice */}
          <div className="p-3 border-b border-gray-200">
            <div className="text-xs uppercase text-gray-500 font-semibold mb-2">
              Quick Roll
            </div>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_DICE.map((sides) => (
                <button
                  key={sides}
                  onClick={() => handleRoll(sides)}
                  className="px-2 py-2 bg-white border border-gray-300 rounded text-sm font-bold hover:border-ember hover:bg-ember/5 transition"
                >
                  d{sides}
                </button>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs uppercase text-gray-500 font-semibold">
                History
              </div>
              {history.length > 0 && (
                <button
                  onClick={clear}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-4">
                No rolls yet. Click a modifier on the sheet, or use the quick
                dice above.
              </p>
            ) : (
              <div className="space-y-2">
                {history.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white rounded p-2 border-l-2 border-ember text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 truncate">
                        {r.label ? `${r.label} · ` : ''}
                        {r.formula}
                      </span>
                      <span className="text-lg font-bold text-ember">
                        {r.total}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      [ {r.rolls.join(', ')} ]
                      {r.modifier !== 0 && ` ${formatModifier(r.modifier)}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}