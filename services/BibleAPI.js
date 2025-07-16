let apiKey = 'b49b6734eff97e473251455639aa688c';

function setApiKey(key) {
  apiKey = key;
}

async function fetchFromApi(endpoint) {
  const response = await fetch(`https://api.scripture.api.bible/v1${endpoint}`, {
    headers: {
      'api-key': apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error: ${response.status} - ${errorText}`);
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

// Strip HTML tags from verse content
function stripHtmlTags(text) {
  return text.replace(/<[^>]*>/g, '');
}

// ✅ Get list of available Bibles (translations)
export async function getBibles() {
  return fetchFromApi('/bibles');
}

// ✅ Get books in a Bible
export async function getBooks(bibleId) {
  return fetchFromApi(`/bibles/${bibleId}/books`);
}

// ✅ Get chapters in a book
export async function getChapters(bibleId, bookId) {
  return fetchFromApi(`/bibles/${bibleId}/books/${bookId}/chapters`);
}

// ✅ Get verses in a chapter
export async function getVerses(bibleId, chapterId) {
  return fetchFromApi(`/bibles/${bibleId}/chapters/${chapterId}/verses`);
}

// ✅ Get full verse data
export async function getVerse(bibleId, verseId) {
  return fetchFromApi(`/bibles/${bibleId}/verses/${verseId}`);
}

// ✅ Get cleaned (plain text) verse content
export async function getCleanVerseText(bibleId, verseId) {
  const data = await getVerse(bibleId, verseId);
  const content = data?.data?.content || data?.data?.text || '';
  return stripHtmlTags(content);
}

// ✅ Search for verses by keyword
export async function searchVerses(bibleId, query) {
  return fetchFromApi(`/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`);
}

export {
  setApiKey,
  stripHtmlTags,
};
