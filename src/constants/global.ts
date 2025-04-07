export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const userRole = Object.values(ROLES);

export const BOOK_GENRE = {
  FICTION: 'Fiction',
  NON_FICTION: 'Non-Fiction',
  MYSTERY: 'Mystery',
  THRILLER: 'Thriller',
  ROMANCE: 'Romance',
  SCIENCE_FICTION: 'Science Fiction',
  FANTASY: 'Fantasy',
  HORROR: 'Horror',
  BIOGRAPHY: 'Biography',
  AUTOBIOGRAPHY: 'Autobiography',
  HISTORY: 'History',
  SELF_HELP: 'Self-Help',
  BUSINESS: 'Business',
  CHILDREN: 'Children',
  YOUNG_ADULT: 'Young Adult',
  POETRY: 'Poetry',
  DRAMA: 'Drama',
  RELIGION: 'Religion',
  PHILOSOPHY: 'Philosophy',
  SCIENCE: 'Science',
  TRAVEL: 'Travel',
  COOKBOOK: 'Cookbook',
  ART: 'Art',
  EDUCATION: 'Education',
} as const;

export const bookGenre = Object.values(BOOK_GENRE);

export const countryOptions = [
  { value: 'BD', label: 'Bangladesh' },
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
];
