export type TReview = {
  _id: string;
  user: User;
  book: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

type User = {
  name: Name;
  _id: string;
  image: string;
  fullName: string;
  id: string;
};

type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
