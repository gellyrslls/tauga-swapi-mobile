import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchCharacters } from '../api/swapi';
import type { Character } from '../types/character';

type Status = 'idle' | 'loading' | 'success' | 'error';

type CharactersState = {
  characters: Character[];
  lastUpdated: number | null;
  status: Status;
  isOffline: boolean;
  hasHydrated: boolean;
  loadCharacters: () => Promise<void>;
  setOffline: (isOffline: boolean) => void;
};

export const useCharactersStore = create<CharactersState>()(
  persist(
    (set, get) => ({
      characters: [],
      lastUpdated: null,
      status: 'idle',
      isOffline: false,
      hasHydrated: false,

      loadCharacters: async () => {
        if (get().status === 'loading') return;
        set({ status: 'loading' });
        try {
          const characters = await fetchCharacters();
          set({ characters, lastUpdated: Date.now(), status: 'success' });
        } catch {
          // Keep whatever is cached so the list stays usable offline.
          set({ status: 'error' });
        }
      },

      setOffline: (isOffline) => set({ isOffline }),
    }),
    {
      name: 'characters',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ characters, lastUpdated }) => ({ characters, lastUpdated }),
      // The first fetch waits for this, otherwise a late rehydrate could overwrite fresh data.
      onRehydrateStorage: () => () => useCharactersStore.setState({ hasHydrated: true }),
    },
  ),
);
