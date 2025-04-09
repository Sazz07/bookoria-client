import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  price: z.string().min(1, 'Price is required'),
  stock: z.string().min(1, 'Stock is required'),
  description: z.string().min(1, 'Description is required'),
  publicationDate: z.string().optional(),
  publisher: z.string().optional(),
  isbn: z.string().optional(),
  format: z.string().optional(),
  language: z.string().optional(),
  pageCount: z.string().optional(),
});
