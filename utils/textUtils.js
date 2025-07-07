/**
 * Removes verse numbers, splits the verse into words, takes the first letter of each word,
 * converts all letters to uppercase, and returns the result as a string.
 * Handles edge cases like extra spaces or empty strings.
 * 
 * @param {string} text - The verse text to process.
 * @returns {string} - The processed string in First Letter Mode.
 */
export const getFirstLetterMode = (text) => {
  if (!text) return '';
  const noNumbers = text.replace(/^\d+\s*/, ''); // remove leading verse number
  const words = noNumbers.trim().split(/\s+/);
  return words
    .filter(word => word.length > 0)
    .map(word => word[0]?.toUpperCase())
    .join('');
};
