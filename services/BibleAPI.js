// services/BibleAPI.js
import Constants from 'expo-constants';

// TEMP: Hardcoded API key for testing
const API_KEY = '2d6b7fbc2a1e78883e5630f0f9f81971';
const BASE_URL = 'https://api.scripture.api.bible/v1';

const bookAbbreviations = {
  'Genesis': 'GEN',
  'Exodus': 'EXO',
  'Leviticus': 'LEV',
  'Numbers': 'NUM',
  'Deuteronomy': 'DEU',
  'Joshua': 'JOS',
  'Judges': 'JDG',
  'Ruth': 'RUT',
  '1 Samuel': '1SA',
  '2 Samuel': '2SA',
  '1 Kings': '1KI',
  '2 Kings': '2KI',
  '1 Chronicles': '1CH',
  '2 Chronicles': '2CH',
  'Ezra': 'EZR',
  'Nehemiah': 'NEH',
  'Esther': 'EST',
  'Job': 'JOB',
  'Psalms': 'PSA',
  'Psalm': 'PSA',
  'Proverbs': 'PRO',
  'Ecclesiastes': 'ECC',
  'Song of Solomon': 'SNG',
  'Isaiah': 'ISA',
  'Jeremiah': 'JER',
  'Lamentations': 'LAM',
  'Ezekiel': 'EZK',
  'Daniel': 'DAN',
  'Hosea': 'HOS',
  'Joel': 'JOL',
  'Amos': 'AMO',
  'Obadiah': 'OBA',
  'Jonah': 'JON',
  'Micah': 'MIC',
  'Nahum': 'NAM',
  'Habakkuk': 'HAB',
  'Zephaniah': 'ZEP',
  'Haggai': 'HAG',
  'Zechariah': 'ZEC',
  'Malachi': 'MAL',
  'Matthew': 'MAT',
  'Mark': 'MRK',
  'Luke': 'LUK',
  'John': 'JHN',
  'Acts': 'ACT',
  'Romans': 'ROM',
  '1 Corinthians': '1CO',
  '2 Corinthians': '2CO',
  'Galatians': 'GAL',
  'Ephesians': 'EPH',
  'Philippians': 'PHP',
  'Colossians': 'COL',
  '1 Thessalonians': '1TH',
  '2 Thessalonians': '2TH',
  '1 Timothy': '1TI',
  '2 Timothy': '2TI',
  'Titus': 'TIT',
  'Philemon': 'PHM',
  'Hebrews': 'HEB',
  'James': 'JAS',
  '1 Peter': '1PE',
  '2 Peter': '2PE',
  '1 John': '1JN',
  '2 John': '2JN',
  '3 John': '3JN',
  'Jude': 'JUD',
  'Revelation': 'REV',
};

// Converts something like "JOHN 3:15" to "JHN.3.15"
const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : '')
    .join(' ');
};

const formatVerseId = (reference) => {
  const [bookPart, chapterVerse] = reference.split(/ (?=\d)/); // split before the number
  const bookKey = toTitleCase(bookPart.trim());
  const abbreviation = bookAbbreviations[bookKey];

  if (!abbreviation || !chapterVerse) {
    console.warn('Invalid reference format or book not found:', reference);
    return null;
  }

  return `${abbreviation}.${chapterVerse.replace(':', '.')}`;
};

export const fetchVerse = async (reference, translationId = 'de4e12af7f28f599-02') => {
  const verseId = formatVerseId(reference);
  if (!verseId) {
    throw new Error(`Invalid verse reference format: "${reference}"`);
  }

  const url = `${BASE_URL}/bibles/${translationId}/verses/${verseId}`;
  console.log('Fetching verse from URL:', url);

  const res = await fetch(url, {
    headers: { 'api-key': API_KEY },
  });

  const data = await res.json();
  console.log('Full API Response:', JSON.stringify(data, null, 2));

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const content = data?.data?.content;
  const cleanedText = content ? stripHtmlTags(content) : null;

  return {
    ...data.data,
    content: cleanedText || '',
  };
};
