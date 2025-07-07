// src/utils/verseHelpers.js

export const convertToLetterPrompt = (verse, mode = 'one') => {
  return verse
    .split(' ')
    .map(word => {
      const cleaned = word.replace(/[^a-zA-Z]/g, ''); // remove punctuation
      if (!cleaned) return '';
      let letters = cleaned.slice(0, mode === 'three' ? 3 : mode === 'two' ? 2 : 1);
      return mode === 'one'
        ? letters.toUpperCase()
        : letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();
    })
    .join(mode === 'one' ? '' : ' ');
};
