import { useRef } from 'react';
import type { Character } from '../types/character';
import { useCharacterStore } from '../store/characterStore';

interface Props {
  characters: Character[];
  onCreate: () => void;
  onEdit: (id: string) => void;
}

export default function CharacterList({ characters, onCreate, onEdit }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const { deleteCharacter, importCharacter, exportCharacter } =
    useCharacterStore();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => importCharacter(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800 transition"
        >
          + New Character
        </button>
        <button
          onClick={() => fileInput.current?.click()}
          className="px-4 py-2 bg-ink text-parchment rounded hover:bg-gray-800 transition"
        >
          Import JSON
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {characters.length === 0 ? (
        <p className="text-gray-600">
          No characters yet. Create your first one!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((c) => (
            <div
              key={c.id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-1">{c.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                Level {c.level}{' '}
                {c.classes.map((cl) => cl.className).join(' / ') || 'No class'}{' '}
                · {c.race.name || 'No race'}
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => onEdit(c.id)}
                  className="px-3 py-1 text-sm bg-ember text-white rounded hover:bg-red-700"
                >
                  Open
                </button>
                <button
                  onClick={() => exportCharacter(c.id)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Export
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${c.name}?`)) deleteCharacter(c.id);
                  }}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}