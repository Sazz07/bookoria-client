/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disabled @typescript-eslint/no-explicit-any */
export type TOrder = {
  _id: string;
  user: User;
  orderItems: TOrderItem[];
  shippingAddress: TShippingAddress;
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

export type TShippingAddress = {
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

export type TPaymentVerificationResponse = {
  success: boolean;
  message: string;
  data: TPaymentVerificationData[];
};

export type TPaymentVerificationData = {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string;
  card_number: string;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: any;
  value2: any;
  value3: any;
  value4: any;
  transaction_status: any;
  method: string;
  date_time: string;
};
