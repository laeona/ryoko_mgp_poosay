import { useState } from 'react';
import {
  createBlankCharacter,
  useCharacterStore,
} from '../../store/characterStore';

interface Props {
  onDone: (id: string) => void;
}

export default function CharacterBuilder({ onDone }: Props) {
  const [name, setName] = useState('');
  const addCharacter = useCharacterStore((s) => s.addCharacter);

  const handleCreate = () => {
    const c = createBlankCharacter();
    c.name = name || 'New Character';
    addCharacter(c);
    onDone(c.id);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Character</h2>
      <label className="block mb-2 font-semibold">Character Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Enter name..."
      />
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800"
      >
        Create &amp; Open Sheet
      </button>
      <p className="text-sm text-gray-500 mt-4">
        (Full builder wizard will be added next.)
      </p>
    </div>
  );
}