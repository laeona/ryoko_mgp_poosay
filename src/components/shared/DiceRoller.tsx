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
        className="dice-fab fixed bottom-6 right-6 w-14 h-14 text-white transition z-40 flex items-center justify-center"
        title="Dice Roller"
        aria-label="Dice Roller"
      >
        <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" />
          <polygon points="16,8 23,21 9,21" />
          <path d="M16 8V2M16 8L4 9M16 8L28 9M23 21L28 23M23 21L28 9M9 21L4 23M9 21L4 9M23 21H9M9 21L16 30M23 21L16 30" strokeWidth="1.1" />
          <text x="16" y="19" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">20</text>
        </svg>
      </button>

      {/* Last roll toast */}
      {lastRoll && !panelOpen && (
        <div className="fixed bottom-24 right-6 bg-kon text-parchment px-4 py-2 rounded-lg shadow-xl z-40 max-w-xs animate-fade-in border border-gold/60">
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
        <div className="fixed bottom-6 right-24 w-80 max-h-[70vh] bg-washi border border-gold/50 rounded-lg shadow-2xl flex flex-col z-40">
          {/* Header */}
          <div className="site-header text-parchment p-3 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold tracking-wide">Dice Roller</h3>
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