import { create } from 'zustand';
import type { RollResult } from '../utils/dice';

interface RollStore {
  history: RollResult[];
  lastRoll: RollResult | null;
  panelOpen: boolean;
  push: (r: Omit<RollResult, 'id' | 'timestamp'>) => void;
  clear: () => void;
  setPanelOpen: (open: boolean) => void;
}

export const useRollStore = create<RollStore>((set) => ({
  history: [],
  lastRoll: null,
  panelOpen: false,

  push: (r) =>
    set((state) => {
      const entry: RollResult = {
        ...r,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      return {
        history: [entry, ...state.history].slice(0, 50),
        lastRoll: entry,
      };
    }),

  clear: () => set({ history: [], lastRoll: null }),
  setPanelOpen: (open) => set({ panelOpen: open }),
}));