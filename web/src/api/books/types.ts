export type BookSearchFields = {
  title: string;
  author: string;
  subject: string;
};

type SaleInfo = {
  isEbook: boolean;
};

type VolumeInfo = {
  authors: string[];
  categories: string[];
  imageLinks?: ImageLinks;
  title: string;
  previewLink: string;
};

type DownloadAvailability = {
  isAvailable: boolean;
};

type AccessInfo = {
  epub?: DownloadAvailability;
  pdf?: DownloadAvailability;
};

type ImageLinks = {
  thumbnail?: string;
};

export type Book = {
  id: string;
  saleInfo: SaleInfo;
  volumeInfo: VolumeInfo;
  accessInfo: AccessInfo;
};

export type Books = Book[];

export type BooksResponse = {
  totalItems: number;
  items?: Books;
};
