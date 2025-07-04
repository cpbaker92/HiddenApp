import React, { createContext, useState, useContext } from 'react';

const VerseSettingsContext = createContext();

export const VerseSettingsProvider = ({ children }) => {
  const [chunkSize, setChunkSize] = useState(10);

  return (
    <VerseSettingsContext.Provider value={{ chunkSize, setChunkSize }}>
      {children}
    </VerseSettingsContext.Provider>
  );
};

export const useVerseSettings = () => useContext(VerseSettingsContext);
