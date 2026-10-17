import { useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import type { NoteEntry } from '../../../types/character';

interface Props {
  characterId: string;
}

export default function NotesTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');

  if (!character) return null;

  const entries = character.noteEntries ?? [];

  const setEntries = (next: NoteEntry[]) =>
    updateCharacter(character.id, { noteEntries: next });

  const addNote = () => {
    const note: NoteEntry = {
      id: crypto.randomUUID(),
      title: `Note ${entries.length + 1}`,
      body: '',
      updatedAt: new Date().toISOString(),
    };
    setEntries([note, ...entries]);
  };

  const updateNote = (id: string, updates: Partial<NoteEntry>) =>
    setEntries(
      entries.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      )
    );

  const removeNote = (note: NoteEntry) => {
    const hasText = note.body.trim() !== '' || note.title.trim() !== '';
    if (hasText && !window.confirm(`Delete "${note.title || 'Untitled'}"?`)) return;
    setEntries(entries.filter((n) => n.id !== note.id));
  };

  const q = query.trim().toLowerCase();
  const shown = q
    ? entries.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
      )
    : entries;

  return (
    <div className="space-y-4">
      {/* Quick notes + backstory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
            Quick notes
          </h3>
          <textarea
            value={character.notes ?? ''}
            onChange={(e) => updateCharacter(character.id, { notes: e.target.value })}
            placeholder="Anything you want to jot down during a session..."
            rows={8}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">
            Backstory
          </h3>
          <textarea
            value={character.backstory ?? ''}
            onChange={(e) => updateCharacter(character.id, { backstory: e.target.value })}
            placeholder="Where does your character come from?"
            rows={8}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Added notes */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <h3 className="font-bold text-lg">
            Notes{' '}
            <span className="text-sm font-normal text-gray-500">({entries.length})</span>
          </h3>
          <div className="flex items-center gap-2">
            {entries.length > 1 && (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                className="px-3 py-1 text-sm border border-gray-300 rounded"
              />
            )}
            <button
              onClick={addNote}
              className="px-3 py-1 text-sm bg-jade text-white rounded hover:bg-green-800 transition"
            >
              + Add note
            </button>
          </div>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No notes yet. Click + Add note for session logs, NPCs, quests, or anything else.
          </p>
        ) : shown.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">No notes match your search.</p>
        ) : (
          <div className="space-y-3">
            {shown.map((note) => {
              const isCollapsed = collapsed[note.id];
              return (
                <div key={note.id} className="border border-gray-200 rounded">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-t">
                    <button
                      type="button"
                      onClick={() =>
                        setCollapsed({ ...collapsed, [note.id]: !isCollapsed })
                      }
                      className="text-gray-400 hover:text-ink"
                      title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                      {isCollapsed ? '▸' : '▾'}
                    </button>
                    <input
                      value={note.title}
                      onChange={(e) => updateNote(note.id, { title: e.target.value })}
                      placeholder="Title"
                      className="flex-1 font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-ember outline-none"
                    />
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeNote(note)}
                      className="text-xs text-red-500 hover:text-red-700"
                      title="Delete note"
                    >
                      ✕
                    </button>
                  </div>
                  {!isCollapsed && (
                    <textarea
                      value={note.body}
                      onChange={(e) => updateNote(note.id, { body: e.target.value })}
                      placeholder="Write your note..."
                      rows={6}
                      className="w-full px-3 py-2 text-sm rounded-b outline-none"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
