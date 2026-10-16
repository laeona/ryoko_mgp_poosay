import { useState } from 'react';
import { useCharacterStore } from './store/characterStore';
import CharacterList from './components/CharacterList';
import CharacterBuilder from './components/builder/CharacterBuilder';
import CharacterSheet from './components/sheet/CharacterSheet';

type View = 'list' | 'builder' | 'sheet';

function App() {
  const [view, setView] = useState<View>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const characters = useCharacterStore((s) => s.characters);

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
    <div className="min-h-screen bg-parchment text-ink">
      <header className="bg-ink text-parchment p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={handleBack}
          >
            🐉 Yokai Character Sheet
          </h1>
          {view !== 'list' && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-ember rounded hover:bg-red-700 transition"
            >
              ← Back to List
            </button>
          )}
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
        {view === 'sheet' && editingId && (
          <CharacterSheet characterId={editingId} />
        )}
      </main>
    </div>
  );
}

export default App;