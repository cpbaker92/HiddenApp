import React, { createContext, useContext, useState } from 'react';

const VerseSettingsContext = createContext({
  darkMode: false,
  chunkSize: 10,
  translation: 'de4e12af7f28f599-02',
  letterMode: 'one',
});

export const VerseSettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [chunkSize, setChunkSize] = useState(10);

  // ✅ Add translation support
  const [translation, setTranslation] = useState('de4e12af7f28f599-02'); // ESV by default
  const [letterMode, setLetterMode] = useState('one'); // New state for letter mode

  return (
    <VerseSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        chunkSize,
        setChunkSize,
        translation,
        setTranslation,
        letterMode, // Expose letterMode
        setLetterMode, // Expose setLetterMode
      }}
    >
      {children}
    </VerseSettingsContext.Provider>
  );
};

export const useVerseSettings = () => useContext(VerseSettingsContext);
