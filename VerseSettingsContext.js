import React, { createContext, useContext, useState } from 'react';

const VerseSettingsContext = createContext();

export const VerseSettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [chunkSize, setChunkSize] = useState(10);

  // ✅ Add translation support
  const [translation, setTranslation] = useState('de4e12af7f28f599-02'); // ESV by default

  return (
    <VerseSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        chunkSize,
        setChunkSize,
        translation,
        setTranslation,
      }}
    >
      {children}
    </VerseSettingsContext.Provider>
  );
};

export const useVerseSettings = () => useContext(VerseSettingsContext);
