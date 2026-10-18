import { useEffect, useState } from 'react';
import { useCharacterStore } from './store/characterStore';
import CharacterList from './components/CharacterList';
import CharacterBuilder from './components/builder/CharacterBuilder';
import CharacterSheet from './components/sheet/CharacterSheet';
import SettingPage from './components/SettingPage';
import MapsPage from './components/MapsPage';
import DiceRoller from './components/shared/DiceRoller';

type View = 'list' | 'builder' | 'sheet' | 'setting' | 'maps';
type Theme = 'day' | 'night';

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'day' || saved === 'night') return saved;
  } catch {
    // storage unavailable: fall through to the system preference
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
}

/** A small hanging paper lantern (chochin) for the header. */
function Lantern({ size, kanji }: { size: number; kanji?: string }) {
  return (
    <svg
      className="lantern"
      width={size}
      height={size * 1.7}
      viewBox="0 0 24 41"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2="6" stroke="#d1a53c" strokeWidth="1" />
      <rect x="7" y="6" width="10" height="3" rx="1" fill="#16090b" stroke="#d1a53c" strokeWidth="0.8" />
      <ellipse cx="12" cy="22" rx="10.5" ry="13" fill="#d7182a" />
      <ellipse cx="9" cy="17" rx="4" ry="6" fill="#ff6b5e" opacity="0.35" />
      <g stroke="#7a0a16" strokeWidth="0.8" fill="none" opacity="0.8">
        <path d="M2.5 15 Q12 18 21.5 15" />
        <path d="M1.7 22 Q12 25 22.3 22" />
        <path d="M2.5 29 Q12 32 21.5 29" />
      </g>
      <rect x="7" y="35" width="10" height="3" rx="1" fill="#16090b" stroke="#d1a53c" strokeWidth="0.8" />
      <line x1="12" y1="38" x2="12" y2="41" stroke="#d1a53c" strokeWidth="1" />
      {kanji && (
        <text x="12" y="26" textAnchor="middle" fontSize="10" fontWeight="800" fill="#16090b" fontFamily="'Shippori Mincho', serif">
          {kanji}
        </text>
      )}
    </svg>
  );
}

function App() {
  const [view, setView] = useState<View>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const characters = useCharacterStore((s) => s.characters);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    if (theme === 'night') document.documentElement.setAttribute('data-theme', 'night');
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === 'night' ? 'day' : 'night';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore: the choice just won't be remembered
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('sheet');
  };

  const handleCreate = () => {
    setEditingId(null);
    setView('builder');
  };

  const handleDone = (id: string) => {
    setEditingId(id);
    setView('sheet');
  };

  const handleBack = () => {
    setEditingId(null);
    setView('list');
  };

  return (
    <div className="min-h-screen text-ink">
      <header className="site-header text-parchment p-4">
        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-bold cursor-pointer flex items-center gap-3 tracking-wide"
            onClick={handleBack}
          >
            <span className="hanko" aria-hidden="true">
              妖
            </span>
            <span>
              Yokai Character Sheet
              <span className="block text-xs font-normal tracking-[0.3em] text-gold">
                妖怪 · 冒険者の書
              </span>
            </span>
          </h1>
          <div className="lanterns" aria-hidden="true">
            <Lantern size={30} />
            <Lantern size={42} kanji="妖" />
            <Lantern size={34} />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              title={theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
              aria-label={theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            >
              {theme === 'day' ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
              <span className="hidden sm:inline text-sm font-semibold">
                {theme === 'night' ? 'Night' : 'Day'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setView('setting');
              }}
              className="theme-toggle"
              aria-current={view === 'setting' ? 'page' : undefined}
            >
              <span className="font-display" aria-hidden="true">界</span>
              <span className="text-sm font-semibold">World</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setView('maps');
              }}
              className="theme-toggle"
              aria-current={view === 'maps' ? 'page' : undefined}
            >
              <span className="font-display" aria-hidden="true">図</span>
              <span className="text-sm font-semibold">Maps</span>
            </button>
            {view !== 'list' && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-ember rounded hover:bg-red-700 transition"
              >
                ← Back to List
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {view === 'list' && (
          <CharacterList
            characters={characters}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        )}
        {view === 'builder' && (
          <CharacterBuilder onDone={handleDone} onCancel={handleBack} />
        )}
        {view === 'setting' && <SettingPage />}
        {view === 'maps' && <MapsPage />}
        {view === 'sheet' && editingId && (
          <CharacterSheet characterId={editingId} />
        )}
      </main>
      <DiceRoller />
    </div>
  );
}

export default App;