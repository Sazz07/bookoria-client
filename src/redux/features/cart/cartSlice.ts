import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TBook, TCartItem } from '../../../types';

type CartState = {
  items: (TCartItem & { userId: string | null })[];
  isOpen: boolean;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ book: TBook; userId: string | null }>
    ) => {
      const { book, userId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.book._id === book._id && item.userId === userId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ book, quantity: 1, userId });
      }
      state.isOpen = true;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ bookId: string; userId: string | null }>
    ) => {
      const { bookId, userId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.book._id === bookId && item.userId === userId)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        bookId: string;
        quantity: number;
        userId: string | null;
      }>
    ) => {
      const { bookId, quantity, userId } = action.payload;
      const item = state.items.find(
        (item) => item.book._id === bookId && item.userId === userId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload;
      state.items = state.items.filter((item) => item.userId !== userId);
    },
    toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen =
        action.payload !== undefined ? action.payload : !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} = cartSlice.actions;

const getCartItems = (state: RootState) => state.cart.items;
const getUserId = (state: RootState) => state.auth.user?.userId || null;

export const selectCartItems = createSelector(
  [getCartItems, getUserId],
  (items, userId) => items.filter((item) => item.userId === userId)
);

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce(
    (total, item) =>
      total + (item.book.discountedPrice || item.book.price) * item.quantity,
    0
  )
);

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

export default cartSlice.reducer;
