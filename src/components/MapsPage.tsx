import { useEffect, useRef, useState } from 'react';
import { useCharacterStore } from '../store/characterStore';
import { useMapStore } from '../store/mapStore';
import type { BattleMap, MapToken } from '../store/mapStore';
import { deleteMapImage, loadMapImage, prepareMapImage, saveMapImage } from '../utils/mapImages';
import MapCanvas from './maps/MapCanvas';
import type { MapTool } from './maps/MapCanvas';

const TOKEN_COLOURS = ['#c8102e', '#2a8fa8', '#3f7d5a', '#d1a53c', '#7a3fa0', '#e0832a', '#4a5a78', '#16090b'];

export default function MapsPage() {
  const maps = useMapStore((s) => s.maps);
  const activeMapId = useMapStore((s) => s.activeMapId);
  const { addMap, updateMap, deleteMap, setActiveMap, addToken, updateToken, removeToken } = useMapStore.getState();
  const characters = useCharacterStore((s) => s.characters);

  const activeMap = maps.find((m) => m.id === activeMapId) ?? maps[0] ?? null;
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tool, setTool] = useState<MapTool>('move');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [npcName, setNpcName] = useState('');
  const [npcColour, setNpcColour] = useState(TOKEN_COLOURS[0]);

  const mapId = activeMap?.id;

  // Load the picture for the active map
  useEffect(() => {
    let url: string | null = null;
    let cancelled = false;
    setImageUrl(null);
    setSelectedId(null);
    if (!mapId) return;
    loadMapImage(mapId)
      .then((blob) => {
        if (cancelled) return;
        if (!blob) {
          setError('The picture for this map is missing from this browser. Upload it again by deleting and re-adding the map.');
          return;
        }
        url = URL.createObjectURL(blob);
        setImageUrl(url);
      })
      .catch(() => !cancelled && setError('Could not load the map picture.'));
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [mapId]);

  // Delete key removes the selected token
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && mapId) {
        removeToken(mapId, selectedId);
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, mapId]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const { blob, width, height } = await prepareMapImage(file);
      const id = crypto.randomUUID();
      await saveMapImage(id, blob);
      addMap({
        id,
        name: file.name.replace(/\.[^.]+$/, '') || 'New map',
        width,
        height,
        gridSize: 70,
        gridOffsetX: 0,
        gridOffsetY: 0,
        showGrid: true,
        snap: true,
        tokens: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add that map.');
    } finally {
      setBusy(false);
    }
  };

  const onDeleteMap = async (m: BattleMap) => {
    if (!confirm(`Delete the map "${m.name}" and its tokens?`)) return;
    deleteMap(m.id);
    try {
      await deleteMapImage(m.id);
    } catch {
      // the picture just stays in browser storage
    }
  };

  const placeToken = (partial: Pick<MapToken, 'label' | 'color'> & { characterId?: string }) => {
    if (!activeMap) return;
    const g = activeMap.gridSize;
    const n = activeMap.tokens.length;
    const cx = Math.round(activeMap.width / 2 / g) * g + (n % 6) * g;
    const cy = Math.round(activeMap.height / 2 / g) * g + Math.floor(n / 6) * g;
    const token: MapToken = {
      id: crypto.randomUUID(),
      ...partial,
      x: Math.min(cx, Math.max(0, activeMap.width - g)),
      y: Math.min(cy, Math.max(0, activeMap.height - g)),
      size: 1,
    };
    addToken(activeMap.id, token);
    setSelectedId(token.id);
  };

  const selected = activeMap?.tokens.find((t) => t.id === selectedId) ?? null;
  const portraits: Record<string, string | undefined> = {};
  for (const c of characters) portraits[c.id] = c.portrait;

  const num = (v: string, fallback: number) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-2xl font-bold mr-auto">Battle Maps</h2>
        {maps.length > 0 && (
          <select
            value={activeMap?.id ?? ''}
            onChange={(e) => setActiveMap(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1.5"
            aria-label="Choose a map"
          >
            {maps.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="px-4 py-2 bg-jade text-white rounded hover:bg-green-800 transition disabled:opacity-60"
        >
          {busy ? 'Adding…' : '+ Upload Map'}
        </button>
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</p>}

      {!activeMap ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <p className="text-lg mb-2">No maps yet.</p>
          <p className="text-sm max-w-md mx-auto">
            Upload a picture of a battle map, then add character and monster tokens and drag them around the grid.
            Maps stay in this browser only, so share your screen with the table when you play.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
          <aside className="space-y-4">
            <section className="bg-white rounded-lg shadow p-4 space-y-2">
              <h3 className="font-bold text-sm uppercase text-gray-500">Map</h3>
              <input
                value={activeMap.name}
                onChange={(e) => updateMap(activeMap.id, { name: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1"
                aria-label="Map name"
              />
              <div className="grid grid-cols-3 gap-2 text-xs">
                <label className="col-span-3">
                  <span className="font-semibold">Grid square size (px)</span>
                  <input
                    type="number"
                    min={10}
                    max={400}
                    value={activeMap.gridSize}
                    onChange={(e) =>
                      updateMap(activeMap.id, { gridSize: Math.min(400, Math.max(10, num(e.target.value, 70))) })
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 mt-0.5"
                  />
                </label>
                <label>
                  <span className="font-semibold">Offset X</span>
                  <input
                    type="number"
                    value={activeMap.gridOffsetX}
                    onChange={(e) => updateMap(activeMap.id, { gridOffsetX: num(e.target.value, 0) })}
                    className="w-full border border-gray-300 rounded px-2 py-1 mt-0.5"
                  />
                </label>
                <label>
                  <span className="font-semibold">Offset Y</span>
                  <input
                    type="number"
                    value={activeMap.gridOffsetY}
                    onChange={(e) => updateMap(activeMap.id, { gridOffsetY: num(e.target.value, 0) })}
                    className="w-full border border-gray-300 rounded px-2 py-1 mt-0.5"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeMap.showGrid}
                  onChange={(e) => updateMap(activeMap.id, { showGrid: e.target.checked })}
                />
                Show grid
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeMap.snap}
                  onChange={(e) => updateMap(activeMap.id, { snap: e.target.checked })}
                />
                Snap tokens to grid
              </label>
              <p className="text-xs text-gray-500">
                Match the grid to your picture by adjusting the square size and offsets. One square is 5 ft.
              </p>
              <button
                type="button"
                onClick={() => onDeleteMap(activeMap)}
                className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete this map
              </button>
            </section>

            <section className="bg-white rounded-lg shadow p-4 space-y-2">
              <h3 className="font-bold text-sm uppercase text-gray-500">Characters</h3>
              {characters.length === 0 ? (
                <p className="text-xs text-gray-500">Create a character to add its token.</p>
              ) : (
                <ul className="space-y-1">
                  {characters.map((c) => {
                    const placed = activeMap.tokens.some((t) => t.characterId === c.id);
                    return (
                      <li key={c.id} className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-full bg-gray-200 bg-cover bg-center shrink-0 flex items-center justify-center text-xs font-bold text-gray-500"
                          style={c.portrait ? { backgroundImage: `url("${c.portrait}")` } : undefined}
                        >
                          {!c.portrait && (c.name.trim()[0] ?? '?').toUpperCase()}
                        </span>
                        <span className="flex-1 truncate text-sm">{c.name}</span>
                        <button
                          type="button"
                          disabled={placed}
                          onClick={() => placeToken({ label: c.name, color: '#d1a53c', characterId: c.id })}
                          className="text-xs px-2 py-1 rounded bg-jade text-white hover:bg-green-800 disabled:bg-gray-300 disabled:text-gray-500"
                        >
                          {placed ? 'On map' : 'Add'}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="bg-white rounded-lg shadow p-4 space-y-2">
              <h3 className="font-bold text-sm uppercase text-gray-500">Monster / NPC token</h3>
              <input
                value={npcName}
                onChange={(e) => setNpcName(e.target.value)}
                placeholder="Name (e.g. Goblin 1)"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <div className="flex flex-wrap gap-1">
                {TOKEN_COLOURS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNpcColour(c)}
                    aria-label={`Colour ${c}`}
                    className="w-6 h-6 rounded-full border-2"
                    style={{ background: c, borderColor: npcColour === c ? '#d1a53c' : 'transparent', outline: npcColour === c ? '2px solid #16090b' : 'none' }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  placeToken({ label: npcName.trim() || 'Monster', color: npcColour });
                  setNpcName('');
                }}
                className="px-3 py-1.5 text-sm bg-ember text-white rounded hover:bg-red-700"
              >
                Add token
              </button>
            </section>

            {selected && (
              <section className="bg-white rounded-lg shadow p-4 space-y-2">
                <h3 className="font-bold text-sm uppercase text-gray-500">Selected token</h3>
                <input
                  value={selected.label}
                  onChange={(e) => updateToken(activeMap.id, selected.id, { label: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  aria-label="Token name"
                />
                <label className="flex items-center gap-2 text-sm">
                  Size
                  <select
                    value={selected.size}
                    onChange={(e) => updateToken(activeMap.id, selected.id, { size: parseFloat(e.target.value) })}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value={0.5}>Tiny (½)</option>
                    <option value={1}>Medium (1×1)</option>
                    <option value={2}>Large (2×2)</option>
                    <option value={3}>Huge (3×3)</option>
                    <option value={4}>Gargantuan (4×4)</option>
                  </select>
                </label>
                <div className="flex flex-wrap gap-1">
                  {TOKEN_COLOURS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateToken(activeMap.id, selected.id, { color: c })}
                      aria-label={`Ring colour ${c}`}
                      className="w-6 h-6 rounded-full border-2"
                      style={{ background: c, borderColor: selected.color === c ? '#d1a53c' : 'transparent' }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeToken(activeMap.id, selected.id);
                    setSelectedId(null);
                  }}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Remove token
                </button>
              </section>
            )}
          </aside>

          <section className="bg-white rounded-lg shadow p-3 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded overflow-hidden border border-gray-300 text-sm">
                {(
                  [
                    ['move', 'Move'],
                    ['ruler', 'Ruler'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTool(id)}
                    className={`px-3 py-1 font-semibold ${tool === id ? 'bg-ember text-white' : 'bg-white hover:bg-gray-100'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {tool === 'move'
                  ? 'Drag tokens or the background. Scroll to zoom. Delete removes the selected token.'
                  : 'Drag across the map to measure distance.'}
              </span>
              {activeMap.tokens.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Remove every token from this map?')) {
                      updateMap(activeMap.id, { tokens: [] });
                      setSelectedId(null);
                    }
                  }}
                  className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Clear tokens
                </button>
              )}
            </div>
            <div className="h-[70vh] min-h-[320px] rounded overflow-hidden border border-gray-300">
              <MapCanvas
                map={activeMap}
                imageUrl={imageUrl}
                portraits={portraits}
                selectedId={selectedId}
                tool={tool}
                onSelect={setSelectedId}
                onMoveToken={(id, x, y) => updateToken(activeMap.id, id, { x, y })}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
