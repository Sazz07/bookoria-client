export type TOrder = {
  _id: string;
  user: User;
  orderItems: TOrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: string;
  notes: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  transaction: Transaction;
  id: string;
};

type User = {
  name: Name;
  _id: string;
  email: string;
  fullName: string;
  id: string;
};

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TOrderItem = {
  book: Book;
  price: number;
  quantity: number;
  discount: number;
  _id: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  discountedPrice: number | null;
  id: string;
};

export type ShippingAddress = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  _id: string;
};

export type PaymentInfo = {
  method: string;
  status: string;
  _id: string;
};

export type Transaction = {
  id: string;
  transactionStatus: string;
  _id: string;
};
