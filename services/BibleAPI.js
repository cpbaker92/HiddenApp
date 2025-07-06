// services/BibleAPI.js
const API_KEY = '2d6b7fbc2a1e78883e5630f0f9f81971'; // Replace securely later
const BASE_URL = 'https://api.scripture.api.bible/v1';

export const fetchVerse = async (reference, translationId = 'de4e12af7f28f599-02') => {
  const res = await fetch(`${BASE_URL}/bibles/${translationId}/search?query=${encodeURIComponent(reference)}`, {
    headers: {
      'api-key': API_KEY,
    },
  });

  const data = await res.json();
  return data;
};
