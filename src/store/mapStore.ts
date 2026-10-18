import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MapToken {
  id: string;
  label: string;
  /** Set for player-character tokens; the portrait comes from the character. */
  characterId?: string;
  color: string;
  /** Top-left corner, in map-image pixels. */
  x: number;
  y: number;
  /** Width and height in grid squares. */
  size: number;
}

export interface BattleMap {
  id: string;
  name: string;
  width: number;
  height: number;
  /** Pixels per grid square, in map-image pixels. */
  gridSize: number;
  gridOffsetX: number;
  gridOffsetY: number;
  showGrid: boolean;
  snap: boolean;
  tokens: MapToken[];
}

interface MapStore {
  maps: BattleMap[];
  activeMapId: string | null;
  addMap: (m: BattleMap) => void;
  updateMap: (id: string, updates: Partial<BattleMap>) => void;
  deleteMap: (id: string) => void;
  setActiveMap: (id: string | null) => void;
  addToken: (mapId: string, t: MapToken) => void;
  updateToken: (mapId: string, tokenId: string, updates: Partial<MapToken>) => void;
  removeToken: (mapId: string, tokenId: string) => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      maps: [],
      activeMapId: null,
      addMap: (m) => set((s) => ({ maps: [...s.maps, m], activeMapId: m.id })),
      updateMap: (id, updates) =>
        set((s) => ({ maps: s.maps.map((m) => (m.id === id ? { ...m, ...updates } : m)) })),
      deleteMap: (id) =>
        set((s) => {
          const maps = s.maps.filter((m) => m.id !== id);
          return {
            maps,
            activeMapId: s.activeMapId === id ? (maps[0]?.id ?? null) : s.activeMapId,
          };
        }),
      setActiveMap: (id) => set({ activeMapId: id }),
      addToken: (mapId, t) =>
        set((s) => ({
          maps: s.maps.map((m) => (m.id === mapId ? { ...m, tokens: [...m.tokens, t] } : m)),
        })),
      updateToken: (mapId, tokenId, updates) =>
        set((s) => ({
          maps: s.maps.map((m) =>
            m.id === mapId
              ? { ...m, tokens: m.tokens.map((t) => (t.id === tokenId ? { ...t, ...updates } : t)) }
              : m
          ),
        })),
      removeToken: (mapId, tokenId) =>
        set((s) => ({
          maps: s.maps.map((m) =>
            m.id === mapId ? { ...m, tokens: m.tokens.filter((t) => t.id !== tokenId) } : m
          ),
        })),
    }),
    { name: 'yokai-maps' }
  )
);
