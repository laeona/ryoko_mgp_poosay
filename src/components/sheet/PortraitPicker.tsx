import { useRef, useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { resizeImageToDataUrl } from '../../utils/image';

interface Props {
  characterId: string;
}

/** Round character portrait with change and remove controls. */
export default function PortraitPicker({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  if (!character) return null;

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      updateCharacter(character.id, { portrait: dataUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use that image.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 hover:border-ember bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center transition"
        title={character.portrait ? 'Change picture' : 'Add a picture'}
      >
        {character.portrait ? (
          <img
            src={character.portrait}
            alt={`${character.name} portrait`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="px-2 leading-tight">Add picture</span>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="hidden"
      />
      {character.portrait && (
        <button
          type="button"
          onClick={() => updateCharacter(character.id, { portrait: undefined })}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      )}
      {error && <span className="text-xs text-red-600 max-w-[120px] text-center">{error}</span>}
    </div>
  );
}
