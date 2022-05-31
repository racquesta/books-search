import { DEFAULT_SEARCH_PARAMS, GOOGLE_BOOKS_API_VOLUMES_PATH } from './config';
import { BookSearchFields, BooksResponse } from './types';

const GOOGLE_BOOKS_API_BASEURL = 'https://www.googleapis.com/books';

const createBookSearchString = (fields: BookSearchFields) => {
  let queryString = '';
  const { title, author, subject } = fields;

  // Optimizing around search results since they are not great
  if (title && author) {
    queryString += encodeURIComponent(`${title.trim()} by ${author.trim()}`);
  } else if (title) {
    queryString += encodeURIComponent(title.trim());
  } else if (author) {
    queryString += `+inauthor:${encodeURIComponent(author.trim())}`;
  }

  // Not working according to Google's docs
  if (subject) {
    queryString += `+subject:${encodeURIComponent(subject.trim())}`;
  }

  return queryString;
};

export const getBooks = async (
  searchFields: BookSearchFields,
  startIndex = 0,
): Promise<BooksResponse> => {
  const params = new URLSearchParams({ ...DEFAULT_SEARCH_PARAMS, startIndex: String(startIndex) });
  const url = `${GOOGLE_BOOKS_API_BASEURL}${GOOGLE_BOOKS_API_VOLUMES_PATH}?q=${createBookSearchString(
    searchFields,
  )}&${params}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to retreive books: Was search criteria entered?');
  }
  const resJson = await res.json();

  if (resJson.totalItems === 0) {
    throw new Error('No results. Please modify your search.');
  }
  return resJson;
};
