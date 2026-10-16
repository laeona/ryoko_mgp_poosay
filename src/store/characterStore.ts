import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '../types/character';

interface CharacterStore {
  characters: Character[];
  addCharacter: (c: Character) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;
  exportCharacter: (id: string) => void;
  importCharacter: (json: string) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],

      addCharacter: (c) =>
        set((state) => ({ characters: [...state.characters, c] })),

      updateCharacter: (id, updates) =>
        set((state) => ({
          characters: state.characters.map((c) =>
            c.id === id
              ? { ...c, ...updates, updatedAt: new Date().toISOString() }
              : c
          ),
        })),

      deleteCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((c) => c.id !== id),
        })),

      exportCharacter: (id) => {
        const c = get().characters.find((x) => x.id === id);
        if (!c) return;
        const blob = new Blob([JSON.stringify(c, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${c.name.replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
      },

      importCharacter: (json) => {
        try {
          const c = JSON.parse(json) as Character;
          if (!c.id) c.id = crypto.randomUUID();
          set((state) => ({ characters: [...state.characters, c] }));
        } catch {
          alert('Invalid character file');
        }
      },
    }),
    { name: 'yokai-characters' }
  )
);

export function createBlankCharacter(): Character {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: 'New Character',
    createdAt: now,
    updatedAt: now,
    level: 1,
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    race: { name: '', choices: {} },
    classes: [],
    background: {
      name: '',
      skills: [],
      tools: [],
      languages: [],
      personalityTrait: '',
      ideal: '',
      bond: '',
      flaw: '',
    },
    feats: [],
    advancedTechniques: [],
    martialLevel: 0,
    inventory: [],
    prostheses: [],
    currency: { gp: 0, sp: 0, cp: 0 },
    skillProficiencies: [],
    skillExpertise: [],
    combat: {
      maxHP: 10,
      currentHP: 10,
      tempHP: 0,
      hitDiceTotal: 1,
      hitDiceUsed: 0,
      armorClass: 10,
      initiative: 0,
      speed: 30,
      conditions: [],
      hpRolledValues: [],
    },
    resources: [],
    features: [],
    notes: '',
    backstory: '',
    activeTab: 'overview',
  };
}