import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerseContext = createContext();

const initialState = [];

const verseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VERSE':
      return [...state, action.payload];
    case 'REMOVE_VERSE':
      return state.filter(verse => verse.reference !== action.payload);
    case 'TOGGLE_FAVORITE':
      return state.map(verse =>
        verse.reference === action.payload
          ? { ...verse, isFavorite: !verse.isFavorite }
          : verse
      );
    case 'UPDATE_VERSE_STATUS':
      return state.map(verse =>
        verse.reference === action.payload.reference
          ? { ...verse, status: action.payload.status }
          : verse
      );
    case 'MARK_AS_REVIEWED':
      return state.map(verse =>
        verse.reference === action.payload
          ? { ...verse, reviewed: true }
          : verse
      );
    case 'CLEAR_ALL_VERSES':
      return [];
    case 'SET_VERSES':
      return action.payload;
    default:
      return state;
  }
};

const VerseProvider = ({ children }) => {
  const [verses, dispatch] = useReducer(verseReducer, initialState);

  useEffect(() => {
    const loadVerses = async () => {
      try {
        const storedVerses = await AsyncStorage.getItem('verses');
        if (storedVerses) {
          dispatch({ type: 'SET_VERSES', payload: JSON.parse(storedVerses) });
        } else {
          // Load mock data on first launch
          const mockData = [
            { reference: 'Matthew 28:19', text: 'Go therefore and make disciples of all nations...', tags: ['Evangelism'], status: 'In Progress', isFavorite: true, reviewed: true },
            { reference: 'John 3:16', text: 'For God so loved the world...', tags: ['Salvation'], status: 'Mastered', isFavorite: false, reviewed: true },
            { reference: 'Romans 8:28', text: 'And we know that in all things God works...', tags: ['Encouragement'], status: 'New', isFavorite: true, reviewed: true },
            { reference: 'John 1:1', text: 'In the beginning was the Word...', tags: ['Theology'], status: 'In Progress', isFavorite: false, reviewed: false },
          ];
          dispatch({ type: 'SET_VERSES', payload: mockData });
          await AsyncStorage.setItem('verses', JSON.stringify(mockData));
        }
      } catch (error) {
        console.warn('Failed to load verses from storage', error);
      }
    };

    loadVerses();
  }, []);

  useEffect(() => {
    const saveVerses = async () => {
      try {
        await AsyncStorage.setItem('verses', JSON.stringify(verses));
      } catch (error) {
        console.warn('Failed to save verses to storage', error);
      }
    };

    saveVerses();
  }, [verses]);

  const addVerse = (verse) => dispatch({ type: 'ADD_VERSE', payload: verse });
  const removeVerse = (reference) => dispatch({ type: 'REMOVE_VERSE', payload: reference });
  const toggleFavorite = (reference) => dispatch({ type: 'TOGGLE_FAVORITE', payload: reference });
  const updateVerseStatus = (reference, status) => dispatch({ type: 'UPDATE_VERSE_STATUS', payload: { reference, status } });
  const markAsReviewed = (reference) => dispatch({ type: 'MARK_AS_REVIEWED', payload: reference });
  const clearAllVerses = () => dispatch({ type: 'CLEAR_ALL_VERSES' });

  return (
    <VerseContext.Provider value={{ verses, addVerse, removeVerse, toggleFavorite, updateVerseStatus, markAsReviewed, clearAllVerses }}>
      {children}
    </VerseContext.Provider>
  );
};

export { VerseContext, VerseProvider };
