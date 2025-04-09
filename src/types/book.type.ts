import { BOOK_GENRE } from '../constants/global';

export type TBook = {
  _id: string;
  title: string;
  author: string;
  genre: TBookGenre;
  description: string;
  price: number;
  stock: number;
  publicationDate: string;
  publisher: string;
  isbn: string;
  coverImage: string;
  format: string;
  featured: boolean;
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
  language?: string;
  id: string;
  rating?: number;
  pageCount?: number;
};

export type TBookGenre = keyof typeof BOOK_GENRE;
