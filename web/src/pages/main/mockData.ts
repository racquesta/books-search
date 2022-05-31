import { BooksResponse } from '../../api/books/types';
export const mockBookResponse: BooksResponse = {
  totalItems: 2,
  items: [
    {
      id: 'fake-id',
      saleInfo: {
        isEbook: true,
      },
      volumeInfo: {
        authors: ['Judy Blume'],
        categories: ['Juvenile Fiction'],
        imageLinks: {
          thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
        },
        title: 'A book Title',
        previewLink: 'https://www.google.com',
      },
      accessInfo: {
        epub: {
          isAvailable: true,
        },
      },
    },
    {
      id: 'fake-id-2',
      saleInfo: {
        isEbook: true,
      },
      volumeInfo: {
        authors: ['Judy Blume'],
        categories: ['Juvenile Fiction'],
        imageLinks: {
          thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
        },
        title: 'A book Title 2',
        previewLink: 'https://www.google.com',
      },
      accessInfo: {
        epub: {
          isAvailable: true,
        },
      },
    },
  ],
};
