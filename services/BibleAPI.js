// services/BibleAPI.js
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
const API_KEY = extra.apiBibleKey;
const BASE_URL = 'https://api.scripture.api.bible/v1';

// Full list of book abbreviations
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
  'Psalm' : 'PSA',
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

// Converts a reference like 'Romans 2:12' to 'ROM.2.12'
const formatVerseId = (reference) => {
  const [bookPart, chapterVerse] = reference.split(/ (?=\d)/); // split before the number
  const abbreviation = bookAbbreviations[bookPart.trim()];
  if (!abbreviation || !chapterVerse) return null;
  return `${abbreviation}.${chapterVerse.replace(':', '.')}`;
};

export const fetchVerse = async (reference, translationId = 'de4e12af7f28f599-02') => {
  const verseId = formatVerseId(reference);
  if (!verseId) {
    throw new Error('Invalid verse reference format');
  }

  const res = await fetch(`${BASE_URL}/bibles/${translationId}/verses/${verseId}`, {
    headers: {
      'api-key': API_KEY,
    },
  });

  const data = await res.json();
  console.log('Full API Response:', data);

  // API sometimes wraps text in HTML; we'll strip that using regex
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const content = data?.data?.content;
  const cleanedText = content ? stripHtmlTags(content) : 'Verse not found.';

  return { ...data.data, content: cleanedText };
};
