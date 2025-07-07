import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const useVerseStore = create(
  persist(
    (set) => ({
      verses: [],
      addVerse: (verse) => set((state) => ({ verses: [...state.verses, verse] })),
      removeVerse: (verse) => set((state) => ({ verses: state.verses.filter(v => v !== verse) })),
    }),
    {
      name: 'verse-storage', // name of the item in the storage (must be unique)
      getStorage: () => AsyncStorage, // use AsyncStorage for storage
    }
  )
);

export default useVerseStore;
