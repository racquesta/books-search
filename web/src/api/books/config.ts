export const DEFAULT_SEARCH_PARAMS = {
  maxResults: '40',
  printType: 'books',
  key: process.env.REACT_APP_GOOGLE_API_KEY || '',
  orderBy: 'relevance',
};

export const GOOGLE_BOOKS_API_BASEURL = 'https://www.googleapis.com/books';

export const GOOGLE_BOOKS_API_VOLUMES_PATH = '/v1/volumes';
