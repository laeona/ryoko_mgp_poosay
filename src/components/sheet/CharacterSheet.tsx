import { useCharacterStore } from '../../store/characterStore';

interface Props {
  characterId: string;
}

export default function CharacterSheet({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return <p>Character not found.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <input
        value={character.name}
        onChange={(e) =>
          updateCharacter(character.id, { name: e.target.value })
        }
        className="text-3xl font-bold mb-4 border-b border-transparent hover:border-gray-300 focus:border-ember outline-none w-full"
      />
      <p className="text-gray-600">
        Level {character.level} · {character.race.name || 'No race'} ·{' '}
        {character.classes.map((c) => c.className).join(' / ') || 'No class'}
      </p>
      <p className="text-sm text-gray-500 mt-4">
        (Full sheet UI coming next.)
      </p>
    </div>
  );
}